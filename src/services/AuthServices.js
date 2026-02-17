import { Endpoints } from "@/constants/Endpoints";

export async function LoginService(email, password)
{
    try
    {
        if(!email) throw new Error('Missing Email Id');
        if(!password) throw new Error('Missing Password');
        if(password.length < 6) throw new Error('Password too short');

        const requestOption = 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        }

        const res = await fetch(Endpoints.Login(), requestOption);
        if(!res.ok)
        {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
        }

        const data = await res.json();
        console.log(data);
        return [data, undefined];
    }
    catch(error)
    {
        console.error(error);
        return [undefined, error];
    }
}

export async function RegisterService(name,email, password, role)
{
    try
    {
        if(!name) throw new Error('Missing Name');
        if(!email) throw new Error('Missing Email Id');
        if(!password) throw new Error('Missing Password');
        if(!role) throw new Error('Missing Role');
        if(role !== 'admin' && role !== 'user') throw new Error('Invalid Role');

        const requestOption =
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, email, password, role }),
            credentials: 'include'
        }

        const res = await fetch(Endpoints.Register(), requestOption);
        
        if(!res.ok)
        {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
        }

        const data = await res.json(); 
        console.log(data);
        return [data, undefined];
    }
    catch(error)
    {
        console.error(error);
        return [undefined, error];
    }
}