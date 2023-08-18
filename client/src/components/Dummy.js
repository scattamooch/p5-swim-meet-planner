
// 56 - 136

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
                // filter out the deleted swimmer in state
                setUserSwimmers((prevSwimmers) =>
                    prevSwimmers.filter((swimmer) => swimmer.swimmerId !== swimmerId)
                );
                console.log("Ohhhh that swimmer gone")
            } else {
                console.log("Error deleting row");
            }
        } catch (error) {
            console.error("Error deleting row: ", error);
        }
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
                    console.log("Swimmer updated successfully")
                    // fieldName === "name"
                    // ? setUserSwimmers(prevdata => ({
                    //     ...prevdata,
                    // name: 

                    // }))
                } else {
                    console.log(`Patch request for ${fieldName} failed`);
                }
            }
        } catch (error) {
            console.error("Error patching data:", error);
        }

        // Clear cell changes after successful patching
        setCellChanged(false);
        setCellChanges([]);
    }
}