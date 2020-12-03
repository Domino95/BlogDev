import React, { useRef, useState } from 'react';
import People from "../../img/people.jpg"

const Login = () => {
    const EmailRef = useRef()
    const PasswordRef = useRef()

    function handleForm() {
        if (EmailRef.current.children[0].value !== "") {
            EmailRef.current.children[1].className = "--active"
        }
        else
            EmailRef.current.children[1].className = null

        if (PasswordRef.current.children[0].value !== "") {
            PasswordRef.current.children[1].className = "--active"
        }
        else
            PasswordRef.current.children[1].className = null
    }

    function handlePasswordType() {
        if (PasswordRef.current.children[0].type === "password")
            PasswordRef.current.children[0].type = "text"
        else
            PasswordRef.current.children[0].type = "password"
    }

    return (
        <div className="Login">
            <form>
                <h2>Login to BlogDev</h2>

                <div ref={EmailRef}>
                    <input type="email" id="email" required onChange={handleForm}></input>
                    <label id="labelEmail">Email</label>
                </div>

                <div ref={PasswordRef}>
                    <input type="password" id="password" minLength="8" required onChange={handleForm}></input>
                    <label id="labelPassword">Password</label>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handlePasswordType} viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
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