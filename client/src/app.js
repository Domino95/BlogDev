import "regenerator-runtime/runtime.js";
import React, { useContext } from 'react'
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import Home from './containers/Home/Home'
import CreatePost from './containers/CreatePost/CreatePost'
import Login from './containers/Authentication/Login/Login'
import Register from './containers/Authentication/Register/Register'
import Posts from './containers/Posts/Posts'
import PostDetail from './containers/PostDetail/postDetail'
import ScrollToTop from './components/ScrollToTop/scrollToTop'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { GlobalState } from './api/globalState'
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

function App() {
    const state = useContext(GlobalState)
    const [isLogged] = state.isLogged

    return (
        <BrowserRouter>
            <Switch>

                <Route exact path='/'>
                    <ScrollToTop />
                    <Header />
                    <Home />
                    <Footer />
                </Route>

                <Route exact path='/create'>
                    {isLogged ?
                        <>
                            <ScrollToTop />
                            <Header />
                            <CreatePost />
                            <Footer />
                        </>
                        :
                        <Redirect exact to='/' />
                    }
                </Route>

                <Route exact path='/login'>
                    {!isLogged ?
                        <>
                            <ScrollToTop />
                            <Header />
                            <Login />
                        </> :
                        <Redirect exact to='/' />
                    }
                </Route>

                <Route exact path='/register'>
                    {!isLogged ?
                        <>
                            <ScrollToTop />
                            <Header />
                            <Register />
                        </> :
                        <Redirect exact to='/' />
                    }
                </Route>

                <Route exact path='/posts'>
                    <ScrollToTop />
                    <Header />
                    <Posts />
                    <Footer />
                </Route>

                <Route path='/posts/:id'>
                    <ScrollToTop />
                    <Header />
                    <PostDetail />
                    <Footer />
                </Route>


            </Switch>
        </BrowserRouter>
    );
}

export default App;