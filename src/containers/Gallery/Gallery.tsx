import * as React from 'react'
import './Gallery.css'
import AddItem from './components/AddItem';
import GalleryItem from './components/GalleryItem';

class Gallery extends React.Component<{}, any> {
    // private pictures: any[] = []
    constructor(props: any) {
        super(props)

        this.state = {
            db: null,
            pictures: []
        }

        this.getDb()
    }

    getDb() {
        const DBOpenRequest = indexedDB.open("pictureGallery", 1)

        DBOpenRequest.onsuccess = (e: any) => {
            console.log("DB opened successfully")
            const db = e.target.result;
            this.setState({ db }, this.getAllPictures)
        }
        
        DBOpenRequest.onerror = function (err) {
            console.error(err);
        }
        DBOpenRequest.onupgradeneeded = (e: any) => {
            console.log("upgradeneeded", e)
            const db = e.target.result
            db.createObjectStore("pictures", { keyPath: "id", autoIncrement: true });
        }
    }

    getAllPictures = () => {
        var transaction = this.state.db.transaction(["pictures"], "readwrite");

        transaction.onerror = () => {
            console.log('Transaction not opened due to error: ' + transaction.error)
        };
        let objectStore = transaction.objectStore("pictures");
        let objectStoreRequest = objectStore.getAll();
        objectStoreRequest.onsuccess = () => {
            const pictures = objectStoreRequest.result;
            this.setState({ pictures })
        };
    }

    addPictures = (picture: any) => {
        console.log(picture)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(picture);
        fileReader.onloadend = (e: any) => {
            const buffer = e.target.result;

            const pictureObj = {
                data: buffer
            };

            const tran = this.state.db.transaction(["pictures"], "readwrite");

            tran.oncomplete = () => console.log("tran oncomplete")
            tran.onabort = () => console.log("tran onabort")
            tran.onerror = () => console.log("tran onerror")

            const pictures = tran.objectStore("pictures");
            const request = pictures.add(pictureObj);

            request.onsuccess = (e: any) => {
                console.log("add success", e);

                pictureObj['id'] = e.target.result;
                this.setState((prevState: any) => {
                    const pictures = prevState.pictures.slice()
                    pictures.push(pictureObj)
                    return { pictures }
                })
            }

            request.onerror = (e: any) => {
                console.log("add error", e)
            }

        }
    }

    mapPicturesToRender = (picture: any) => <GalleryItem key={picture.id} picture={picture.data} />

    render() {
        return (
            <div className="gallery-container">
                <AddItem onPictures={this.addPictures} />
                {this.state.pictures.map(this.mapPicturesToRender)}
            </div>
        )
    }
}

export default Gallery