import React, { useRef, useState } from 'react';
import People from "../../../img/people.jpg"
import axios from 'axios'
import { handleFormLabel, handlePasswordType, validation } from '../helpers'

const Register = () => {
    const EmailRef = useRef()
    const UsernameRef = useRef()
    const PasswordRef = useRef()
    const PasswordCofirmRef = useRef()
    const [Error, setError] = useState(null)
    const [user, setUser] = useState({
        email: '', username: "", password: '', repeatPassword: ""
    })

    document.addEventListener('input', (e) => {
        const password = document.querySelector('#password')
        const repeatPassword = document.querySelector('#repeatPassword')

        if (e.target.value !== "") e.target.className = "invalid"
        else e.target.className = ""

        if (repeatPassword.value === "") repeatPassword.classList.remove("invalidPassword")
        else if (repeatPassword.value !== password.value) repeatPassword.classList.add("invalidPassword")
        else repeatPassword.classList.remove("invalidPassword")
    })

    const onChangeInput = (e, ref) => {
        const { id, value } = e.target;
        handleFormLabel(ref)
        setUser({ ...user, [id]: value })
    }

    const reigsterSumbit = e => {
        e.preventDefault()
        if (!validation(user.password, user.repeatPassword))
            setError("Passwords must be the same")
        else
            axios.post('/user/register', { ...user })
                .then(() => {
                    console.log("!OK")
                })
                .catch((error) => {
                    console.log(error)
                })
    }


    return (
        <div className="Authentication">
            <img src={People} alt="people"></img>

            <form onSubmit={reigsterSumbit} >
                <h2>Register to BlogDev</h2>
                <h4>{Error}</h4>
                <div ref={EmailRef}>
                    <input type="email" id="email" required value={user.email} onChange={e => onChangeInput(e, EmailRef)}></input>
                    <label>Email</label>
                    <p hidden={true} >Enter your email</p>
                </div>

                <div ref={UsernameRef}>
                    <input type="text" id="username" minLength="4" required value={user.username} onChange={e => onChangeInput(e, UsernameRef)}></input>
                    <label>Username</label>
                    <p hidden={true} >Username must contain min 4 characters </p>
                </div>

                <div ref={PasswordRef}>
                    <input type="password" id="password" minLength="8" required value={user.password} onChange={e => onChangeInput(e, PasswordRef)}></input>
                    <label>Password</label>
                    <p hidden={true} > Password must contain min 8 characters </p>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handlePasswordType(PasswordRef)} viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
                </div>

                <div ref={PasswordCofirmRef}>
                    <input type="password" id="repeatPassword" required value={user.repeatpassword} onChange={e => onChangeInput(e, PasswordCofirmRef)}></input>
                    <label>Repeat password</label>
                    <p hidden={true} >Passwords must be the same</p>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handlePasswordType(PasswordCofirmRef)} viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
                </div>

                <div >
                    <input type="submit" value="Submit"></input>
                </div >
            </form>
        </div>
    );
}

export default Register;