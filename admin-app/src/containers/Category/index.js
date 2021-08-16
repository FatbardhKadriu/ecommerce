import React, { useState } from 'react'
import { Col, Container, Row, FormLabel, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategories, updateCategories } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { RiCheckboxBlankLine, RiCheckboxFill } from 'react-icons/ri'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'

const Category = () => {

    const category = useSelector(state => state.category)
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)

    const dispatch = useDispatch()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddCategory = () => {
        const form = new FormData()

        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        dispatch(addCategory(form))
        setCategoryName('')
        setParentCategoryId('')
        handleClose()
    }

    const renderCategories = (categories) => {

        let categoriesList = []
        for (let category of categories) {
            categoriesList.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }

        return categoriesList
    }

    const createCategoryList = (categories, options = []) => {
        for (const category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const updateCategory = () => {
        setUpdateCategoryModal(true)
        const categories = createCategoryList(category.categories)

        const checkedArray = []
        const expandedArray = []
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
        console.log({ checked, expanded, categories, checkedArray, expandedArray })
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray)
        } else if (type === 'expanded') {
            const updatedExpandedArray = expanded.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedArray)
        }
    }

    const updateCategoriesForm = () => {

        const form = new FormData()

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })

        dispatch(updateCategories(form))
        .then(result => {
            if (result) {
                dispatch(getAllCategories())
            }
        })

        setUpdateCategoryModal(false)
    }

    const renderUpdateCategoriesModal = () => (
        <Modal
            show={updateCategoryModal}
            handleClose={() => setUpdateCategoryModal(false)}
            handleIt={updateCategoriesForm}
            modalTitle={'Update categories'}
            size="lg"
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input
                                label="Name"
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <FormLabel>Category</FormLabel>
                            <select
                                value={item.parentId}
                                className="form-control"
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>Select category</option>
                                {
                                    createCategoryList(category.categories).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <FormLabel>Select type</FormLabel>
                            <br />
                            <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>

                ))
            }
            <Row>
                <Col>
                    <h6>Checked</h6>
                </Col>
            </Row>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input
                                label="Name"
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <FormLabel>Category</FormLabel>
                            <select
                                value={item.parentId}
                                className="form-control"
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>Select category</option>
                                {
                                    createCategoryList(category.categories).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <FormLabel>Select type</FormLabel>
                            <br />
                            <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>

                ))
            }
            {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
        </Modal>
    )

    const renderAddCategoryModal = () => (
        <Modal
            show={show}
            handleClose={handleClose}
            handleIt={handleAddCategory}
            modalTitle={'Add new category'}
        >
            <Input
                label="Name"
                value={categoryName}
                placeholder={'Category Name'}
                onChange={(e) => setCategoryName(e.target.value)}
            />

            <FormLabel>Category</FormLabel>
            <select value={parentCategoryId} className="form-control" onChange={(e) => setParentCategoryId(e.target.value)}>
                <option>Select category</option>
                {
                    createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )
                }
            </select>
            <br />
            <input type="file" name="categoryImage" onChange={handleCategoryImage} />
        </Modal>
    )

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <h3>Category</h3>
                            <Button variant="success" onClick={handleShow}>Add new</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <RiCheckboxFill />,
                                uncheck: <RiCheckboxBlankLine />,
                                halfCheck: <RiCheckboxBlankLine />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>

            {renderUpdateCategoriesModal()}
            {renderAddCategoryModal()}

        </Layout>
    )
}

export default Category
