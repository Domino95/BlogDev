import React from 'react';
import axios from 'axios'

const UserPopUp = ({ setIsLogged }) => {
    const Email = localStorage.getItem("email")

    const logout = async () => {
        await axios.get('http://localhost:3000/authentication/logout')
        setIsLogged(false)
    }

    return (
        <div className="nav__user">
            <div className="nav__user--open" >
                <h5> {Email}</h5>
                <h5 onClick={logout}>Log Out </h5>
            </div>
        </div>
    );
}

export default UserPopUp;