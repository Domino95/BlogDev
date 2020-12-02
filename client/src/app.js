import React from 'react'
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import Home from './containers/Home/Home'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <Header />
                <Home />
                <Footer />
            </>
        );
    }
}

export default App;