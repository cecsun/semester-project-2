export function addToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

export function logout() {
    localStorage.removeItem('accessToken');
    window.location.href = '/index.html';
}