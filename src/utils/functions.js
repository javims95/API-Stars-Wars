export const randomNumber = (start, end) => {
    return Math.floor(Math.random() * end) + start
}

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}