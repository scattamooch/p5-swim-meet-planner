import {createContext, useState, useContext, useEffect} from "react";

export const UserContext = createContext();

export function UserProvider({children}) {

    const [userId, setUserId] = useState(null);
    const [userTeamId, setUserTeamId] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        async function checkUser() {
            try {
                const response = await fetch("/whodat");
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setUserId(data.id);
                    setUserTeamId(data.team_id);
                    setUserName(data.first_name);
                } else {
                    console.log("Error: ", response)
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        
        checkUser();
    
    }, []);

    function login(data) {
        // console.log(`${data.first_name} is in the building.`)
        setUserId(data.id);
        setUserTeamId(data.team_id);
    };

    async function logout() {
        await fetch("/logout", {
            method: "DELETE",
        })
        // console.log("User has left the building :(")
        setUserId(null);
        setUserTeamId(null);
    };

    

    return (

        <UserContext.Provider value={{userId, userTeamId, userName,login, logout}}>
            {children}
        </UserContext.Provider>
    )
};

export function useUser() {
    return useContext(UserContext)
}