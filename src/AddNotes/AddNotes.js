import React from 'react'
import ApiContext from '../ApiContext'
import NoteValidation from './NoteValidation'

export default class AddNotes extends React.Component {
   
   static defaultProps = {
        history: {
            push: ()=> { }
        }
    }
       state = {
        name: '',
        noteContent: '',
        noteFolder: '',
        touched: false,
    }

    static contextType = ApiContext;


    handleSubmit = (e) => {
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
                if (!res.ok) {
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

    updateStateName = (e) => {
        this.setState({ 
            name: e.target.value
        })
    }

    updateStateContent = (e) => {
        this.setState({ 
            noteContent: e.target.value
        })
    }

    updateStateFolder = (e) => {
        this.setState({ 
            noteFolder: e.target.value
        })
    }


    validateName() {
        const name = this.state.name.trim();
        const content = this.state.noteContent.trim();
        const noteFolder = this.state.noteFolder.trim();
        if (name.length === 0) {
            return 'name is required'
        } else if (content.length === 0) {
            return 'note content is required'
        } else if (noteFolder.length === 0) {
            return 'you must select a folder for your note'
        }
    }


    render() {
        const { folders = [] } = this.context;
        const nameError = this.validateName
        return (
            <div className="AddNotes">
                <h3>Add Note</h3>
                <form onSubmit={this.handleSubmit}
                >
                    <label>Note Name</label>
                    <input type="text" id="noteName" onChange={this.updateStateName}></input>
                    {this.validateName() && <NoteValidation message={nameError} />}
                    <br />
                    <label>Note Content</label>
                    <textarea id="noteContent" onChange={this.updateStateContent}></textarea>
                    <br />
                    <label>Select a folder</label>
                    <select id="noteFolderSelection" onChange={this.updateStateFolder}>
                        <option value={null}>...</option>
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                        )}
                    </select>
                    <br />
                    <button type="submit"
                        disabled={
                            this.validateName()}
                    >Add Note
                        </button>
                </form>
            </div>

        )

    }

}