//IL = Interface Language
export type TLanguage = 'ru' | 'en'

export interface ILanguage {
    mark: string

    header: {
        sign: string
        logout: string
    }
    authPopup: {
        sign_to_continue: string
        enter_email: string
        email: string
        enter_password: string
        password: string
        auth: string
        login: string
        sign_up: string
    }
    addProjectPopup: {
        create_new_project: string
        title: string
        enter_title: string
        add_background: string
        create: string
    }

    projectItem: {
        title: string
        background: string
        apply: string
        cancel: string
    }

    projectPage: {
        created: string
        last_updated: string
        add_task: string
    }

    addTaskPopup: {
        create_task: string
        add_task: string
        title: string
        enter_title: string
        description: string
        enter_description: string
    }

    queue: string
    development: string
    done: string
    status: string
    description: string
    priority: string
    of: string
    title: string
    enter_title: string
    search: string
    search_by: string

    taskPopup: {
        created: string
        total_subtasks: string
        development_time: string
        hour: string
        min: string
        done: string
    }

    editTask: {
        set_status: string
        set_priority: string
        add: string
        delete: string
        update_task: string
    }

    column: {
        sort_by: string
        order_by: string
    }

    comments: {
        comments: string
        add_comment: string
        enter_your_comment: string
        by: string
        send: string
        more: string
        reply: string
        cancel: string
        delete: string
        hide: string
    }
}