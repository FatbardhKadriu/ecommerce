import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions/product.action'

const Products = () => {

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setProductPictures] = useState([])

    const category = useSelector(state => state.category)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddProduct = (e) => {

        const form = new FormData()
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('price', price)
        form.append('description', description)
        form.append('category', categoryId)

        for (let pic of productPictures){
            form.append('productPicture', pic)
        }

        dispatch(addProduct(form))

        handleClose()
    }

    const createCategoryList = (categories, options = []) => {
        for (const category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }

    return (
        <Layout sidebar>
            <Row>
                <Col md={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <h3>Category</h3>
                        <button onClick={handleShow}>Add</button>
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={name}
                        label="Name"
                        placeholder={'Product Name'}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        value={quantity}
                        label="Quantity"
                        type="Number"
                        placeholder={'Product Quantity'}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Input
                        value={price}
                        label="Price"
                        placeholder={'Product Price'}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        value={description}
                        label="Description"
                        placeholder={'Product Description'}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select value={categoryId} className="form-control" onChange={(e) => setCategoryId(e.target.value)}>
                        <option>Select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>

                        {
                            productPictures.length > 0 ? 
                            productPictures.map((pic, index) => <div key={index}> { JSON.stringify(pic.name) } </div>) : null
                        }

                    <input type="file" name="productPicture" onChange={handleProductPictures} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Add Category
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Products
