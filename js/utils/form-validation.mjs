export function validateEmail(email) {
    const email_regex = /^[\w\-.]+@(stud.)?noroff.no$/;
    return email_regex.test(email);
}

export function validatePassword(password) {
    return password.length >= 8;
}