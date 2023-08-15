import React from "react";
import "../styling/OtherTeams.css"

function OtherTeams() {

    return (
        <div>
            This will check the logged in user, and render a list of other teams that 
            have been loaded into the database. Clicking a team will bring the user 
            to their team page, offering a simplistic view of swimmers and times.

            Do I wanna conditionally render the team here, below the list of teams? Or
            make a whole new componenet? Not sure yet.  
        </div>
    )
}

export default OtherTeams;