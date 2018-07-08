import * as React from 'react'

const GalleryItem = (props: {picture: string}) => {
    return (
        <div className="item">
            <img src={props.picture} />
        </div>
    )
}

export default GalleryItem
