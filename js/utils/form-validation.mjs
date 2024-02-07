export function validateEmail(email) {
    const email_regex = /^[\w\-.]+@(stud.)?noroff.no$/;
    return email_regex.test(email);
}

export function validatePassword(password) {
    if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return false;
    }
}