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
            {userId && <div className="greeting-div">
                {userId && <h1>Welcome back, {userName}</h1>}
                {userId && <h2>Current Team: {teamName}</h2>}
            </div>}
            <div className="instructions">
                <p>
                    The most common type of high school swim meet is the dual meet. In this type of meet, two teams come together in a 6-lane pool and pit three swimmers each against each other in a series of 11 events.
                    Each team has three lanes, commonly referred to as A (lanes 3 or 4), B (2 or 5), and C (1 or 6).
                </p>
                <div>
                    <p>
                        Often times, coaches set their lineups by trying to predict the opposing teams lineup first, and then working backwards from there. However, when teams are more evenly matched, or when teams
                        have more than one or two "studs," the kinds of swimmers that can swim any event and score well, setting a lineup can become very difficult. The number of possible lineups for the opposing team
                        grows very quickly, and then so do your own lineups. It becomes a chess match, of sorts. You could be completely outmatched by an opposing roster, but still come away with the win by entering
                        an unconventional lineup. This app is designed to help do just that.
                    </p>
                    <p>
                        There are two types of events: individuals and relays. Individual events are scored 6, 4, 3, 2, and 1 for 1st through 5th place. Relays are scored 8, 4, and 2 for
                        1st through 3rd place. This is important for many reasons, but the two most significant are: 1st place can be outscored in the individuals by going 2-3-4 or 2-3-5, and
                        a 1st-place relay cannot be outscored. Trends like these, among others, can allow coaches to ignore the studs, and try to score around them or negate them entirely.
                    </p>
                    <p>
                        To use this app:
                    </p>
                    <ol className="instructions-list">
                        <li>Log in (Username: Guest, Password: password1) or sign up to assign yourself a team.</li>
                        <p></p>
                        <li>Open the roster planner. The user's team is on the left side of the table, and the opposing team is on the right.</li>
                        <p></p>
                        <li>Set the opposing lineup with the dropdowns (leaving any event other than relays blank will break the program)</li>
                        <p></p>
                        <li>When you're ready to mock a lineup, press "Send Opposing Data" to generate a lineup for the user team</li>
                        <p></p>
                        <li>Placement and scoring will be decided automatically in the appropriate columns, and the score is tallied in the floating boxes on either side of the table</li>
                    </ol>
                </div>
            </div>
            <div className="coming-soon">
                Features to add:
                <ul className="works-in-progress">
                    <li>
                        Relay functionality
                        <div class="description">
                            <p>Relays are almost better handwritten, but I'd still like to get them working.</p>
                        </div>
                    </li>
                    <li>
                        Team builder
                        <div class="description">
                            <p>A table rendered similarly to the one in "My Team" that will allow a user to add an entirely new team. As if a coach were adding their team to the app.</p>
                        </div>
                    </li>
                    <li>
                        New meet types
                        <div class="description">
                            <p>College meets: short vs. long distance, Tournament style, MAYBE summer league?</p>
                        </div>
                    </li>
                    <li>
                        Each instance of the app is unique to each user
                        <div class="description">
                            <p>Right now, no matter who is logged in, all users see the same teams. I'd like this to eventually turn into a "coaches dashboard" of sorts.
                                Coach 1 logs in, and he swims teams A, B, and C every year. Well he added them last year, and now all he has to do is edit the times, and add/remove swimmers for this year.
                                Coach 2 logs in, and she doesn't swim teams A, B, and C. She swims X, Y, and Z. So those teams are in her "opposing teams". 
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* <div className="carousel-component-container">
                <Carousel />
            </div> */}
        </div>
    )
}

export default Main;