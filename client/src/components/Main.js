import React from "react";
import { useUser } from "./UserContext";
import "../styling/Main.css"

function Main() {

    const {userId, userTeamId} = useUser();

    return (
        <div>
            <h1>Current user is: {userId}</h1>
            <h2>Current users team is: {userTeamId}</h2>
        </div>
    )
}

export default Main;