import React, {useEffect, useState} from "react";
import "../styling/MyTeam.css"
import { useUser } from "./UserContext";

function MyTeam() {

    const {userId, userTeamId, } = useUser();
    const [userSwimmers, setUserSwimmers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [cellChanged, setCellChanged] = useState(false);
    const [cellChanges, setCellChanges]= useState(false);

    function toggleEditMode() {
        // console.log("Toggled edit mode")
        setEditMode(!editMode);
    }

    useEffect(() => {
        async function getSwimmers() {
            try {
                const response = await fetch(`http://127.0.0.1:5555/teams/${userTeamId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserSwimmers(data.swimmer);
                    // console.log(data);
                } else {
                    // console.log("Hit the else block")
                }
            } catch (error) {
                console.log("Caught the error: ", error)
            }
        }
        getSwimmers();
    }, [userTeamId]);

    function formatTime(seconds) {
        if (seconds >= 60) {
            const minutes = Math.floor(seconds / 60);
            const remainder = (seconds % 60).toFixed(2);
            const formattedSeconds = remainder.padStart(5, '0'); // 5 total digits, add 0 to mm:_s:ms
            return `${minutes}:${formattedSeconds}`;
        } else {
            return seconds;
        }
    }

    // console.log("User Swimmers: ", userSwimmers)
    let tableBody = null
    if (userSwimmers.length > 0) {
        // gets me down to just name, times, and swimmers
        const swimmerInfo = userSwimmers.map((swimmer) => ({
            name: swimmer.name,
            times: swimmer.times.map((time) => ({
                time: formatTime(time.time),
                time_id: time.id,
                swimmer_id: time.swimmer_id,
            }))
        }));
        console.log("Swimmer Info:", swimmerInfo);
    
        if (swimmerInfo.length > 0) {
            tableBody = swimmerInfo.map((swimmer, index) => (
                <tr key={index} className="table-row">

                    {editMode ? (
                        <td className="table-cell" >
                            <input type="text" placeholder={swimmer.name} className="edit-swimmer-name"/>
                        </td>
                    ) : (
                        <td className="table-cell" id={swimmer.times[0].swimmer_id}>{swimmer.name}</td> //gives each name cell the ID for the swimmer
                    )}

                    {swimmer.times.map((time, timeIndex) => (
                        editMode ? (
                            <td key={timeIndex} className="table-cell">
                                <input type="text" placeholder={time.time} className="edit-swimmer-time"/>
                            </td>
                        ) : (
                            <td key={timeIndex} className="table-cell" id={time.time_id}>{time.time}</td> //gives each cell it's unique time ID
                        )
                    ))}

                    {editMode && <td><button>Delete Row</button></td>}
                </tr>
            ));
        }
    }

    return (
        <div className="table-container">
            {userId ? (
                <div>
                    <h1>Current user: {userId}</h1>
                    <h2>Current team: {userTeamId}</h2>
                    <div>Reminder to make tables sortable, and enable an "Edit mode" where a user can patch/post/delete a swimmer
                        <button onClick={toggleEditMode}>Edit Mode</button>
                    </div>
                    <h3>Swimmer Table</h3>
                    <table>
                        <thead>
                        <tr>
                            <th className="column-header">Name</th>
                            <th className="column-header">200 Freestyle</th>
                            <th className="column-header">200 IM</th>
                            <th className="column-header">50 Freestyle</th>
                            <th className="column-header">100 Butterfly</th>
                            <th className="column-header">100 Freestyle</th>
                            <th className="column-header">500 Freestyle</th>
                            <th className="column-header">100 Backstroke</th>
                            <th className="column-header">100 Breaststroke</th>
                            <th className="column-header">50 Backstroke</th>
                            <th className="column-header">50 Breaststroke</th>
                            <th className="column-header">50 Butterfly</th>
                        </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            ) : (
            <h1 className="login-advisement">Log in to view your team</h1>)}
        </div>
    )
}

export default MyTeam;