const Page = require('../../models/Page')

exports.createPage = async (req, res) => {
    const { banners, products } = req.files

    if (banners && banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    if (products && products?.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }

    req.body.createdBy = req.user._id

    let page

    try {

        page = await Page.findOne({ category: req.body.category })

        if (!page) {
            const _page = new Page(req.body)
            await _page.save()
            
            return res.status(201).json({ _page })
        } else {
            const updatedPage = await Page.findOneAndUpdate(
                { category: req.body.category },
                req.body,
                { new: true }
            )
            return res.status(201).json({ page: updatedPage })
        }
    } catch (error) {
        return res.status(400).json({ error })
    }




}

exports.getPage = async (req, res) => {
    const { category, type } = req.params

    if (type !== 'page') {
        return res.status(400).json({ error: 'Bad type' })
    }

    try {
        const page = await Page.findOne({ category })
        return res.status(200).json({ page })
    } catch (error) {
        return res.status(400).json({ error })
    }
}