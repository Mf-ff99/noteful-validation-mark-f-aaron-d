import React from 'react'
import PropTypes from 'prop-types';

export default function FolderValidation(props) {
    FolderValidation.defaultProps={
        message: " "
    }
    if(props.message) {
        return (
            <div className="error">*Folder name must not be empty</div>
        )
    }
}

FolderValidation.propTypes = {
    message: PropTypes.func.isRequired
}