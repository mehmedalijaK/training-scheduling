import {API_SIGN_UP_USER, API_SIGN_IN_USER, API_GET_MYSELF_USER} from "@/api/constants";


export const sendLoginRequest = async (username: string, password: string) => {
    return (await fetch(API_SIGN_IN_USER, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    }));
};