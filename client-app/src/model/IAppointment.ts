import ISport from "./ISport"

export default interface IAppointment{
    id: number,
    name: string,
    numberOfCoaches: number,
    scheduledTime: Date,
    shortDescription: string,
    trainingDuration: number
    sport: ISport
}