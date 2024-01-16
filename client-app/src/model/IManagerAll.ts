import IRole from "./IRole";

export default interface IManagerAll{
    id: number,
    username: string,
    email: string,
    dateBirth: Date,
    name: string,
    lastName: string,
    sportsHall: string,
    dateEmployment: Date,
    role: IRole
}