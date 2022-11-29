export interface UpdateColumnsRequest {
    id: string
    columns: {
        queue: string[]
        development: string[]
        done: string[]
    }
}