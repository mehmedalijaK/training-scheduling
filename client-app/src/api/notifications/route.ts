import { NOTIFICATIONS_GET_ME } from "../constants";

export const sendGetMyNotifications = (token: string) =>
    fetch(NOTIFICATIONS_GET_ME, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});