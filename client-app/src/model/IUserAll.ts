import IRole from "./IRole";

export default interface IUserAll{
    id: number,
    username: string,
    email: string,
    dateBirth: Date,
    name: string,
    lastName: string,
    membershipCardId: string,
    scheduledTrainingCount: number,
    role: IRole
}