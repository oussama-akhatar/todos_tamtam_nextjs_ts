export interface ITask {
    id?: number,
    text: string
    is_done: boolean
    is_deleted?: boolean,
    created_at?: Date
}