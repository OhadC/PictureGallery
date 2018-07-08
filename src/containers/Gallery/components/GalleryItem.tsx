import * as React from 'react'

const GalleryItem = (props: any) => {
    return (
        <div className="item">
            <img src={props.picture} />
        </div>
    )
}

export default GalleryItem
