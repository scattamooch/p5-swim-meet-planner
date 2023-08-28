import React, {useState, useEffect} from "react";
import { useUser } from "./UserContext";
import "../styling/Main.css"
import Carousel from "./Carousel";

function Main() {

    const {userId, userTeamId, userName} = useUser();
    const [teamName, setTeamName] = useState();

    useEffect(() => {
        async function getTeamName() {
            try {
                const response = await fetch(`http://127.0.0.1:5555/teams/${userTeamId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTeamName(data.name);
                    // console.log(data);
                } else {
                    // console.log("Hit the else block")
                }
            } catch (error) {
                console.log("Caught the error: ", error)
            }
        }
        getTeamName();
    }, [userTeamId]);

    return (
        <div className="main-container">
            <div className="greeting-div">
            {userId && <h1>Welcome back, {userName}</h1>}
            {userId && <h2>Current Team: {teamName}</h2>}
            </div>
            <div className="carousel-component-container">
                <Carousel />
            </div>
        </div>
    )
}

export default Main;