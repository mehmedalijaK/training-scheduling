import {API_SIGN_UP_USER, API_SIGN_IN_USER, API_GET_MYSELF_USER, API_SING_IN_MANAGER, API_GET_MYSELF_MANAGER, API_SING_IN_ADMIN, API_GET_MYSELF_ADMIN, API_SIGN_UP_MANAGER, API_EDIT_USER} from "@/api/constants";


export const sendLoginRequestUser = async (username: string, password: string) => {
    return (await fetch(API_SIGN_IN_USER, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    }));
};

export const sendRegisterRequestUser = async (username: string, password: string,
    email: string, dateBirth: Date, name: string, lastName: string) => {
    return (await fetch(API_SIGN_UP_USER, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, email, dateBirth, name, lastName}),
    }));
};

export const sendLoginRequestManager = async (username: string, password: string) => {
    return (await fetch(API_SING_IN_MANAGER, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    }));
};

export const sendRegisterRequestManager = async (username: string, password: string,
    email: string, dateBirth: Date, name: string, lastName: string, sportsHall: string, dateEmployment: Date) => {
    return (await fetch(API_SIGN_UP_MANAGER, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, email, dateBirth, name, lastName, sportsHall, dateEmployment}),
    }));
};

export const sendLoginRequestAdmin = async (username: string, password: string) => {
    return (await fetch(API_SING_IN_ADMIN, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    }));
};

export const sendEditUserRequest = async (email: string, dateBirth: Date, name: string, lastName: string, token: string) => {
    return (await fetch(API_EDIT_USER, {
        method: 'PUT',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify({email, dateBirth, name, lastName}),
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

export const sendGetMyselfAdmin = (token: string) =>
    fetch(API_GET_MYSELF_ADMIN, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});