import React from 'react'
import { PropTypes } from 'prop-types' 

export default class ErrorBoundry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }


    static getDerivedStateFromError(error) {
        return { hasError: true}
    }

    render() {
        if(this.state.hasError) {
        return (
            <h2>Could not display this page</h2>
         )
        }
        return this.props.children
    }
}

ErrorBoundry.propTypes = {
        children: PropTypes.array.isRequired
}