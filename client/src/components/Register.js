import React from "react";
import "../styling/Register.css"

function Register() {

    return (
        <div>
            <h1>Sign Up Here</h1>
            <form>
                <h3>Pick your team:</h3>
                <select>
                    <option value="1">Charleston</option>
                    <option value="2">Cherry Valley</option>
                    <option value="3">Covered Bridge</option>
                    <option value="4">Erlton</option>
                    <option value="5">Fox Hollow</option>
                    <option value="6">Old Orchard</option>
                </select>
                <input type="text" placeholder="First name*" />
                <input type="text" placeholder="Last name*" />
                <input type="text" placeholder="Username*" />
                <input type="password" placeholder="Password*" />
                <button className="login-button">Submit</button>
            </form>
        </div>
    )
}

export default Register;