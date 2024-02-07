// import { getFromLocalStorage } from "./utils/local-storage.js";

export async function fetcher(url, options = { method: "GET" }, useToken = false) {
    options = {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        },
    }

    try {
        if (useToken) {
            const token = localStorage.getItem('accessToken');
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${token}`,
                },
            }
        }
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error with API call', error);
    }
}






// export async function fetcher(url, options) {
//     try {
//         const token = getFromLocalStorage('token');
//         const options_with_auth = {
//             ...options,
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//     }

//     const response = await fetch(url, options_with_auth);
//     const data = await response.json();
//     return data;
//     } catch (error) {
//         console.error('Error with API call', error);
//     }
// }