import React from 'react'
import PropTypes from 'prop-types';

export default function FolderValidation(props) {
    FolderValidation.defaultProps={
        message: " "
    }
    FolderValidation.propTypes={
        message: PropTypes.string
    }
    if(props.message) {
        return (
            <div classname="error">*Folder name must not be empty</div>
        )
    }
}