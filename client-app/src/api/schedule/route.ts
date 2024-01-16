import { SCHEDULER_ADD_GYM } from "../constants";

export const schedulerAddGym = (token: string, name: string, shortDescription: string, trainingDuration: number,
    numberOfCoaches: number, manager_id: number) =>
    fetch(SCHEDULER_ADD_GYM, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify({name, shortDescription, trainingDuration, numberOfCoaches, manager_id})
});