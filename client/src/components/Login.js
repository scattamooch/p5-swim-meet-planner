import React from "react";
import "../styling/Login.css"

function Login() {

    return (
        <div>
            <h1>Login Header</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button className="login-button">Submit</button>
            </form>
        </div>
    )
}

export default Login;