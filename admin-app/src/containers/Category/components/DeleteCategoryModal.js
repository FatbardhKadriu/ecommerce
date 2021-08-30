import React from 'react'
import Modal from '../../../components/UI/Modal'

const DeleteCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modaltitle,
        buttons,
        checkedArray,
        expandedArray
    } = props

    return (
        <Modal
            modaltitle={modaltitle}
            show={show}
            handleClose={handleClose}
            buttons={buttons}
        >
            <h6>Expanded</h6>
            {
                expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }
            <h6>Checked</h6>
            {
                checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }

        </Modal>
    )
}

export default DeleteCategoryModal
