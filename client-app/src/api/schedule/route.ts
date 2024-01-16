import { IEditGym } from "@/model/IEditGym";
import { SCHEDULER_ADD_GYM, SCHEDULER_EDIT_GYM_BY_GYM_ID, SCHEDULER_FIND_GYM_BY_MANAGER_ID } from "../constants";

export const schedulerAddGym = (token: string, name: string, shortDescription: string, trainingDuration: number,
    numberOfCoaches: number, manager_id: number) =>
    fetch(SCHEDULER_ADD_GYM, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify({name, shortDescription, trainingDuration, numberOfCoaches, manager_id})
});

export const findGymByManagerId = (token: string, managerId: number) =>
    fetch(SCHEDULER_FIND_GYM_BY_MANAGER_ID+"/"+managerId, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const editGymByGymId = (token: string, gymId: number, payload: IEditGym) =>
    fetch(SCHEDULER_EDIT_GYM_BY_GYM_ID+"/"+gymId, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify(payload)
});