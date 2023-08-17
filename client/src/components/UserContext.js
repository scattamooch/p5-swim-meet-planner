import {createContext, useState, useContext, useEffect} from "react";
import Login from "./Login";

export const UserContext = createContext();

export function UserProvider({children}) {

    const [userId, setUserId] = useState(null);

    useEffect(async () => {
        try {
            const response = await fetch(`/whodat`)
            if (response.ok) {
                const data = await response.json()
                setUserId(data.id)
                console.log(data)
                }
            else {
                console.log("Who dat? Dat's nobody")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }, []);

    function login(data) {
        console.log(`${data.first_name} is in the building.`)
        setUserId(data.id);
    };

    async function logout() {
        await fetch("/logout", {
            method: "DELETE",
        })
        console.log("User has left the building :(")
        setUserId(null);
    };

    

    return (
        
        <UserContext.Provider value={{userId, login, logout}}>
            {children}
        </UserContext.Provider>
    )
};

export function useUser() {
    return useContext(UserContext)
}