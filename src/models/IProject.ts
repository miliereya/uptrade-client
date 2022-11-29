export interface IProject {
    _id: string
    title: string
    image: string
    queue: string[]
    development: string[]
    done: string[]
    createdAt: Date
    updatedAt: Date
}