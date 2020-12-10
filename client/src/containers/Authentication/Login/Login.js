import React, { useRef, useState, useContext } from 'react';
import People from "../../../img/people.jpg"
import axios from 'axios'
import { handleFormLabel, handlePasswordType } from '../helpers'
import Spinner from '../../../components/Spinner/spinner'
import { GlobalState } from '../../../api/globalState'
import { useHistory } from "react-router-dom";


const Login = () => {
    let history = useHistory();
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.isLogged
    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)
    const [Error, setError] = useState(null)
    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onChangeInput = (e, ref) => {
        const { id, value } = e.target;
        handleFormLabel(ref)
        setUser({ ...user, [id]: value })
    }

    document.addEventListener('input', (e) => {
        if (e.target.value !== "") e.target.className = "invalid"
        else e.target.className = ""
    })

    const loginSumbit = async e => {
        setLoading(true)
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/authentication/login', { ...user })
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('userName', response.data.userName)
            setIsLogged(true)
            history.push('/')
        }
        catch (err) {
            setError(err.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <div className="Authentication">
            {loading && <Spinner />}
            <form className="login" onSubmit={(e) => loginSumbit(e)}>
                <h2>Login to BlogDev</h2>
                <h4>{Error}</h4>
                <div ref={emailRef}>
                    <input type="email" id="email" required value={user.email} onChange={e => onChangeInput(e, emailRef)}></input>
                    <label>Email</label>
                    <p hidden={true} >Enter your email</p>

                </div>

                <div ref={passwordRef}>
                    <input type="password" id="password" minLength="8" required value={user.password} onChange={e => onChangeInput(e, passwordRef)}></input>
                    <label>Password</label>
                    <p hidden={true} > Password must contain min 8 characters </p>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handlePasswordType(passwordRef)} viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
                </div>

                <div >
                    <input type="submit" value="Submit"></input>
                </div >

            </form>
            <img src={People} alt="people"></img>
        </div>
    );
}

export default Login;