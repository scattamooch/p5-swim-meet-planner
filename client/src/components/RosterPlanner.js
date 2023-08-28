import React, {useEffect, useState} from "react";
import "../styling/RosterPlanner.css"
import { useUser } from "./UserContext";

function RosterPlanner() {

    const {userId, userTeamId} = useUser();

    const [allTeams, setAllTeams] = useState([])
    const [teamName, setTeamName] = useState()
    const [oppTeam, setOppTeam] = useState([])
    const [userTeam, setUserTeam] = useState({})
    const [timeMap, setTimeMap] = useState({})
    const [userTimeMap, setUserTimeMap] = useState({})
    const [loading, setLoading] = useState(true)

    const [free200, setFree200] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", swimmerName: ""})
    const [IM200, setIM200] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", swimmerName: ""})
    const [free50, setFree50] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", swimmerName: ""})
    const [fly100, setFly100] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", swimmerName: ""})
    const [free100, setFree100] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", swimmerName: ""})
    const [free500, setFree500] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", swimmerName: ""})
    const [back100, setBack100] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", swimmerName: ""})
    const [breast100, setBreast100] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", swimmerName: ""})

    const initialRelayState = {
        1: { swimmerName: "", time: "" },
        2: { swimmerName: "", time: "" },
        3: { swimmerName: "", time: "" },
        4: { swimmerName: "", time: "" }
      };
      
    // 200 Medley Relays
    const [aMedley, setAMedley] = useState({ ...initialRelayState });
    const [bMedley, setBMedley] = useState({ ...initialRelayState });
    const [cMedley, setCMedley] = useState({ ...initialRelayState });
    
    // 200 Free Relays
    const [a2Free, setA2Free] = useState({ ...initialRelayState });
    const [b2Free, setB2Free] = useState({ ...initialRelayState });
    const [c2Free, setC2Free] = useState({ ...initialRelayState });
    
    // 400 Free Relays
    const [a4Free, setA4Free] = useState({ ...initialRelayState });
    const [b4Free, setB4Free] = useState({ ...initialRelayState });
    const [c4Free, setC4Free] = useState({ ...initialRelayState });

    // Relay Scoring/Placement State -- total up the relay splits for placement and scoring
    const [medleyTimes, setMedleyTimes] = useState({1: 0, 2: 0, 3: 0})
    const [twoFreeRelayTimes, setTwoFreeRelayTimes] = useState({1: 0, 2: 0, 3: 0})
    const [fourFreeRelayTimes, setFourFreeRelayTimes] = useState({1: 0, 2: 0, 3: 0})



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
        // useEffect saves the total relay times to state
    useEffect(() => {
        const totalTimes = {
          1: parseFloat(aMedley[1].time) + parseFloat(aMedley[2].time) + parseFloat(aMedley[3].time) + parseFloat(aMedley[4].time),
          2: parseFloat(bMedley[1].time) + parseFloat(bMedley[2].time) + parseFloat(bMedley[3].time) + parseFloat(bMedley[4].time),
          3: parseFloat(cMedley[1].time) + parseFloat(cMedley[2].time) + parseFloat(cMedley[3].time) + parseFloat(cMedley[4].time),
        };
        
        setMedleyTimes(totalTimes);
      }, [aMedley, bMedley, cMedley]);

    //   console.log(medleyTimes);
      

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

    useEffect(() => {
        const totalTimes = {
          1: parseFloat(a2Free[1].time) + parseFloat(a2Free[2].time) + parseFloat(a2Free[3].time) + parseFloat(a2Free[4].time),
          2: parseFloat(b2Free[1].time) + parseFloat(b2Free[2].time) + parseFloat(b2Free[3].time) + parseFloat(b2Free[4].time),
          3: parseFloat(c2Free[1].time) + parseFloat(c2Free[2].time) + parseFloat(c2Free[3].time) + parseFloat(c2Free[4].time),
        };
        
        setTwoFreeRelayTimes(totalTimes);
      }, [a2Free, b2Free, c2Free]);

    //   console.log(twoFreeRelayTimes);

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

    useEffect(() => {
        const totalTimes = {
          1: parseFloat(a4Free[1].time) + parseFloat(a4Free[2].time) + parseFloat(a4Free[3].time) + parseFloat(a4Free[4].time),
          2: parseFloat(b4Free[1].time) + parseFloat(b4Free[2].time) + parseFloat(b4Free[3].time) + parseFloat(b4Free[4].time),
          3: parseFloat(c4Free[1].time) + parseFloat(c4Free[2].time) + parseFloat(c4Free[3].time) + parseFloat(c4Free[4].time),
        };
        
        setFourFreeRelayTimes(totalTimes);
      }, [a4Free, b4Free, c4Free]);

    //   console.log(fourFreeRelayTimes);

    //get Opp team
    async function getOppTeam(teamSelect) {
    try {
        const response = await fetch (`http://127.0.0.1:5555/teams/${teamSelect}`);
        if (response.ok) {
        const data = await response.json();
        setOppTeam(data);
        createTimeMap(data.swimmer);
        setLoading(false);
        // console.log("Getting: ", data);
        } else {
        console.log("Could not fetch team");
        }
    } catch (error) {
        console.log("Caught the error: ", error);
        }
    }

    // OPP Time Map OPP OPP OPP OPP
    function createTimeMap(swimmers) {
        const swimmerTimes = swimmers.map((swimmer) => {
            return swimmer.times.map((time) => {
                return {
                    swimmerId: swimmer.id,
                    swimmerName: swimmer.name,
                    ...time,
                    //x lists of 11 (where x is the number of swimmers on the team, and 11 is the # of events)
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

    // USER fetch
    useEffect(() => {
        async function getUserTeam() {
            try {
                const response = await fetch(`http://127.0.0.1:5555/teams/${userTeamId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserTeam(data);
                    createUserTimeMap(data.swimmer);
                    setTeamName(data.name)
                    // console.log("Getting: ", data);
                } else {
                    console.log("Could not fetch team");
                }
            } catch (error) {
                console.log("Caught the error: ", error);
            }
        }
        getUserTeam();
    }, [userTeamId]);

    // USER time map --> all times for each event rather than all times for each swimmer
    function createUserTimeMap(swimmers) {
        const swimmerTimes = swimmers.map((swimmer) => {
            return swimmer.times.map((time) => {
                return {
                    swimmerId: swimmer.id,
                    swimmerName: swimmer.name,
                    ...time,
                }
            })
        }).flat()
        // console.log("swimmerTimes: ", swimmerTimes)
        const swimmerTimeMap = {}
        for (const swimmerTime of swimmerTimes) {
            if (swimmerTime.event_id in swimmerTimeMap) {
                swimmerTimeMap[swimmerTime.event_id].push(swimmerTime) 
            } else { 
                swimmerTimeMap[swimmerTime.event_id] = [swimmerTime]
            }
        }
        console.log(swimmerTimeMap)
        setUserTimeMap(swimmerTimeMap)
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

    function sortAndPlaceIndividuals(race) {
        const swimmers = Object.entries(race)
          .filter(([laneNumber, swimmerData]) => laneNumber !== "swimmerName")
          .map(([laneNumber, swimmerData]) => ({
            laneNumber: parseInt(laneNumber),
            time: parseFloat(swimmerData),
            swimmerName: race.swimmerName,
          }));
        swimmers.sort((a, b) => a.time - b.time);
        const placements = {};
        swimmers.forEach((swimmer, index) => {
          const placement = index + 1;
          placements[swimmer.laneNumber] = `${placement}`;
        });
      
        return placements;
      }

    function scoreIndividuals(place) {
        if (place == 1) {
            return 6
        } else if (place == 2) {
            return 4
        } else if (place == 3) {
            return 3
        } else if (place == 4) {
            return 2
        } else if (place == 5) {
            return 1
        } else {
            return 0
        }
    }

    function scoreRelays(place) {
        if (place == 1) {
            return 8
        } else if (place == 2) {
            return 4
        } else if (place == 3) {
            return 2
        } else {
            return 0
        }
    }

    async function packageAndSend() {
        const oppsLineupSnapshot = {
            medleyTimes, free200, IM200, free50, fly100, free100, free500,
            twoFreeRelayTimes, back100, breast100, fourFreeRelayTimes, 
        }
        const payload = {oppsLineupSnapshot: oppsLineupSnapshot, userTimeMap: userTimeMap,}
        try {
            const response = await fetch("/roster-builder", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUserTeam(data);
                updateEventStateUserSwimmers(data);
                // console.log("opps time map: ", timeMap)
            } else {
                console.log("Something went wrong: ", response.status)
            }
        } catch (error) {
            console.log("Caught the error: ", error)
        }
    }

    function updateEventStateUserSwimmers(userRoster) {
        const eventHandlerMap = {free200: setFree200, IM200: setIM200, free50: setFree50, fly100: setFly100,
                                    free100: setFree100, free500: setFree500, back100: setBack100, breast100: setBreast100}
        Object.entries(userRoster).forEach(([eventName, swimmerData]) => {
            if (eventName in eventHandlerMap) {
            eventHandlerMap[eventName](prevState => ({
                ...prevState,
                4: swimmerData.user_lineup[4].time,
                5: swimmerData.user_lineup[5].time,
                6: swimmerData.user_lineup[6].time,
            })
            )}
        })
    }



    // console.log("User team: ", userTeam)
    return (
        <div className="table-container">
            <div className="roster-master">
            <h1>Current User: {userId}</h1>
            <h2>Mocking as: Team {userTeamId}</h2>
            <h3>Mock against: 
                <select className="opp-select" onChange={(e) => getOppTeam(e.target.value)}>
                    <option value="">Pick a team</option>
                    {allTeams.map((team) => {
                        return <option value={team.id} name={team.name}>{team.name}</option>
                    })}
                </select>
                <div>
                    <button onClick={packageAndSend}>Let's Try to Send This Data</button>
                </div>
            </h3>
            </div>
            {loading ? (
                <div className="loader">Waiting for team selection...</div>) : (
            <table className="roster-table">
                <thead className="table-header">
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
                        <td className="table-cell">{sortAndPlaceIndividuals(medleyTimes)[1]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(medleyTimes)[1])}</td>
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
                        <td className="table-cell">{sortAndPlaceIndividuals(medleyTimes)[2]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(medleyTimes)[2])}</td>
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
                        <td className="table-cell">{sortAndPlaceIndividuals(medleyTimes)[3]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(medleyTimes)[3])}</td>
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
                        <td className="table-cell">+{parseInt(scoreRelays(sortAndPlaceIndividuals(medleyTimes)[1])) + parseInt(scoreRelays(sortAndPlaceIndividuals(medleyTimes)[2])) + parseInt(scoreRelays(sortAndPlaceIndividuals(medleyTimes)[3]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>
                    
                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">200 Free</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free200?.user_lineup?.[4]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free200)[4]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free200)[4])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free200?.user_lineup?.[4]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                            <select className="opposing-swimmer-dropdown" value={free200.name} onChange={(e) => handleFree200(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[1].map((twoFree) => {
                                    return <option id={twoFree.id} value={twoFree.time} name={twoFree.swimmerName}>{twoFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free200[1])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free200)[1])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free200)[1]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{formatTime(userTeam?.free200?.user_lineup?.[5]?.swimmerName) ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free200)[5]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free200)[5])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free200?.user_lineup?.[5]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free200.name} onChange={(e) => handleFree200(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[1].map((twoFree) => {
                                    return <option value={twoFree.time} name={twoFree.swimmerName}>{twoFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free200[2])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free200)[2])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free200)[2]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{formatTime(userTeam?.free200?.user_lineup?.[6]?.swimmerName) ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free200)[6]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free200)[6])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free200?.user_lineup?.[6]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free200.name} onChange={(e) => handleFree200(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[1].map((twoFree) => {
                                    return <option value={twoFree.time} name={twoFree.swimmerName}>{twoFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free200[3])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free200)[3])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free200)[3]}</td>
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
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(free200)[4])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free200)[5])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free200)[6]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(free200)[1])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free200)[2])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free200)[3]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">200 IM</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.IM200?.user_lineup?.[4]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(IM200)[4]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(IM200)[4])}</td>
                        <td className="table-cell">{formatTime(userTeam?.IM200?.user_lineup?.[4]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={IM200.name} onChange={(e) => handleIM200(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[2].map((twoIM) => {
                                    return <option value={twoIM.time} name={twoIM.swimmerName}>{twoIM.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(IM200[1])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(IM200)[1])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(IM200)[1]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.IM200?.user_lineup?.[5]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(IM200)[5]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(IM200)[5])}</td>
                        <td className="table-cell">{formatTime(userTeam?.IM200?.user_lineup?.[5]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={IM200.name} onChange={(e) => handleIM200(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[2].map((twoIM) => {
                                    return <option value={twoIM.time} name={twoIM.swimmerName}>{twoIM.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(IM200[2])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(IM200)[2])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(IM200)[2]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.IM200?.user_lineup?.[6]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(IM200)[6]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(IM200)[6])}</td>
                        <td className="table-cell">{formatTime(userTeam?.IM200?.user_lineup?.[6]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={IM200.name} onChange={(e) => handleIM200(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[2].map((twoIM) => {
                                    return <option value={twoIM.time} name={twoIM.swimmerName}>{twoIM.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(IM200[3])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(IM200)[3])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(IM200)[3]}</td>
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
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(IM200)[4])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(IM200)[5])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(IM200)[6]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(IM200)[1])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(IM200)[2])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(IM200)[3]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">50 Free</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free50?.user_lineup?.[4]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free50)[4]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free50)[4])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free50?.user_lineup?.[4]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free50.name} onChange={(e) => handleFree50(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((fiftyFree) => {
                                    return <option value={fiftyFree.time} name={fiftyFree.swimmerName}>{fiftyFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free50[1])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free50)[1])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free50)[1]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free50?.user_lineup?.[5]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free50)[5]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free50)[5])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free50?.user_lineup?.[5]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free50.name} onChange={(e) => handleFree50(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((fiftyFree) => {
                                    return <option value={fiftyFree.time} name={fiftyFree.swimmerName}>{fiftyFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free50[2])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free50)[2])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free50)[2]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free50?.user_lineup?.[6]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free50)[6]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free50)[6])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free50?.user_lineup?.[6]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free50.name} onChange={(e) => handleFree50(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[3].map((fiftyFree) => {
                                    return <option value={fiftyFree.time} name={fiftyFree.swimmerName}>{fiftyFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free50[3])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free50)[3])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free50)[3]}</td>
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
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(free50)[4])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free50)[5])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free50)[6]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(free50)[1])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free50)[2])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free50)[3]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">100 Fly</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.fly100?.user_lineup?.[4]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(fly100)[4]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(fly100)[4])}</td>
                        <td className="table-cell">{formatTime(userTeam?.fly100?.user_lineup?.[4]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={fly100.name} onChange={(e) => handleFly100(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[4].map((oneFly) => {
                                    return <option value={oneFly.time} name={oneFly.swimmerName}>{oneFly.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(fly100[1])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(fly100)[1])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(fly100)[1]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                    <td className="table-cell">{userTeam?.fly100?.user_lineup?.[5]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(fly100)[5]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(fly100)[5])}</td>
                        <td className="table-cell">{formatTime(userTeam?.fly100?.user_lineup?.[5]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={fly100.name} onChange={(e) => handleFly100(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[4].map((oneFly) => {
                                    return <option value={oneFly.time} name={oneFly.swimmerName}>{oneFly.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(fly100[2])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(fly100)[2])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(fly100)[2]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.fly100?.user_lineup?.[6]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(fly100)[6]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(fly100)[6])}</td>
                        <td className="table-cell">{formatTime(userTeam?.fly100?.user_lineup?.[6]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={fly100.name} onChange={(e) => handleFly100(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[4].map((oneFly) => {
                                    return <option value={oneFly.time} name={oneFly.swimmerName}>{oneFly.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(fly100[3])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(fly100)[3])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(fly100)[3]}</td>
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
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(fly100)[4])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(fly100)[5])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(fly100)[6]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(fly100)[1])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(fly100)[2])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(fly100)[3]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">100 Free</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free100?.user_lineup?.[4]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free100)[4]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free100)[4])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free100?.user_lineup?.[4]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free100.name} onChange={(e) => handleFree100(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((oneFree) => {
                                    return <option value={oneFree.time} name={oneFree.swimmerName}>{oneFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free100[1])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free100)[1])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free100)[1]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free100?.user_lineup?.[5]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free100)[5]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free100)[5])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free100?.user_lineup?.[5]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free100.name} onChange={(e) => handleFree100(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((oneFree) => {
                                    return <option value={oneFree.time} name={oneFree.swimmerName}>{oneFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free100[2])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free100)[2])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free100)[2]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free100?.user_lineup?.[6]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free100)[6]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free100)[6])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free100?.user_lineup?.[6]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free100.name} onChange={(e) => handleFree100(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[5].map((oneFree) => {
                                    return <option value={oneFree.time} name={oneFree.swimmerName}>{oneFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free100[3])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free100)[3])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free100)[3]}</td>
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
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(free100)[4])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free100)[5])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free100)[6]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(free100)[1])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free100)[2])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free100)[3]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">500 Free</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free500?.user_lineup?.[4]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free500)[4]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free500)[4])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free500?.user_lineup?.[4]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free500.name} onChange={(e) => handleFree500(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[6].map((fiveFree) => {
                                    return <option value={fiveFree.time} name={fiveFree.swimmerName}>{fiveFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free500[1])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free500)[1])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free500)[1]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free500?.user_lineup?.[5]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free500)[5]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free500)[5])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free500?.user_lineup?.[5]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free500.name} onChange={(e) => handleFree500(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[6].map((fiveFree) => {
                                    return <option value={fiveFree.time} name={fiveFree.swimmerName}>{fiveFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free500[2])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free500)[2])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free500)[2]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.free500?.user_lineup?.[6]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free500)[6]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free500)[6])}</td>
                        <td className="table-cell">{formatTime(userTeam?.free500?.user_lineup?.[6]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={free500.name} onChange={(e) => handleFree500(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[6].map((fiveFree) => {
                                    return <option value={fiveFree.time} name={fiveFree.swimmerName}>{fiveFree.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(free500[3])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(free500)[3])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(free500)[3]}</td>
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
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(free500)[4])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free500)[5])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free500)[6]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(free500)[1])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free500)[2])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(free500)[3]))}</td>
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
                        <td className="table-cell">{sortAndPlaceIndividuals(twoFreeRelayTimes)[1]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(twoFreeRelayTimes)[1])}</td>
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
                        <td className="table-cell">{sortAndPlaceIndividuals(twoFreeRelayTimes)[2]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(twoFreeRelayTimes)[2])}</td>
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
                        <td className="table-cell">{sortAndPlaceIndividuals(twoFreeRelayTimes)[3]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(twoFreeRelayTimes)[3])}</td>
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
                        <td className="table-cell">+{parseInt(scoreRelays(sortAndPlaceIndividuals(twoFreeRelayTimes)[1])) + 
                                                    parseInt(scoreRelays(sortAndPlaceIndividuals(twoFreeRelayTimes)[2])) + 
                                                    parseInt(scoreRelays(sortAndPlaceIndividuals(twoFreeRelayTimes)[3]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">100 Back</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.back100?.user_lineup?.[4]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(back100)[4]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(back100)[4])}</td>
                        <td className="table-cell">{formatTime(userTeam?.back100?.user_lineup?.[4]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={back100.name} onChange={(e) => handleBack100(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[7].map((oneBack) => {
                                    return <option value={oneBack.time} name={oneBack.swimmerName}>{oneBack.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(back100[1])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(back100)[1])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(back100)[1]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                    <td className="table-cell">{userTeam?.back100?.user_lineup?.[5]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(back100)[5]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(back100)[5])}</td>
                        <td className="table-cell">{formatTime(userTeam?.back100?.user_lineup?.[5]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={back100.name} onChange={(e) => handleBack100(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[7].map((oneBack) => {
                                    return <option value={oneBack.time} name={oneBack.swimmerName}>{oneBack.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(back100[2])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(back100)[2])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(back100)[2]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.back100?.user_lineup?.[6]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(back100)[6]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(back100)[6])}</td>
                        <td className="table-cell">{formatTime(userTeam?.back100?.user_lineup?.[6]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={breast100.name} onChange={(e) => handleBack100(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[7].map((oneBack) => {
                                    return <option value={oneBack.time} name={oneBack.swimmerName}>{oneBack.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(back100[3])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(back100)[3])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(back100)[3]}</td>
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
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(back100)[4])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(back100)[5])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(back100)[6]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(back100)[1])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(back100)[2])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(back100)[3]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell">Add Score</td>
                        <td className="table-cell">Add Score</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell" rowSpan="6">100 Breast</td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.breast100?.user_lineup?.[4]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(breast100)[4]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(breast100)[4])}</td>
                        <td className="table-cell">{formatTime(userTeam?.breast100?.user_lineup?.[4]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={breast100.name} onChange={(e) => handleBreast100(1, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[8].map((oneBreast) => {
                                    return <option value={oneBreast.time} name={oneBreast.swimmerName}>{oneBreast.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(breast100[1])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(breast100)[1])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(breast100)[1]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                        <td className="table-cell">{userTeam?.breast100?.user_lineup?.[5]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(breast100)[5]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(breast100)[5])}</td>
                        <td className="table-cell">{formatTime(userTeam?.breast100?.user_lineup?.[5]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={breast100.name} onChange={(e) => handleBreast100(2, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[8].map((oneBreast) => {
                                    return <option value={oneBreast.time} name={oneBreast.swimmerName}>{oneBreast.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(breast100[2])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(breast100)[2])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(breast100)[2]}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                    </tr>

                    <tr className="table-row">
                    <td className="table-cell">{userTeam?.breast100?.user_lineup?.[6]?.swimmerName ?? "Waiting..."}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(breast100)[6]}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(breast100)[6])}</td>
                        <td className="table-cell">{formatTime(userTeam?.breast100?.user_lineup?.[6]?.time) ?? "Waiting..."}</td>
                        <td className="table-cell">
                        <select className="opposing-swimmer-dropdown" value={breast100.name} onChange={(e) => handleBreast100(3, e.target.value, e.target.name)}>
                                <option value="">Pick a swimmer</option>
                                {timeMap[8].map((oneBreast) => {
                                    return <option value={oneBreast.time} name={oneBreast.swimmerName}>{oneBreast.swimmerName}</option>
                                })}
                            </select>
                        </td>
                        <td className="table-cell">{formatTime(breast100[3])}</td>
                        <td className="table-cell">{scoreIndividuals(sortAndPlaceIndividuals(breast100)[3])}</td>
                        <td className="table-cell">{sortAndPlaceIndividuals(breast100)[3]}</td>
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
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(breast100)[4])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(breast100)[5])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(breast100)[6]))}</td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell"></td>
                        <td className="table-cell">+{parseInt(scoreIndividuals(sortAndPlaceIndividuals(breast100)[1])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(breast100)[2])) + 
                                                    parseInt(scoreIndividuals(sortAndPlaceIndividuals(breast100)[3]))}</td>
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
                        <td className="table-cell">{sortAndPlaceIndividuals(fourFreeRelayTimes)[1]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(fourFreeRelayTimes)[1])}</td>
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
                        <td className="table-cell">{sortAndPlaceIndividuals(fourFreeRelayTimes)[2]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(fourFreeRelayTimes)[2])}</td>
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
                        <td className="table-cell">{sortAndPlaceIndividuals(fourFreeRelayTimes)[3]}</td>
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
                        <td className="table-cell">{scoreRelays(sortAndPlaceIndividuals(fourFreeRelayTimes)[3])}</td>
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
                        <td className="table-cell">+{parseInt(scoreRelays(sortAndPlaceIndividuals(fourFreeRelayTimes)[1])) +
                                                    parseInt(scoreRelays(sortAndPlaceIndividuals(fourFreeRelayTimes)[2])) + 
                                                    parseInt(scoreRelays(sortAndPlaceIndividuals(fourFreeRelayTimes)[3]))}</td>
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