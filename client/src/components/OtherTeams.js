import React, {useState, useEffect} from "react";
import "../styling/OtherTeams.css"

function OtherTeams() {

    const [teamSwimmers, setTeamSwimmers] = useState([])
    const [teamView, setTeamView] = useState() 
    const [teamName, setTeamName] = useState()
    const [allTeams, setAllTeams] = useState()

    
    async function getSwimmers(teamView) {
        try {
            const response = await fetch(`http://127.0.0.1:5555/teams/${teamView}`);
            if (response.ok) {
                const data = await response.json();
                setTeamName(data.name)
                setTeamSwimmers(data.swimmer)
                // console.log(data);
            } else {
                // console.log("Hit the else block")
            }
        } catch (error) {
            console.log("Caught the error: ", error)
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
    let rowNum = 1;
    if (teamSwimmers.length > 0) {
        const swimmerInfo = teamSwimmers.map((swimmer) => ({
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
                        <td className="table-cell" id={swimmer.swimmerId}>
                            {swimmer.name}
                        </td>
                    {swimmer.times.map((time, timeIndex) => (
                            <td key={timeIndex} className="table-cell" id={time.timeId}>
                                {time.time}
                            </td>
                        )
                    )}
                </tr>
            ));
        }
    }

    return (
        <div>
            <div className="container-name">
            <h1 className="opps-headers">Team Tables</h1>
                <select className="team-view-select" onChange={(e) => getSwimmers(e.target.value)}>
                    <option value="">Pick a team</option>
                    {allTeams && allTeams.map((team) => {
                        return <option value={team.id} name={team.name}>{team.name}</option>
                    })}
                </select>
            </div>
            <table className="opps-tables">
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
                </tbody>
            </table>
        </div>
    )
}

export default OtherTeams;