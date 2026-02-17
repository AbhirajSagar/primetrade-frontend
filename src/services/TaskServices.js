import { Endpoints } from "@/constants/Endpoints";

export async function GetAllTasksService()
{
    try
    {
        const requestOptions = 
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }

        const res = await fetch(Endpoints.ListTasks(), requestOptions);
        if(!res.ok)
        {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
        }

        const data = await res.json();
        return [data, undefined];
    }
    catch(error)
    {
        console.error(error);
        return [undefined, error];
    }
}

export async function GetTaskByIdService(id)
{
    try
    {
        const requestOptions =
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }

        const res = await fetch(Endpoints.GetTask(id), requestOptions);
        if(!res.ok)
        {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
        }

        const data = await res.json();
        return [data, undefined];
    }
    catch(error)
    {
        console.error(error);
        return [undefined, error];
    }
}

export async function UpdateTaskService(id, taskData)
{
    try
    {
        const requestOptions =
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(taskData)
        }

        const res = await fetch(Endpoints.UpdateTask(id), requestOptions);
        if(!res.ok)
        {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
        }

        const data = await res.json();
        return [data, undefined];
    }
    catch(error)
    {
        console.error(error);
        return [undefined, error];
    }
}

export async function DeleteTaskService(id)
{
    try
    {
        const requestOptions =
        {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }

        const res = await fetch(Endpoints.DeleteTask(id), requestOptions);
        if(!res.ok)
        {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
        }

        const data = await res.json();
        return [data, undefined];
    }
    catch(error)
    {
        console.error(error);
        return [undefined, error];
    }
}

export async function CreateTaskService(taskData)
{
    try
    {
        const requestOptions =
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(taskData)
        }

        const res = await fetch(Endpoints.CreateTask(), requestOptions);
        if(!res.ok)
        {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
        }

        const data = await res.json();
        return [data, undefined];
    }
    catch(error)
    {
        console.error(error);
        return [undefined, error];
    }
}