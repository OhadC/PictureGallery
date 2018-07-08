import * as React from 'react'

interface IProps {
    onPictures: Function
}

class AddItem extends React.PureComponent<IProps, {}> {
    private fileInput: any

    constructor(props: any) {
        super(props)

        this.fileInput = React.createRef()
    }

    openFileDialog = () => {
        this.fileInput.current.click()
    }

    uploadImage = () => {
        const pictures: File[] = this.fileInput.current.files
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
