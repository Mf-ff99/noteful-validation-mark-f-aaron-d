import React from 'react'
import { PropTypes } from 'prop-types'

export default function NoteValidation(props) {
    NoteValidation.propType = {
        message: PropTypes.string
    }
    if(props.message) {
        return (
        <div className='errorMessage'>*Note title must include at least one letter</div>
        )

    }
    return 

    
}