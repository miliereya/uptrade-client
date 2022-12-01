export interface IComment {
    _id: string
    email: string
    text: string
    children: string[]
    createdAt: Date
}