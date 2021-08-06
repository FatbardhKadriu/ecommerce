const Product = require('../models/Product')
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

