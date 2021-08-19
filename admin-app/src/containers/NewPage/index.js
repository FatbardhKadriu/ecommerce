import React, { useState, useEffect } from 'react'
import { Button, Col, FormLabel, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import linearCategories from '../../helpers/linearCategories'

const NewPage = () => {

    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const category = useSelector(state => state.category)
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [desc, setDesc] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        setCategories(linearCategories(category.categories))

    }, [category])

    const handleBannerImages = (e) => {
        console.log(e)
    }

    const handleProductImages = (e) => {
        console.log(e)
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
            >
                <Row>
                    <Col>
                        <select
                            className="form-control form-control-sm"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Select category</option>
                            {
                                categories.map(cat =>
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>)
                            }
                        </select>
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
                    <FormLabel>Banners Image</FormLabel>
                    <Col>
                        <input
                            className="form-control form-control-sm"
                            type="file"
                            name="banners"
                            onChange={handleBannerImages} />
                    </Col>
                </Row>
                <Row>
                    <FormLabel>Product Image</FormLabel>

                    <Col>
                        <input
                            className="form-control form-control-sm"
                            type="file"
                            name="products"
                            onChange={handleProductImages} />
                    </Col>
                </Row>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <Button variant="primary" onClick={() => setCreateModal(true)}>Create New Page</Button>
        </Layout>
    )
}

export default NewPage
