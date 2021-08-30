import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions'
import Layout from '../../components/Layout'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { RiCheckboxBlankLine, RiCheckboxFill } from 'react-icons/ri'
import { IoIosAdd, IoIosTrash, IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { AiFillEdit } from 'react-icons/ai'
import UpdateCategoriesModal from './components/UpdateCategoriesModal'
import AddCategoryModal from './components/AddCategoryModal'
import DeleteCategoryModal from './components/DeleteCategoryModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

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
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!category.loading) {
            setShow(false)
        }
        if (category.error) {
            toast.error(category.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }, [category.loading, category.error])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddCategory = () => {
        const form = new FormData()

        if (categoryName === "") {
            alert("Category name is required")
            setShow(false)
            return
        }
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
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories()
        setUpdateCategoryModal(true)
    }

    const updateCheckedAndExpandedCategories = () => {
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
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray)
        } else if (type === 'expanded') {
            const updatedExpandedArray = expanded.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item)
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

        setUpdateCategoryModal(false)
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories()
        setDeleteCategoryModal(true)
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }))
        if (checkedArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
            setDeleteCategoryModal(false)
        }
    }

    const categoriesList = createCategoryList(category.categories)

    return (
        <Layout sidebar>
            <Container>
                <Row style={{ padding: '6px' }}>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions:</span>
                                <Button variant="success" onClick={handleShow}><IoIosAdd /> Add </Button>
                                <Button variant="danger" onClick={deleteCategory}><IoIosTrash /> Delete </Button>
                                <Button onClick={updateCategory}><AiFillEdit /> Edit </Button>
                                <ToastContainer />
                            </div>
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
            </Container>
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                onSubmit={handleAddCategory}
                modalTitle={'Add new category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoriesList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={"Update categories"}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoriesList}
            />
            <DeleteCategoryModal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            setDeleteCategoryModal(false)
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            />
        </Layout>
    )
}

export default Category