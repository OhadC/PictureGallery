import * as React from 'react'

class AddItem extends React.Component<any, {}> {
    private fileInput: any

    constructor(props: any) {
        super(props)

        this.fileInput = React.createRef()
    }

    openFileDialog = () => {
        this.fileInput.current.click()
    }

    uploadImage = () => {
        const pictures: any[] = this.fileInput.current.files
        if (pictures.length > 0) {
            this.props.onPictures(pictures[0])
        }
    }

    render() {
        return (
            <div className="add-item" onClick={this.openFileDialog}>
                <input type="file" ref={this.fileInput} accept="image/*" onChange={this.uploadImage} />
                +
            </div>
        )
    }
}

export default AddItem
