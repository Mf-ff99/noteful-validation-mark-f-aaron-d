import React from 'react'

export default function NoteValidation(props) {
    if(props.message) {
        return (
        <div className='errorMessage'>*Note title must include at least one letter</div>
        )

    }
    return 

    
}