import React from 'react'
import Modal from '../../../components/UI/Modal'
import Input from '../../../components/UI/Input'
import { Row, Col, FormLabel } from 'react-bootstrap'

const UpdateCategoriesModal = (props) => {

    const {
        show,
        size,
        handleClose,
        modaltitle,
        expandedArray,
        checkedArray,
        onSubmit,
        handleCategoryInput,
        categoryList

    } = props

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modaltitle={modaltitle}
            size={size}
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
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <FormLabel>Select type</FormLabel>
                            <br />
                            <select
                                className="form-control"
                                value={item.type}
                                onChange={e => handleCategoryInput('type', e.target.value, index, 'expanded')} >
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
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <FormLabel>Select type</FormLabel>
                            <br />
                            <select
                                className="form-control"
                                value={item.type}
                                onChange={e => handleCategoryInput('type', e.target.value, index, 'checked')}
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>

                ))
            }
        </Modal>
    )
}

export default UpdateCategoriesModal
