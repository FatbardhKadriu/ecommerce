const Category = require('../../models/Category')
const Product = require('../../models/Product')
const Order = require('../../models/Order')

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

exports.initialData = async (req, res) => {
    try {
        const categories = await Category.find({})
        const products = await Product.find({})
            .select('_id name price quantity slug description productPictures category')
            .populate({ path: 'category', select: '_id name' })

        const orders = await Order.find({})
            .populate("items.productId", "name")

        res.status(200).json({
            categories: createCategories(categories),
            products,
            orders
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}