import { IEditGym } from "@/model/IEditGym";
import { SCHEDULER_ADD_GYM, SCHEDULER_ADD_TRAINING_GYM, SCHEDULER_DELETE_MY_RESERVATION, SCHEDULER_DELETE_MY_RESERVATION_MANAGER, SCHEDULER_EDIT_GYM_BY_GYM_ID, SCHEDULER_FILTER_BY_DAY, SCHEDULER_FILTER_BY_TYPE, SCHEDULER_FIND_ALL_FREE_APPOINTMENTS, SCHEDULER_FIND_ALL_SPORTS, SCHEDULER_FIND_GYM_BY_MANAGER_ID, SCHEDULER_FIND_MY_RESERVATIONS, SCHEDULER_FIND_MY_RESERVATIONS_MANAGER, SCHEDULER_RESERVE, SCHEDULER_RESERVE_WITH_SPORT } from "../constants";

export const schedulerAddGym = (token: string, name: string, shortDescription: string, trainingDuration: number,
    numberOfCoaches: number, manager_id: number) =>
    fetch(SCHEDULER_ADD_GYM, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify({name, shortDescription, trainingDuration, numberOfCoaches, manager_id})
});

export const addTrainingToGym = (token: string, sportName: string, individual: boolean, gymName: string, shortDescription: string,
    trainingDuration: number, price: number) =>
    fetch(SCHEDULER_ADD_TRAINING_GYM, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify({name, shortDescription, trainingDuration, sportName, individual, gymName, price})
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

export const reserve = (token: string, payload: any) =>
    fetch(SCHEDULER_RESERVE, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify(payload)
});

export const findMyReservations = (token: string, id: number) =>
    fetch(SCHEDULER_FIND_MY_RESERVATIONS+"/"+id, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const findMyReservationsManager = (token: string, id: number) =>
    fetch(SCHEDULER_FIND_MY_RESERVATIONS_MANAGER+"/"+id, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const cancelMyReservation = (token: string, id: number, idUser: number) =>
    fetch(SCHEDULER_DELETE_MY_RESERVATION+"/"+id, {
        method: 'DELETE',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify({id: idUser})
});

export const filterByDay = (token: string, day: string) =>
    fetch(SCHEDULER_FILTER_BY_DAY+"/"+day, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
});

export const filterByType = (token: string, type: string, userId: string) =>
    fetch(SCHEDULER_FILTER_BY_TYPE+"/"+type, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify(userId)
});

export const cancelMyReservationManager = (token: string, id: number, idUser: number) =>
    fetch(SCHEDULER_DELETE_MY_RESERVATION_MANAGER+"/"+id, {
        method: 'DELETE',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify({id: idUser})
});