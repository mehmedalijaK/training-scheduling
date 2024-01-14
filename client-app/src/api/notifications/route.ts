import { NOTIFICATIONS_GET_ME, NOTIFICATIONS_GET_ME_FILTERED } from "../constants";

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