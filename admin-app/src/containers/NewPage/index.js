import React, { useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import linearCategories from '../../helpers/linearCategories'
import { createPage } from '../../actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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

    }, [category.categories])

    useEffect(() => {
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

    useEffect(() => {
        if (page.success) {
            toast.success(page.success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
        }
        if (page.error) {
            toast.error(page.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
        }
    }, [page.success, page.error])

    const onCategoryChange = (e) => {
        // eslint-disable-next-line
        const category = categories.find(category => category.value == e.target.value)
        setCategoryId(e.target.value)
        setType(category.type)
    }

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]])
    }

    const handleProductImages = (e) => {
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
                modaltitle={'Create New Page'}
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
            <ToastContainer />
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
