import { NOTIFICATIONS_GET_ALL_FILTERED, NOTIFICATIONS_GET_ALL_TYPES, NOTIFICATIONS_GET_ALL_TYPES_ADD, NOTIFICATIONS_GET_ME, NOTIFICATIONS_GET_ME_FILTERED } from "../constants";

export const sendGetMyNotifications = (token: string, page: number, size: number) =>
    fetch(NOTIFICATIONS_GET_ME+"?page="+page+"&size="+size, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const sendGetMyNotificationsFiltered = (token: string, page: number, size: number, payload: any) =>
    fetch(NOTIFICATIONS_GET_ME_FILTERED+"?page="+page+"&size="+size, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify(payload)
});

export const sendGetAllNotifications = (token: string, page: number, size: number, payload: any) =>
    fetch(NOTIFICATIONS_GET_ALL_FILTERED+"?page="+page+"&size="+size, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify(payload)
});

export const sendGetAllNotificationTypes = (token: string, page: number, size: number) =>
    fetch(NOTIFICATIONS_GET_ALL_TYPES+"?page="+page+"&size="+size, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const sendGetAllNotificationTypesAdd = (token: string, payload: any) =>
    fetch(NOTIFICATIONS_GET_ALL_TYPES_ADD, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify(payload)
});