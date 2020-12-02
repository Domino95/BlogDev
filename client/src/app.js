import React from 'react'
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import Home from './containers/Home/Home'
import Topics from './containers/Topics/Topics'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/topics" exact component={Topics} />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;