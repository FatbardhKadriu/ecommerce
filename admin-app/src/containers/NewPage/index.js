import React, { useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import linearCategories from '../../helpers/linearCategories'
import { createPage } from '../../actions'

const NewPage = () => {

    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const category = useSelector(state => state.category)
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [desc, setDesc] = useState('')
    const [type, setType] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const page = useSelector(state => state.page)

    useEffect(() => {
        setCategories(linearCategories(category.categories))

    }, [category])

    useEffect(() => {
        console.log(page)
        if (!page.loading) {
            setCreateModal(false)
            setTitle('')
            setDesc('')
            setDesc('')
            setProducts([])
            setBanners([])
            setCategoryId('')
        }
    }, [page])

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value)
        setCategoryId(e.target.value)
        setType(category.type)
    }

    const handleBannerImages = (e) => {
        console.log(e)
        setBanners([...banners, e.target.files[0]])
    }

    const handleProductImages = (e) => {
        console.log(e)
        setProducts([...products, e.target.files[0]])
    }

    const submitPageForm = (e) => {

        if (title === "") {
            alert("Title is required")
            setCreateModal(false)
            return
        }
        const form = new FormData()
        form.append('title', title)
        form.append('description', desc)
        form.append('category', categoryId)
        form.append('type', type)
        banners.forEach(b => form.append('banners', b))
        products.forEach(p => form.append('products', p))
        dispatch(createPage(form))
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >
                <Row>
                    <Col>
                        <Input
                            label="Select category"
                            type='select'
                            onChange={onCategoryChange}
                            value={categoryId}
                            options={categories}
                            placeholder={"Select category"}
                        />
                        {/* <select
                            className="form-control form-control-sm"
                            value={categoryId}
                            onChange={onCategoryChange}
                        >
                            <option value="">Select category</option>
                            {
                                categories.map(cat =>
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>)
                            }
                        </select> */}
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label={'Title'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={'Page Title'}
                            className="form-control-sm"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label={'Description'}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder={'Description'}
                            className="form-control-sm"
                        />
                    </Col>
                </Row>
                <Row>
                    <Row>
                        {
                            banners.length > 0 &&
                            banners.map((banner, index) =>
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>)
                        }
                    </Row>
                    <Col>
                        <Input
                            label={'Banners image'}
                            className="form-control form-control-sm"
                            type="file"
                            name="banners"
                            onChange={handleBannerImages} />
                    </Col>
                </Row>
                <Row>
                    <Row>
                        {
                            products.length > 0 &&
                            products.map((banner, index) =>
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>)
                        }
                    </Row>
                    <Col>
                        <Input
                            label={'Products image'}
                            className="form-control form-control-sm"
                            type="file"
                            name="products"
                            onChange={handleProductImages} />
                    </Col>
                </Row>
            </Modal >
        )
    }

    return (
        <Layout sidebar>
            {
                page.loading ?
                    <>
                        <p>Creating Page ...please wait</p>
                    </>
                    :
                    <>
                        {renderCreatePageModal()}
                        <Button variant="primary" onClick={() => setCreateModal(true)}>Create New Page</Button>
                    </>
            }
        </Layout>
    )
}

export default NewPage
