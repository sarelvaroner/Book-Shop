import { API_URI } from "../const";


export async function getBooks(token, search, skip, limit) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };

        const response = await fetch(`${API_URI}/books?limit=${limit}&skip=${skip}&search=${search}`, requestOptions)
        const data = await response.json()

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                return { books: null, massage: 'cannot get books' }
            }
            const error = (data && data.message) || response.statusText;
            return new Error(error)
        }
        return { books: data, massage: 'success' };
    }
    catch (err) {
        console.log(err)
    }
}


export async function getLastBooks(token) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };

        const response = await fetch(`${API_URI}/users/lastbook`, requestOptions)
        const data = await response.json()

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                return { books: null, massage: 'cannot get books' }
            }
            const error = (data && data.message) || response.statusText;
            return new Error(error)
        }
        return data;
    }
    catch (err) {
        console.log(err)
    }
}


export async function editBook(token, id, name, price, author, publisher) {
    try {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ name, price, author, publisher })
        };

        const response = await fetch(`${API_URI}/books/${id}`, requestOptions)
        const data = await response.json()

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                return { book: null, massage: 'cannot save changes plead try later' }
            }
            const error = (data && data.message) || response.statusText;
            return new Error(error)
        }
        return { book: data, massage: 'success' };
    }
    catch (err) {
        console.log(err)
    }
}


export async function createBook(token, name, price, author, publisher) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ name, price, author, publisher })
        };

        const response = await fetch(`${API_URI}/books`, requestOptions)
        const data = await response.json()

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                return { book: null, massage: 'cannot save plead try later' }
            }
            const error = (data && data.message) || response.statusText;
            return new Error(error)
        }
        return { book: data, massage: 'success' };
    }
    catch (err) {
        console.log(err)
    }
}

export async function deleteBook(token, id) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        };

        const response = await fetch(`${API_URI}/books/${id}`, requestOptions)
        const data = await response.json()

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                return { book: null, massage: 'cannot save plead try later' }
            }
            const error = (data && data.message) || response.statusText;
            return new Error(error)
        }
        return { book: data, massage: 'success' };
    }
    catch (err) {
        console.log(err)
    }
}


export async function buyBook(token, id) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };

        const response = await fetch(`${API_URI}/users/newbook/${id}`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                return { book: null, massage: 'cannot save plead try later' }
            }
            const error = (data && data.message) || response.statusText;
            return new Error(error)
        }
        return { book: data, massage: 'success' };
    }
    catch (err) {
        console.log(err)
    }
}