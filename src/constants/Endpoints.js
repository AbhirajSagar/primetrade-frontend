const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const VERSION = 'v1/'

const BuildEndpoint = (path, idRequired = false) =>
{
    if (!BASE_URL) throw new Error('Base URL not found')
    return (id) =>
    {
        if (idRequired && !id) throw new Error('ID is required')
        return BASE_URL + VERSION + path + (id ? `/${id}` : '')
    }
}

export const Endpoints = 
{
    Login: BuildEndpoint('auth/login'),
    Register: BuildEndpoint('auth/register'),

    ListTasks: BuildEndpoint('tasks'),
    GetTask: BuildEndpoint('tasks', true),
    CreateTask: BuildEndpoint('tasks/create'),
    UpdateTask: BuildEndpoint('tasks', true),
    DeleteTask: BuildEndpoint('tasks', true)
}
