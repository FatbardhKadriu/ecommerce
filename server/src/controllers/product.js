const Product = require('../models/Product')
const Category = require('../models/Category')
const shortid = require('shortid')
const slugify = require('slugify')

exports.createProduct =  async (req, res) => {

    const { name, price, description, category, createdBy, quantity } = req.body;
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

    const category = await Category.findOne({ slug }).select("_id")

    if (!category) {
        res.status(400).json({ message: "This category doesn't exists!" })
    }

    const products = await Product.find({ category: category._id })

    if (!products) {
        res.status(400).json({ message: "No products were found!" })
    }

    res.status(200).json({
        products,
        productsByPrice: {
            under500:  products.filter(product => product.price <= 500),
            under700:  products.filter(product => product.price > 500 && product.price <= 700),
            under1000: products.filter(product => product.price > 700 && product.price <= 1000),
            under1500: products.filter(product => product.price > 1000 && product.price <= 1500),
            under2000: products.filter(product => product.price > 1500 && product.price <= 2000),
        }
    });
}