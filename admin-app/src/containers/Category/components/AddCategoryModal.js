import React from 'react'
import Modal from '../../../components/UI/Modal'
import Input from '../../../components/UI/Input'
import { Row, Col } from 'react-bootstrap'

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        onSubmit,
        modaltitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage
    } = props

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modaltitle={modaltitle}
        >
            <Row>
                <Col>
                    <Input
                        label="Name"
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />

                </Col>
                <Col>
                <Input
                    value={parentCategoryId}
                    type="select"
                    onChange={e => setParentCategoryId(e.target.value)}
                    placeholder="Select category"
                    options={categoryList}
                    label="Category"
                />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" className="form-control form-control-sm" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>


        </Modal>
    )
}

export default AddCategoryModal
