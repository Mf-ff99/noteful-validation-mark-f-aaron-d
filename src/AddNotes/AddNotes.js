import React from 'react'
import ApiContext from '../ApiContext'

export default class AddNotes extends React.Component {
    static contextType = ApiContext;
handleSubmit=(e)=>{
   e.preventDefault()
   const newFolder = {
    name: e.target['noteName'].value,
    content: e.target['noteContent'].value,
    folderId: e.target['noteFolderSelection'].value,
    modified: new Date()
}
fetch(`http://localhost:9090/notes`, {
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
.then(note => {
    this.context.addNotes(note)
    this.props.history.push(`/folder/${note.folderId}`)
})
.catch((error) => console.log(error.message))

}
    render() {
        const { folders = [] } = this.context;
        return (
            <div className="AddNotes">
                <h3>Add Note</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Note Name</label>
                    <input type="text" id="noteName"></input>
                    <br />
                    <label>Note Content</label>
                    <textarea id="noteContent"></textarea>
                    <br />
                    <label>Select a folder</label>
                    <select id="noteFolderSelection">
                        <option value={null}>...</option>
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                        )}
                    </select>
                    <br />
                    <button type="submit">Add Note</button>
                </form>
            </div>

        )
                        
    }

}