import * as React from 'react'
import { connect } from 'react-redux'

import './Gallery.css'
import AddItem from './components/AddItem';
import GalleryItem from './components/GalleryItem';
import { IPicture } from '../../models/picture';
import { IAppState } from '../../store/reducer';

import { addPictureThunk } from '../../store/thunks';

class Gallery extends React.Component<any, {}> {

    mapPicturesToRender = (picture: IPicture) => <GalleryItem key={picture.id} picture={picture.data} />

    render() {
        return (
            <div className="gallery-container">
                <AddItem onPictures={this.props.addPictures} />
                {this.props.pictures.map(this.mapPicturesToRender)}
            </div>
        )
    }
}

const mapStateToProps = (state: IAppState) => ({
    pictures: state.pictures
})

const mapDispatchToProps = (dispatch: any) => ({
    addPictures: (picture: File) => dispatch(addPictureThunk(picture))
})

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
