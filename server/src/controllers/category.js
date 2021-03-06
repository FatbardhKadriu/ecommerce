const slugify = require('slugify')
const Category = require('../models/Category')
const shortid = require('shortid')

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
            parentId: c.parentId,
            type: c.type,
            children: createCategories(categories, c._id)

        })
    }
    return categoryList
}

exports.addCategory = async (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        createdBy: req.user._id
    }

    if (req.file) {
        categoryObj.categoryImage = req.file.filename
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    try {
        const category = new Category(categoryObj)
        await category.save()
        res.status(201).json({ category, success: 'Category added successfully' })
    } catch (error) {
        return res.status(400).json(error)
    }


}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})

        if (!categories) return res.status(404).json({ message: 'No category was found' })

        const categoryList = createCategories(categories)

        res.status(200).json({ categoryList })

    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.updateCategories = async (req, res) => {
    try {
        const { _id, name, parentId, type } = req.body
        const updatedCategories = []
        if (name instanceof Array) {
            for (let i = 0; i < name.length; i++) {
                const category = {
                    name: name[i],
                    type: type[i],
                }
                if (parentId[i] !== "") {
                    category.parentId = parentId[i]
                }

                const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true })
                updatedCategories.push(updatedCategory)
            }
            return res.status(200).json({ 
                success: "Categories updated successfully"
             })
        } else {
            const category = {
                name,
                type
            }
            if (parentId !== "") {
                category.parentId = parentId
            }
            await Category.findOneAndUpdate({ _id }, category, { new: true })
            return res.status(200).json({ success: "Categories updated successfully" })
        }
    } catch (error) {
        return res.status(400).json(error)
    }


}

exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload
    const deletedCategories = []
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i], createdBy: req.user._id })
        deletedCategories.push(deleteCategory)
    }
    if (deletedCategories.length === ids.length) {
        res.status(200).json({ success: 'Categories removed successfully' })
    } else {
        res.status(400).json({ error: 'Something went wrong' })
    }
}