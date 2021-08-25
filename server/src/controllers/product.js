const Product = require('../models/Product')
const Category = require('../models/Category')
const slugify = require('slugify')

exports.createProduct = async (req, res) => {

    const { name, price, description, category, quantity } = req.body;
    let productPictures = []

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }
    const product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    })

    await product.save()
    res.status(200).json({ product })

}

exports.getProductsBySlug = async (req, res) => {

    const { slug } = req.params;

    const category = await Category.findOne({ slug }).select("_id type")

    if (!category) {
        res.status(400).json({ message: "This category doesn't exists!" })
    }

    const products = await Product.find({ category: category._id })

    if (!products) {
        res.status(400).json({ message: "No products were found!" })
    }

    if (category.type) {
        res.status(200).json({
            products,
            productsByPrice: {
                under500: products.filter(product => product.price <= 500),
                under700: products.filter(product => product.price > 500 && product.price <= 700),
                under1000: products.filter(product => product.price > 700 && product.price <= 1000),
                under1500: products.filter(product => product.price > 1000 && product.price <= 1500),
                under2000: products.filter(product => product.price > 1500 && product.price <= 2000),
            }
        });
    } else {
        res.status(200).json({ products })
    }
}

exports.getProductDetailsById = async (req, res) => {
    const { productId } = req.params

    if (!productId) {
        return res.status(400).json({ error: "Params required " })
    }

    try {
        const product = await Product.findOne({ _id: productId })
        
        if (!product) {
            return res.status(404).json({ error: "Product not found " })
        }
        return res.status(200).json({ product })
    }
    catch (error) {
        return res.status(400).json({ error })
    }
}
