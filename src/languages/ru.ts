import { ILanguage } from "../models/global/ILanguage";

export const ru: ILanguage = {
    mark: 'ru',

    header: {
        sign: 'регистрация',
        logout: 'выйти',
    },
    authPopup: {
        sign_to_continue: 'Чтобы продолжить, авторизуйтесь',
        email: 'email',
        enter_email: 'Введите email',
        password: 'пароль',
        enter_password: 'Введите пароль',
        auth: 'авторизация',
        login: 'логин',
        sign_up: 'регистрация'
    },
    addProjectPopup: {
        create_new_project: 'Создать новый проект',
        title: 'название',
        enter_title: 'Введите название',
        add_background: 'Добавить фон',
        create: 'создать',
    },
    projectItem: {
        title: 'название',
        background: 'фон',
        apply: 'ок',
        cancel: 'отмена'
    },
    projectPage: {
        created: 'проект создан',
        last_updated: 'изменено',
        add_task: 'доб. задачу'
    },
    addTaskPopup: {
        create_task: 'Создать задачу',
        add_task: 'Добавить',
        title: 'Название',
        enter_title: 'Введите название',
        description: 'Описание',
        enter_description: 'Введите описание'
    },
    queue: 'Не активно',
    development: 'В процессе',
    done: 'Завершено',
    status: 'Статус',
    description: 'описание',
    priority: 'приоритет',
    of: 'из',
    title: 'Название',
    enter_title: 'Введите название',
    search: 'Поиск',
    search_by: 'искать по',

    taskPopup: {
        created: 'создано',
        total_subtasks: 'всего подзадач',
        development_time: 'Активное время',
        hour: 'ч',
        min: 'м',
        done: 'зав'
    },

    editTask: {
        set_status: 'Выбрать статус',
        set_priority: 'Установить приоритет',
        add: '+',
        delete: '-',
        update_task: 'Обновить задачу'
    },

    column: {
        sort_by: 'Сорт.',
        order_by: 'Пор.'
    }

    
}