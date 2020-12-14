import "regenerator-runtime/runtime.js";
import React from 'react'
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import Home from './containers/Home/Home'
import CreatePost from './containers/CreatePost/CreatePost'
import Login from './containers/Authentication/Login/Login'
import Register from './containers/Authentication/Register/Register'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Header />
                        <Home />
                        <Footer />
                    </Route>

                    <Route exact path='/create'>
                        <Header />
                        <CreatePost />
                        <Footer />
                    </Route>

                    <Route exact path='/login'>
                        <Header />
                        <Login />
                    </Route>

                    <Route exact path='/register'>
                        <Header />
                        <Register />
                    </Route>

                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;