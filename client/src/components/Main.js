import React from "react";
import { useUser } from "./UserContext";
import "../styling/Main.css"

function Main() {

    const {userId} = useUser();

    return (
        <div>
            <h1>Current user is: {userId}</h1>
        </div>
    )
}

export default Main;