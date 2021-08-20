const Page = require('../../models/Page')

exports.createPage = async (req, res) => {
    const { banners, products } = req.files

    if (banners?.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    if (products?.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }

    req.body.createdBy = req.user._id
    let page
    try {
        page = await Page.findOne({ category: req.body.category })
    } catch (error) {
        return res.status(400).json({ error })
    }

    if (!page) {
        const _page = new Page(req.body)

        try {
            await _page.save()
            return res.status(201).json({ _page })
        }
        catch (error) {
            return res.status(400).json({ error })
        }
    } else {
        try {
            const updatedPage = await Page.findOneAndUpdate({ category: req.body.category }, req.body, { new: true })
            return res.status(201).json({ page: updatedPage })
        } catch (error) {
            return res.status(400).json({ error })
        }
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