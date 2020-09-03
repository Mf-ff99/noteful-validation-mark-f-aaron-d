import React from 'react'
import ApiContext from '../ApiContext'

export default class AddFolder extends React.Component {
    

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
    
    
    render() {
    return (
         <form className="addFolder" onSubmit={(e) => this.handleAddFolderSubmit(e)}>
             <label>Add a Folder</label>
             <br />
             <input type="text" id="folderName"  ></input>
             <br />
             <button type="submit" >Submit</button>
         </form>
       )
    }
}