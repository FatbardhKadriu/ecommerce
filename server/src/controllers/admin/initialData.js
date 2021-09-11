const Category = require('../../models/Category')
const Product = require('../../models/Product')
const Order = require('../../models/Order')
const User = require('../../models/User')

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
        const totalCategories = await Category.estimatedDocumentCount()

        const products = await Product.find({ createdBy: req.user._id })
            .select('_id name price quantity slug description productPictures category')
            .populate({ path: 'category', select: '_id name' })
        const totalProducts = await Product.estimatedDocumentCount()

        const orders = await Order.find({})
            .populate("items.productId", "name")
        const totalOrders = await Order.estimatedDocumentCount()

        const totalUsers = await User.find({ role: 'user' }).countDocuments()

        let sales = 0
        let itemsSold = 0
        for (ord of orders) {
            sales += ord.totalAmount
            itemsSold += ord.items.length
        }

        res.status(200).json({
            categories: createCategories(categories),
            products,
            orders,
            totalCategories,
            totalProducts,
            totalOrders,
            totalUsers,
            sales,
            itemsSold
        })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}