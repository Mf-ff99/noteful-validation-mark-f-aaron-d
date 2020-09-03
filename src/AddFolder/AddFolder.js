import React from 'react'
import ApiContext from '../ApiContext'
import FolderValidation from './FolderValidation'

export default class AddFolder extends React.Component {

    state = {
        name: ''
    }
    

    static contextType = ApiContext

    handleAddFolderSubmit = (e) => {
        e.preventDefault()
        const newFolder = {
            name: e.target['folderName'].value
        }
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder)
        })
        .then(res => {
            if(!res.ok) {
                console.log(res.status)
            }
            return res.json();
        })
        .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
        })
        .catch((error) => console.log(error.message))
    }
    
    updateStateName(e) {
        this.setState({name: e.target.value})
    }

    validateName() {
        const name = this.state.name.trim()
        if(name.length === 0) {
            return 'Folder name must contain text'
        }
    }

    
    render() {
        const folderNameError = this.validateName
    return (
         <form className="addFolder" onSubmit={(e) => this.handleAddFolderSubmit(e)}>
             <label>Add a Folder</label>
             <br />
             <input type="text" id="folderName" onChange={(e) => this.updateStateName(e)} ></input>
             {this.validateName() && <FolderValidation message={folderNameError}/>}
             <br />
             <button 
             type="submit"
             disabled={
                 this.validateName()
             } >Submit</button>
         </form>
       )
    }
}