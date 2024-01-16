export interface IAppointmentDto{
    id: number,
    scheduledTime: Date,
    sportName: string,
    individual: boolean,
    gymName: string,
    shortDescription: string,
    trainingDuration: number,
    price: number,
    clientId: number
}