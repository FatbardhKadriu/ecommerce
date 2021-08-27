import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Row, Col, FormLabel, Button, Table } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProductById } from '../../actions/product.action'
import { IoIosAdd, IoIosTrash, IoMdInformationCircleOutline } from 'react-icons/io'
import Modal from '../../components/UI/Modal'
import './style.css'
import { generatePublicUrl } from '../../urlConfig'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setProductPictures] = useState([])
    const product = useSelector(state => state.product)
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [productDetailsModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleCloseProductDetails = () => setProductDetailModal(false)
    const handleShowProductDetails = () => setProductDetailModal(true)

    const handleAddProduct = (e) => {

        const form = new FormData()
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('price', price)
        form.append('description', description)
        form.append('category', categoryId)

        for (let pic of productPictures) {
            form.append('productPicture', pic)
        }

        dispatch(addProduct(form))

        handleClose()
    }


    const showProductDetailsModal = product => {
        handleShowProductDetails()
        setProductDetails(product)
        console.log("Produktet: ", product)
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

    useEffect(() => {
        if (product.deletedSuccessfully) {
            toast.success('Deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (product.addedSuccessfully) {
            toast.success('Added successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [product.deletedSuccessfully, product.addedSuccessfully])

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 && 
                        product.products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1} </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.name}</td>
                                <td>
                                    <Button
                                        style={{ marginRight: '8px', textAlign: 'center' }}
                                        variant="info" onClick={() => showProductDetailsModal(product)}>
                                        <IoMdInformationCircleOutline />Info
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const payload = {
                                                productId: product._id
                                            }
                                            dispatch(deleteProductById(payload))
                                        }}
                                        variant="danger">
                                        <IoIosTrash />Delete
                                    </Button>
                                    <ToastContainer />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                onSubmit={handleAddProduct}
                modalTitle={'Add new product'}
            >
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
                <FormLabel>Category</FormLabel>
                <select value={categoryId} className="form-control form-control-sm" onChange={(e) => setCategoryId(e.target.value)}>
                    <option>Select category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }
                </select>

                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}> {JSON.stringify(pic.name)} </div>) : null
                }

                <br />
                <input className="form-control form-control-sm" type="file" name="productPicture" onChange={handleProductPictures} />
            </Modal>
        )
    }

    const handleProductDetailsModal = () => {
        handleCloseProductDetails()
    }

    const renderProductDetailsModal = () => {

        if (!productDetails) {
            return null
        }
        return (
            <Modal
                size="lg"
                show={productDetailsModal}
                handleClose={handleCloseProductDetails}
                modalTitle={'Product Details'}
                onSubmit={handleProductDetailsModal}
            >
                <Row>
                    <Col md="6">
                        <label className='key'>Name</label>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Price</label>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Quantity</label>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Category</label>
                        <p className='value'> {productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className='key'>Description</label>
                        <p className='value'>{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label><br />
                        <div style={{ display: 'flex' }}>
                            {productDetails.productPictures.map(picture =>
                                <div id={picture._id} className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} alt="" />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            <Row>
                <Col md={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <h3>Products</h3>
                        <Button variant="success" onClick={handleShow}><IoIosAdd/>Add product</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {renderProducts()}
                </Col>
            </Row>
            {renderAddProductModal()}
            {renderProductDetailsModal()}
        </Layout>
    )
}

export default Products
