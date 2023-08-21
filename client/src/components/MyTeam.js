import React, {useEffect, useState} from "react";
import "../styling/MyTeam.css"
import { useUser } from "./UserContext";
import {useHistory} from "react-router-dom"

// Patch and delete seem to be working 100% now, and changes are saving to state as well so no reload req'd
    // Never write a conditional patch again, that was a waste of time and energy 
// Edit mode renders input fields --> handleName/TimeChange stores changes onChange --> Save Button triggers patch req --> changes to db AND state 
    // majority of the conditionality of the patch comes down to fieldName (time v. name) and changes to cells being registered in state via boolean per cell

// Refactor, ugly AF... and find out why each request gets sent 7-12 times per click

function MyTeam() {

    const {userId, userTeamId,} = useUser();

    const [userSwimmers, setUserSwimmers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [cellChanged, setCellChanged] = useState(false);
    const [cellChanges, setCellChanges] = useState([]);
    const [newSwimmerName, setNewSwimmerName] = useState("");
    // console.log("User swimmers: ", userSwimmers)

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

    function handleNameChange (event, swimmerId) {
        const newValue = event.target.value;
        setCellChanged(true);
        setCellChanges((prevChanges) => [
            ...prevChanges,
            { swimmerId, fieldName: "name", newValue },
        ]);
    };
    
    function handleTimeChange(event, swimmerId, timeId) {
        const newValue = event.target.value;
        setCellChanged(true);
        setCellChanges((prevChanges) => [
            ...prevChanges,
            { swimmerId, timeId, fieldName: "time", newValue },
        ]);
    };
    
    async function handleDeleteRow(swimmerId) {
        const confirmDelete = window.confirm("Are you sure you want to remove this swimmer? This will also remove all of the swimmer's times, and this action cannot be undone.")
    
        if (!confirmDelete) {
        console.log("User chose not to delete the swimmer.");
        return; 
        }
            try {
                const response = await fetch(`http://127.0.0.1:5555/swimmers/${swimmerId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    setUserSwimmers((prevSwimmers) =>
                        prevSwimmers.filter((swimmer) => swimmer.id !== swimmerId)
                    );
                    console.log("Ohhhh that swimmer gone")
                } else {
                    console.log("Error deleting row");
                }
            } catch (error) {
                console.log("Error deleting row: ", error);
            }
            setEditMode(false);
        };
    
    async function patchRequests(swimmerId, timeId, updatedData) {
        if (cellChanged) {
            try {
                for (const change of cellChanges) {
                    const { swimmerId, timeId, fieldName, newValue } = change;
                    const endpoint =
                        fieldName === "name"
                            ? `http://127.0.0.1:5555/swimmers/${swimmerId}`
                            : `http://127.0.0.1:5555/times/${timeId}`;
                    const response = await fetch(endpoint, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ [fieldName]: newValue }),
                    });
    
                    if (response.ok) {
                        console.log("Update successful");
                        if (fieldName === "name") {
                            setUserSwimmers(prevData =>
                                prevData.map(swimmer =>
                                    swimmer.id === swimmerId
                                        ? { ...swimmer, [fieldName]: newValue }
                                        : swimmer
                                )
                            );
                        } else if (fieldName === "time") {
                            setUserSwimmers(prevData =>
                                prevData.map(swimmer => {
                                    if (swimmer.id === swimmerId) {
                                        const updatedTimes = swimmer.times.map(time =>
                                            time.id === timeId ? { ...time, [fieldName]: newValue } : time
                                        );
                                        return { ...swimmer, times: updatedTimes };
                                    } else {
                                        return swimmer;
                                    }
                                })
                            );
                        }
                    } else {
                        console.log(`Patch request for ${fieldName} failed`);
                    }
                }
            } catch (error) {
                console.error("Error patching data:", error);
            }
    
            // Clear cell changes after successful patching
            setEditMode(false);
            setCellChanged(false);
            setCellChanges([]);

        }
    }

    let tableBody = null;
    let rowNum = 1;
    if (userSwimmers.length > 0) {
        const swimmerInfo = userSwimmers.map((swimmer) => ({
            name: swimmer.name,
            swimmerId: swimmer.id,
            times: swimmer.times.map((time) => ({
                time: formatTime(time.time),
                timeId: time.id,
            })),
        }));
        // console.log("Swimmer Info:", swimmerInfo);
    
        if (swimmerInfo.length > 0) {
            tableBody = swimmerInfo.map((swimmer, index) => (
                <tr key={index} className="table-row">
                    <td className="table-cell">{rowNum++}</td>
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

    async function handleSubmit() {
        const newSwimmer = {
            name: newSwimmerName,
            team_id: userTeamId,
        }
        try {
            const response = await fetch("http://127.0.0.1:5555/swimmers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newSwimmer)
            })
            if (response.ok) {
                const data = await response.json();
                console.log("New swimmer added successfully")
                setEditMode(false);
                window.location.reload();
            } else {
                console.log("Failed to add: ", response.status)
            }
        } catch (error) {
            console.log("Error during POST: ", error)
        }
    }

    return (
        <div className="table-container">
            {userId ? (
                <div>
                    <h1>Current user: {userId}</h1>
                    <h2>Current team: {userTeamId}</h2>
                    <div>

                        {editMode ? (
                            <button onClick={toggleEditMode}>Cancel Changes</button>
                        ) : (
                            <button onClick={toggleEditMode}>Edit Mode</button>)}

                        {editMode && (<button onClick={patchRequests}>Save Changes</button>)}

                    </div>
                    <h3>Swimmer Table</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className="column-header">#</th>
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
                            {editMode && (
                                <tr className="table-row">
                                    <td className="table-cell">#</td>
                                    <td className="table-cell">
                                        <input
                                            type="text"
                                            placeholder="New Swimmer Name"
                                            className="edit-swimmer-name"
                                            onChange={(event) => setNewSwimmerName(event.target.value)}
                                        />
                                    </td>
                                    <td className="table-cell">
                                        <button onClick={handleSubmit}>Add Swimmer</button>
                                    </td>
                                </tr>
                            )}
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