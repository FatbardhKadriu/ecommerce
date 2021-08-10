import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategories } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

const Category = () => {

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')

    const category = useSelector(state => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())

    }, [])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddCategory = () => {
        const form = new FormData()

        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        dispatch(addCategory(form))
        handleClose()
    }

    const renderCategories = (categories) => {

        let categoriesList = []
        for (let category of categories) {
            categoriesList.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 && (
                        <ul> {renderCategories(category.children)}</ul>
                    )}
                </li>
            )
        }

        return categoriesList
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

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                    <select value={parentCategoryId} className="form-control" onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Select category</option>
                        {
                            createCategoryList(category.categories).map(option => 
                                <option key={option.value} value={option.value}>{option.name}</option>
                                )
                        }
                    </select>

                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddCategory}>
                        Add Category
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Category
