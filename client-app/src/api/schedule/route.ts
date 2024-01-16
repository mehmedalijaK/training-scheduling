import { IEditGym } from "@/model/IEditGym";
import { SCHEDULER_ADD_GYM, SCHEDULER_EDIT_GYM_BY_GYM_ID, SCHEDULER_FIND_ALL_FREE_APPOINTMENTS, SCHEDULER_FIND_ALL_SPORTS, SCHEDULER_FIND_GYM_BY_MANAGER_ID, SCHEDULER_RESERVE_WITH_SPORT } from "../constants";

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

export const findAllFreeAppointments = (token: string) =>
    fetch(SCHEDULER_FIND_ALL_FREE_APPOINTMENTS, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const findAllSports = (token: string) =>
    fetch(SCHEDULER_FIND_ALL_SPORTS, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const reserveWithSport = (token: string, payload: any) =>
    fetch(SCHEDULER_RESERVE_WITH_SPORT, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify(payload)
});