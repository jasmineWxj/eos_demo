import { report } from './errorReport';

export const request = (input: RequestInfo, init?: RequestInit | undefined) => {
    return fetch(input, init)
        .then(res=>res.json())
        .catch((error)=>{
            console.error(error);
            report({
                type: 'fetch',
                input,
                method: init?.method || 'GET',
                body: init?.body || '',
                stack: error.stack 
            })
        })
}