import React, {useEffect, useState} from "react";
import "../styling/RosterPlanner.css"
import { useUser } from "./UserContext";

function RosterPlanner() {

    const {userId, userTeamId} = useUser();

    const [allTeams, setAllTeams] = useState([])
    const [teamSelect, handleTeamSelect] = useState(null)
    const [oppTeam, setOppTeam] = useState([])
    const [userTeam, setUserTeam] = useState([])
    const [timeMap, setTimeMap] = useState({})
    const [loading, setLoading] = useState(true)

    const [free200, setFree200] = useState({1: "", 2: "", 3: "", swimmerName: ""})
    const [IM200, setIM200] = useState({1: "", 2: "", 3: "", swimmerName: ""})
    const [free50, setFree50] = useState({1: "", 2: "", 3: "", swimmerName: ""})
    const [fly100, setFly100] = useState({1: "", 2: "", 3: "", swimmerName: ""})
    const [free100, setFree100] = useState({1: "", 2: "", 3: "", swimmerName: ""})
    const [free500, setFree500] = useState({1: "", 2: "", 3: "", swimmerName: ""})
    const [back100, setBack100] = useState({1: "", 2: "", 3: "", swimmerName: ""})
    const [breast100, setBreast100] = useState({1: "", 2: "", 3: "", swimmerName: ""})

    const initialRelayData = {
        1: { swimmerName: "", time: "" },
        2: { swimmerName: "", time: "" },
        3: { swimmerName: "", time: "" },
        4: { swimmerName: "", time: "" }
      };
      
      // 200 Medley Relays
      const [aMedley, setAMedley] = useState({ ...initialRelayData });
      const [bMedley, setBMedley] = useState({ ...initialRelayData });
      const [cMedley, setCMedley] = useState({ ...initialRelayData });
      
      // 200 Free Relays
      const [a2Free, setA2Free] = useState({ ...initialRelayData });
      const [b2Free, setB2Free] = useState({ ...initialRelayData });
      const [c2Free, setC2Free] = useState({ ...initialRelayData });
      
      // 400 Free Relays
      const [a4Free, setA4Free] = useState({ ...initialRelayData });
      const [b4Free, setB4Free] = useState({ ...initialRelayData });
      const [c4Free, setC4Free] = useState({ ...initialRelayData });

    function handleFree200(laneNumber, time, swimmerName) {
        setFree200(prevState => ({
            ...prevState,
            [laneNumber]: time,
            swimmerName: swimmerName,
        })
        )
    }

    function handleIM200(laneNumber, time, swimmerName) {
        setIM200(prevState => ({
            ...prevState,
            [laneNumber]: time,
            swimmerName: swimmerName,
        })
        )
    }

    function handleFree50(laneNumber, time, swimmerName) {
        setFree50(prevState => ({
            ...prevState,
            [laneNumber]: time,
            swimmerName: swimmerName,
        })
        )
    }

    function handleFly100(laneNumber, time, swimmerName) {
        setFly100(prevState => ({
            ...prevState,
            [laneNumber]: time,
            swimmerName: swimmerName,
        })
        )
    }

    function handleFree100(laneNumber, time, swimmerName) {
        setFree100(prevState => ({
            ...prevState,
            [laneNumber]: time,
            swimmerName: swimmerName,
        })
        )
    }

    function handleFree500(laneNumber, time, swimmerName) {
        setFree500(prevState => ({
            ...prevState,
            [laneNumber]: time,
            swimmerName: swimmerName,
        })
        )
    }

    function handleBack100(laneNumber, time, swimmerName) {
        setBack100(prevState => ({
            ...prevState,
            [laneNumber]: time,
            swimmerName: swimmerName,
        })
        )
    }

    function handleBreast100(laneNumber, time, swimmerName) {
        setBreast100(prevState => ({
            ...prevState,
            [laneNumber]: time,
            swimmerName: swimmerName,
        })
        )
    }
    
// Medley Handlers
    function handleAMedley(position, time, swimmerName) {
        setAMedley(prevState => ({
            ...prevState,
            [position]: {swimmerName, time}
        })
        )
    }

    function handleBMedley(position, time, swimmerName) {
        setBMedley(prevState => ({
            ...prevState,
            [position]: {swimmerName, time}
        })
        )
    }

    function handleCMedley(position, time, swimmerName) {
        setCMedley(prevState => ({
            ...prevState,
            [position]: {swimmerName, time}
        })
        )
    }

// 2 Free Relay Handlers
    function handleA2Free(position, time, swimmerName) {
        setA2Free(prevState => ({
            ...prevState,
            [position]: {swimmerName, time}
        })
        )
    }

    function handleB2Free(position, time, swimmerName) {
        setB2Free(prevState => ({
            ...prevState,
            [position]: {swimmerName, time}
        })
        )
    }
    function handleC2Free(position, time, swimmerName) {
        setC2Free(prevState => ({
            ...prevState,
            [position]: {swimmerName, time}
        })
        )
    }

// 4 Free Relay Handlers
function handleA4Free(position, time, swimmerName) {
    setA4Free(prevState => ({
        ...prevState,
        [position]: {swimmerName, time}
    })
    )
}

function handleB4Free(position, time, swimmerName) {
    setB4Free(prevState => ({
        ...prevState,
        [position]: {swimmerName, time}
    })
    )
}
function handleC4Free(position, time, swimmerName) {
    setC4Free(prevState => ({
        ...prevState,
        [position]: {swimmerName, time}
    })
    )
}

    //get Opp team
    async function getOppTeam(teamSelect) {
    try {
        const response = await fetch (`http://127.0.0.1:5555/teams/${teamSelect}`);
        if (response.ok) {
        const data = await response.json();
        setOppTeam(data);
        createTimeMap(data.swimmer);
        setLoading(false);
        console.log("Getting: ", data);
        } else {
        console.log("Could not fetch team");
        }
    } catch (error) {
        console.log("Caught the error: ", error);
        }
    }
        
    useEffect(() => { //get ALL teams
        async function getAllTeams() {
            try {
                const response = await fetch ("http://127.0.0.1:5555/teams")
                if (response.ok) {
                    const data = await response.json()
                    setAllTeams(data)
                    // console.log("All Teams: ", data)
                } else {
                    console.log("Could not fetch teams")
                }
            } catch (error) {
                console.log("Caught the error: ", error)
            }
        }
        getAllTeams()
    }, [])

    function createTimeMap(swimmers) {
        const swimmerTimes = swimmers.map((swimmer) => {
            return swimmer.times.map((time) => {
                return {
                    swimmerId: swimmer.id,
                    swimmerName: swimmer.name,
                    ...time,
                    //x lists of 11 (where x is the number of swimmers on the team)
                }
            })
        }).flat() //combine all the lists into one long array of objects (11 * x = # of objects in the array)
        // console.log("swimmerTimes: ", swimmerTimes)
        const swimmerTimeMap = {}
        for (const swimmerTime of swimmerTimes) {
            if (swimmerTime.event_id in swimmerTimeMap) {
                swimmerTimeMap[swimmerTime.event_id].push(swimmerTime) 
            } else {                                                       //this if/else then sorts the info for each swimmer into groupings by their event_id, for the dropdown
                swimmerTimeMap[swimmerTime.event_id] = [swimmerTime]
            }
        }
        // console.log(swimmerTimeMap)
        setTimeMap(swimmerTimeMap)
    }

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

    return (
        <div className="table-container">
            <div>
            <h1>Current User: {userId}</h1>
            <h2>Mocking as: Team {userTeamId}</h2>
            <h3>Mock against: 
                <select className="opp-select" onChange={(e) => getOppTeam(e.target.value)}>
                    <option value="">Pick a team</option>
                    {allTeams.map((team) => {
                        return <option value={team.id} name={team.name}>{team.name}</option>
                    })}
                </select>
            </h3>
            </div>
            {loading ? (
                <div className="loader">Waiting for team selection...</div>) : (
            <table className="roster-table">
                <thead>
                    <tr>
                        <th className="column-header">Event</th>
                        <th className="column-header">Swimmers</th>
                        <th className="column-header">Pl</th>
                        <th className="column-header">Score</th>
                        <th className="column-header">Our Times</th>
                        <th className="column-header">Swimmers</th>
                        <th className="column-header">Their Times</th>
                        <th className="column-header">Score</th>
                        <th className="column-header">Pl</th>
                        <th className="column-header" colSpan="2">Scoring</th>
                    </tr>
                </thead>
                <tbody>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="18">200 Medley Relay</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={aMedley.name} onChange={(e) => handleAMedley(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[9].map((aMedley) => {
                                    return <option value={aMedley.time} name={aMedley.swimmerName}>{aMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(aMedley[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">We</td>
                        <td className="table-cell">They</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={aMedley.name} onChange={(e) => handleAMedley(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[10].map((aMedley) => {
                                    return <option value={aMedley.time} name={aMedley.swimmerName}>{aMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(aMedley[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={aMedley.name} onChange={(e) => handleAMedley(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[11].map((aMedley) => {
                                    return <option value={aMedley.time} name={aMedley.swimmerName}>{aMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(aMedley[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={aMedley.name} onChange={(e) => handleAMedley(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((aMedley) => {
                                    return <option value={aMedley.time} name={aMedley.swimmerName}>{aMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(aMedley[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(aMedley[1].time) + parseFloat(aMedley[2].time) + parseFloat(aMedley[3].time) + parseFloat(aMedley[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={bMedley.name} onChange={(e) => handleBMedley(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[9].map((bMedley) => {
                                    return <option value={bMedley.time} name={bMedley.swimmerName}>{bMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(bMedley[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={bMedley.name} onChange={(e) => handleBMedley(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[10].map((bMedley) => {
                                    return <option value={bMedley.time} name={bMedley.swimmerName}>{bMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(bMedley[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={bMedley.name} onChange={(e) => handleBMedley(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[11].map((bMedley) => {
                                    return <option value={bMedley.time} name={bMedley.swimmerName}>{bMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(bMedley[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={bMedley.name} onChange={(e) => handleBMedley(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((bMedley) => {
                                    return <option value={bMedley.time} name={bMedley.swimmerName}>{bMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(bMedley[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(bMedley[1].time) + parseFloat(bMedley[2].time) + parseFloat(bMedley[3].time) + parseFloat(bMedley[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={cMedley.name} onChange={(e) => handleCMedley(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[9].map((cMedley) => {
                                    return <option value={cMedley.time} name={cMedley.swimmerName}>{cMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(cMedley[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={cMedley.name} onChange={(e) => handleCMedley(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[10].map((cMedley) => {
                                    return <option value={cMedley.time} name={cMedley.swimmerName}>{cMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(cMedley[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={cMedley.name} onChange={(e) => handleCMedley(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[11].map((cMedley) => {
                                    return <option value={cMedley.time} name={cMedley.swimmerName}>{cMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(cMedley[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={cMedley.name} onChange={(e) => handleCMedley(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((cMedley) => {
                                    return <option value={cMedley.time} name={cMedley.swimmerName}>{cMedley.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(cMedley[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(cMedley[1].time) + parseFloat(cMedley[2].time) + parseFloat(cMedley[3].time) + parseFloat(cMedley[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>
                    
                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">200 Free</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                            <select className="opposing-swimmer-dropdown" value={free200.name} onChange={(e) => handleFree200(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[1].map((twoFree) => {
                                    return <option value={twoFree.time} name={twoFree.swimmerName}>{twoFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free200[1])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 2</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free200.name} onChange={(e) => handleFree200(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[1].map((twoFree) => {
                                    return <option value={twoFree.time} name={twoFree.swimmerName}>{twoFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free200[2])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 3</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free200.name} onChange={(e) => handleFree200(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[1].map((twoFree) => {
                                    return <option value={twoFree.time} name={twoFree.swimmerName}>{twoFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free200[3])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">200 IM</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={IM200.name} onChange={(e) => handleIM200(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[2].map((twoIM) => {
                                    return <option value={twoIM.time} name={twoIM.swimmerName}>{twoIM.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(IM200[1])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 2</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={IM200.name} onChange={(e) => handleIM200(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[2].map((twoIM) => {
                                    return <option value={twoIM.time} name={twoIM.swimmerName}>{twoIM.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(IM200[2])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 3</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={IM200.name} onChange={(e) => handleIM200(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[2].map((twoIM) => {
                                    return <option value={twoIM.time} name={twoIM.swimmerName}>{twoIM.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(IM200[3])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">50 Free</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free50.name} onChange={(e) => handleFree50(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((fiftyFree) => {
                                    return <option value={fiftyFree.time} name={fiftyFree.swimmerName}>{fiftyFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free50[1])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 2</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free50.name} onChange={(e) => handleFree50(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((fiftyFree) => {
                                    return <option value={fiftyFree.time} name={fiftyFree.swimmerName}>{fiftyFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free50[2])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 3</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free50.name} onChange={(e) => handleFree50(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((fiftyFree) => {
                                    return <option value={fiftyFree.time} name={fiftyFree.swimmerName}>{fiftyFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free50[3])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">100 Fly</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={fly100.name} onChange={(e) => handleFly100(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[4].map((oneFly) => {
                                    return <option value={oneFly.time} name={oneFly.swimmerName}>{oneFly.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(fly100[1])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 2</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={fly100.name} onChange={(e) => handleFly100(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[4].map((oneFly) => {
                                    return <option value={oneFly.time} name={oneFly.swimmerName}>{oneFly.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(fly100[2])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 3</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={fly100.name} onChange={(e) => handleFly100(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[4].map((oneFly) => {
                                    return <option value={oneFly.time} name={oneFly.swimmerName}>{oneFly.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(fly100[3])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">100 Free</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free100.name} onChange={(e) => handleFree100(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((oneFree) => {
                                    return <option value={oneFree.time} name={oneFree.swimmerName}>{oneFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free100[1])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 2</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free100.name} onChange={(e) => handleFree100(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((oneFree) => {
                                    return <option value={oneFree.time} name={oneFree.swimmerName}>{oneFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free100[2])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 3</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free100.name} onChange={(e) => handleFree100(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((oneFree) => {
                                    return <option value={oneFree.time} name={oneFree.swimmerName}>{oneFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free100[3])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">500 Free</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free500.name} onChange={(e) => handleFree500(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[6].map((fiveFree) => {
                                    return <option value={fiveFree.time} name={fiveFree.swimmerName}>{fiveFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free500[1])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 2</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free500.name} onChange={(e) => handleFree500(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[6].map((fiveFree) => {
                                    return <option value={fiveFree.time} name={fiveFree.swimmerName}>{fiveFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free500[2])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 3</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free500.name} onChange={(e) => handleFree500(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[6].map((fiveFree) => {
                                    return <option value={fiveFree.time} name={fiveFree.swimmerName}>{fiveFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free500[3])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="18">200 Free Relay</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={a2Free.name} onChange={(e) => handleA2Free(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((a2Free) => {
                                    return <option value={a2Free.time} name={a2Free.swimmerName}>{a2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(a2Free[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={a2Free.name} onChange={(e) => handleA2Free(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((a2Free) => {
                                    return <option value={a2Free.time} name={a2Free.swimmerName}>{a2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(a2Free[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={a2Free.name} onChange={(e) => handleA2Free(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((a2Free) => {
                                    return <option value={a2Free.time} name={a2Free.swimmerName}>{a2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(a2Free[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={a2Free.name} onChange={(e) => handleA2Free(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((a2Free) => {
                                    return <option value={a2Free.time} name={a2Free.swimmerName}>{a2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(a2Free[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(a2Free[1].time) + parseFloat(a2Free[2].time) + parseFloat(a2Free[3].time) + parseFloat(a2Free[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={b2Free.name} onChange={(e) => handleB2Free(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((b2Free) => {
                                    return <option value={b2Free.time} name={b2Free.swimmerName}>{b2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(b2Free[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={b2Free.name} onChange={(e) => handleB2Free(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((b2Free) => {
                                    return <option value={b2Free.time} name={b2Free.swimmerName}>{b2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(b2Free[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={b2Free.name} onChange={(e) => handleB2Free(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((b2Free) => {
                                    return <option value={b2Free.time} name={b2Free.swimmerName}>{b2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(b2Free[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={b2Free.name} onChange={(e) => handleB2Free(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((b2Free) => {
                                    return <option value={b2Free.time} name={b2Free.swimmerName}>{b2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(b2Free[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(b2Free[1].time) + parseFloat(b2Free[2].time) + parseFloat(b2Free[3].time) + parseFloat(b2Free[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={c2Free.name} onChange={(e) => handleC2Free(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((c2Free) => {
                                    return <option value={c2Free.time} name={c2Free.swimmerName}>{c2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(c2Free[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={c2Free.name} onChange={(e) => handleC2Free(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((c2Free) => {
                                    return <option value={c2Free.time} name={c2Free.swimmerName}>{c2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(c2Free[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={c2Free.name} onChange={(e) => handleC2Free(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((c2Free) => {
                                    return <option value={c2Free.time} name={c2Free.swimmerName}>{c2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(c2Free[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={c2Free.name} onChange={(e) => handleC2Free(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((c2Free) => {
                                    return <option value={c2Free.time} name={c2Free.swimmerName}>{c2Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(c2Free[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(c2Free[1].time) + parseFloat(c2Free[2].time) + parseFloat(c2Free[3].time) + parseFloat(c2Free[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">100 Back</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={back100.name} onChange={(e) => handleBack100(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[7].map((oneBack) => {
                                    return <option value={oneBack.time} name={oneBack.swimmerName}>{oneBack.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(back100[1])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 2</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={back100.name} onChange={(e) => handleBack100(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[7].map((oneBack) => {
                                    return <option value={oneBack.time} name={oneBack.swimmerName}>{oneBack.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(back100[2])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 3</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={breast100.name} onChange={(e) => handleBack100(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[7].map((oneBack) => {
                                    return <option value={oneBack.time} name={oneBack.swimmerName}>{oneBack.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(back100[3])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">100 Breast</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={breast100.name} onChange={(e) => handleBreast100(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[8].map((oneBreast) => {
                                    return <option value={oneBreast.time} name={oneBreast.swimmerName}>{oneBreast.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(breast100[1])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 2</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={breast100.name} onChange={(e) => handleBreast100(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[8].map((oneBreast) => {
                                    return <option value={oneBreast.time} name={oneBreast.swimmerName}>{oneBreast.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(breast100[2])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Swimmer 3</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Time</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={breast100.name} onChange={(e) => handleBreast100(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[8].map((oneBreast) => {
                                    return <option value={oneBreast.time} name={oneBreast.swimmerName}>{oneBreast.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(breast100[3])}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="18">400 Free Relay</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={a4Free.name} onChange={(e) => handleA4Free(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((a4Free) => {
                                    return <option value={a4Free.time} name={a4Free.swimmerName}>{a4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(a4Free[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={a4Free.name} onChange={(e) => handleA4Free(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((a4Free) => {
                                    return <option value={a4Free.time} name={a4Free.swimmerName}>{a4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(a4Free[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={a4Free.name} onChange={(e) => handleA4Free(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((a4Free) => {
                                    return <option value={a4Free.time} name={a4Free.swimmerName}>{a4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(a4Free[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={a4Free.name} onChange={(e) => handleA4Free(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((a4Free) => {
                                    return <option value={a4Free.time} name={a4Free.swimmerName}>{a4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(a4Free[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(a4Free[1].time) + parseFloat(a4Free[2].time) + parseFloat(a4Free[3].time) + parseFloat(a4Free[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={b4Free.name} onChange={(e) => handleB4Free(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((b4Free) => {
                                    return <option value={b4Free.time} name={b4Free.swimmerName}>{b4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(b4Free[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={b4Free.name} onChange={(e) => handleB4Free(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((b4Free) => {
                                    return <option value={b4Free.time} name={b4Free.swimmerName}>{b4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(b4Free[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={b4Free.name} onChange={(e) => handleB4Free(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((b4Free) => {
                                    return <option value={b4Free.time} name={b4Free.swimmerName}>{b4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(b4Free[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={b4Free.name} onChange={(e) => handleB4Free(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((b4Free) => {
                                    return <option value={b4Free.time} name={b4Free.swimmerName}>{b4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(b4Free[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(b4Free[1].time) + parseFloat(b4Free[2].time) + parseFloat(b4Free[3].time) + parseFloat(b4Free[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={c4Free.name} onChange={(e) => handleC4Free(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((c4Free) => {
                                    return <option value={c4Free.time} name={c4Free.swimmerName}>{c4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(c4Free[1].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={c4Free.name} onChange={(e) => handleC4Free(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((c4Free) => {
                                    return <option value={c4Free.time} name={c4Free.swimmerName}>{c4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(c4Free[2].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Place</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={c4Free.name} onChange={(e) => handleC4Free(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((c4Free) => {
                                    return <option value={c4Free.time} name={c4Free.swimmerName}>{c4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(c4Free[3].time)}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">Relay 1</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell">Split</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={c4Free.name} onChange={(e) => handleC4Free(4, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((c4Free) => {
                                    return <option value={c4Free.time} name={c4Free.swimmerName}>{c4Free.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(c4Free[4].time)}</td>
                        <td className="table-cell">Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">{formatTime(parseFloat(c4Free[1].time) + parseFloat(c4Free[2].time) + parseFloat(c4Free[3].time) + parseFloat(c4Free[4].time))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                </tbody>
            </table>
            )}
        </div>

    )
}

export default RosterPlanner;