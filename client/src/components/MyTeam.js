import React, {useEffect, useState} from "react";
import "../styling/MyTeam.css"
import { useUser } from "./UserContext";

// GET request to teams gives me team id, name, and swimmers []
// Swimmer gives me name and times []
// Time gives me event ID, time ID, swimmer ID, and time
// As it stands, I'm assigning the swimmer "name" cell their swimmer ID via an index in times... id={swimmer.times[0].swimmer_id}
    // which makes deletion miserable
    // restructure data from endpoint? 2 get requests? 

function MyTeam() {

    const {userId, userTeamId,} = useUser();

    const [userSwimmers, setUserSwimmers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [cellChanged, setCellChanged] = useState(false);
    const [cellChanges, setCellChanges] = useState([]);
    console.log("User swimmers: ", userSwimmers)

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
            const formattedSeconds = remainder.padStart(5, '0'); // 5 total digits, add leading zero to seconds if less than 10
            return `${minutes}:${formattedSeconds}`;
        } else {
            return seconds;
        }
    }

    

    let tableBody = null;
    if (userSwimmers.length > 0) {
        const swimmerInfo = userSwimmers.map((swimmer) => ({
            name: swimmer.name,
            swimmerId: swimmer.id,
            times: swimmer.times.map((time) => ({
                time: formatTime(time.time),
                timeId: time.id,
            })),
        }));
        console.log("Swimmer Info:", swimmerInfo);
    
        if (swimmerInfo.length > 0) {
            tableBody = swimmerInfo.map((swimmer, index) => (
                <tr key={index} className="table-row">
                    {editMode ? (
                        <td className="table-cell">
                            <input
                                type="text"
                                placeholder={swimmer.name}
                                className="edit-swimmer-name"
                                onChange={(event) => handleNameChange(event, swimmer.swimmerId)}
                            />
                        </td>
                    ) : (
                        <td className="table-cell" id={swimmer.swimmerId}>
                            {swimmer.name}
                        </td>
                    )}
                    {swimmer.times.map((time, timeIndex) => (
                        editMode ? (
                            <td key={timeIndex} className="table-cell">
                                <input
                                    type="text"
                                    placeholder={time.time}
                                    className="edit-swimmer-time"
                                    onChange={(event) =>
                                        handleTimeChange(event, swimmer.swimmerId, time.timeId)
                                    }
                                />
                            </td>
                        ) : (
                            <td key={timeIndex} className="table-cell" id={time.timeId}>
                                {time.time}
                            </td>
                        )
                    ))}
                    {editMode && (
                        <td>
                            <button onClick={() => handleDeleteRow(swimmer.swimmerId)}>
                                Delete Row
                            </button>
                        </td>
                    )}
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
                    <div>
                        Reminder to make tables sortable, and enable an "Edit mode" where a user can patch/post/delete a swimmer

                        {editMode ? (
                        <button onClick={toggleEditMode}>Leave Edit Mode</button>
                        ) : (
                        <button onClick={toggleEditMode}>Edit Mode</button>)}
                        {editMode && (<button onClick={patchRequests}>Save Changes</button>)}

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
                <h1 className="login-advisement">Log in to view your team</h1>
            )}
        </div>
    )
}

export default MyTeam;