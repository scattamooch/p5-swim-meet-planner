import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import "../styling/Register.css";
import { useUser } from "./UserContext";

function Register() {

    const {userId, userTeamId, login} = useUser();

    const history = useHistory();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [teamId, setTeamId] = useState("")
    const [signUpError, setSignUpError] = useState(null)

    function handleLogin(data) {
        login(data)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const newUserData = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password_hash: password,
            team_id: teamId,
        }
        try {
            const response = await fetch("http://127.0.0.1:5555/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUserData)
            })
            if (response.ok) {
                const data = await response.json();
                // console.log("Registration successful");
                setSignUpError(null);
                handleLogin(data);
                history.push("/");
            } else {
                const responseData = await response.json();
                const errorMessage = responseData.Errors[0];
                console.log("Registration failed: ", response.status)
                setSignUpError(errorMessage);
            }
        } catch (error) {
            console.log("Caught an error: ", error)
        }
    }

    return (
        <div className="register-master">
            {signUpError ? (
              <h2 className="register-error">{signUpError}</h2>
            ) : null}
            {/* <h1 className="register-header">Sign Up Here</h1> */}
            <form className="register-form" onSubmit={handleSubmit}>
                <h3>Pick your team:</h3>
                <select className="register-dropdown" value={teamId} onChange={(event) => setTeamId(event.target.value)}>
                    <option value="" >Team select</option>
                    <option value="1">Charleston</option>
                    <option value="2">Cherry Valley</option>
                    <option value="3">Covered Bridge</option>
                    <option value="4">Erlton</option>
                    <option value="5">Fox Hollow</option>
                    <option value="6">Old Orchard</option>
                </select>
                <input className="register-input" type="text" placeholder="First name*" onChange={(event) => setFirstName(event.target.value)}/>
                <input className="register-input" type="text" placeholder="Last name*" onChange={(event) => setLastName(event.target.value)}/>
                <input className="register-input" type="text" placeholder="Username*" onChange={(event) => setUsername(event.target.value)}/>
                <input className="register-input" type="password" placeholder="Password*" onChange={(event) => setPassword(event.target.value)}/>
                <button className="register-button">Submit</button>
            </form>
        </div>
    )
}

export default Register;