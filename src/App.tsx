import * as React from 'react';
import './App.css';
import Gallery from './containers/Gallery/Gallery'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Picture Gallery</h1>
                <Gallery />
            </div>
        );
    }
}

export default App;
