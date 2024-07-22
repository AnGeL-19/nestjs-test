import { STATUS_TASK } from "../constants/tasks";


export interface ITask {
    name: string;
    description: string;
    status: STATUS_TASK;
    responsable: string;
}