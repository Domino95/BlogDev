import React from 'react'
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import Home from './containers/Home/Home'
import Topics from './containers/Topics/Topics'
import Login from './containers/Login/Login'
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

                    <Route exact path='/topics'>
                        <Header />
                        <Topics />
                        <Footer />
                    </Route>

                    <Route exact path='/login'>
                        <Header />
                        <Login />
                    </Route>

                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;