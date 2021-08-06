const slugify = require('slugify')
const Category = require('../models/Category')

function createCategories(categories, parentId = null) {
    
    const categoryList = []
    let category 
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for (let c of category) {
        categoryList.push({ 
            _id: c._id,
            name: c.name,
            slug: c.slug,
            children: createCategories(categories, c._id)

         })
    }
    return categoryList
}

exports.addCategory = async (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    const category = new Category(categoryObj)
    await category.save()

    res.status(201).json({ category })

}

exports.getCategories = async (req, res) => {
    const categories = await Category.find({})

    if (!categories) return res.status(404).json({ message: 'No category was found' })

    const categoryList = createCategories(categories)

    res.status(200).json({ categoryList })
}