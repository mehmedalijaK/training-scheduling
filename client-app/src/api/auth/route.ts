import {API_SIGN_UP_USER, API_SIGN_IN_USER, API_GET_MYSELF_USER, API_SING_IN_MANAGER, API_GET_MYSELF_MANAGER} from "@/api/constants";


export const sendLoginRequestUser = async (username: string, password: string) => {
    return (await fetch(API_SIGN_IN_USER, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    }));
};

export const sendLoginRequestManager = async (username: string, password: string) => {
    return (await fetch(API_SING_IN_MANAGER, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    }));
};

export const sendGetMyselfUser = (token: string) =>
    fetch(API_GET_MYSELF_USER, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const sendGetMyselfManager = (token: string) =>
    fetch(API_GET_MYSELF_MANAGER, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});