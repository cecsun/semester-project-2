import { getFromLocalStorage } from "./local-storage.mjs";

export function validateEmail(email) {
    const email_regex = /^[\w\-.]+@(stud.)?noroff.no$/;
    return email_regex.test(email);
}

export function validatePassword(password) {
    return password.length >= 8;
}


export function validateBid(bid) {
    if (bid < 0) {
        return false;
    }
    const number_regex = /^\d*$/;
    return number_regex.test(bid);
}