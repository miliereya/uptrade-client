import { AddTaskPopup } from "../components/AddTaskPopup";
import { ILanguage } from "../models/global/ILanguage";

export const en: ILanguage = {
    mark: 'en',
    header: {
        sign: 'sign',
        logout: 'logout'
    },
    authPopup: {
        sign_to_continue: 'Sign to continue',
        email: 'email',
        enter_email: 'Enter email',
        password: 'password',
        enter_password: 'Enter password',
        auth: 'authorization',
        login: 'sign in',
        sign_up: 'sign up'
    },
    addProjectPopup: {
        create_new_project: 'create new project',
        title: 'title',
        enter_title: 'Enter title',
        add_background: 'add background',
        create: 'create',
    },
    projectItem: {
        title: 'title',
        background: 'background',
        apply: 'apply',
        cancel: 'cancel'
    },
    projectPage: {
        created: 'created',
        last_updated: 'last updated',
        add_task: 'add task'
    },

    addTaskPopup: {
        create_task: 'create task',
        add_task: 'add task',
        title: 'title',
        enter_title: 'enter title',
        description: 'description',
        enter_description: 'enter description'
    },

    queue: 'queue',
    development: 'development',
    done: 'done',
    status: 'status',
    description: 'description',
    priority: 'priority',
    of: 'of',
    title: 'title',
    enter_title: 'Enter title',
    search: 'Search',
    search_by: 'search by',

    taskPopup: {
        created: 'created',
        total_subtasks: 'total subtasks',
        development_time: 'development time',
        hour: 'h',
        min: 'm',
        done: 'done'
    },
    editTask: {
        set_status: 'set status',
        set_priority: 'set priority',
        add: '+',
        delete: '-',
        update_task: 'Update Task'
    },

    column: {
        sort_by: 'Sort',
        order_by: 'Order'
    },
    comments: {
        comments: 'Comments',
        add_comment: 'Add comment',
        enter_your_comment: 'Enter your comment...',
        by: 'By',
        more: 'more',
        reply: 'reply',
        cancel: 'cancel',
        send: 'send',
        delete: 'delete',
        hide: 'hide'
    }
}