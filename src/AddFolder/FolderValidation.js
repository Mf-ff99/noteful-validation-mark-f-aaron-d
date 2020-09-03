import React from 'react'

export default function(props) {
    if(props.message) {
        return (
            <div classname="error">*Folder name must not be empty</div>
        )
    }
}