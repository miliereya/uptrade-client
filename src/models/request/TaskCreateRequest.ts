export interface TaskCreateRequest {
    projectId: string
    task: {
        title: string
        description: string
    }
}