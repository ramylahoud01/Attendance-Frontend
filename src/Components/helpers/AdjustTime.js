export function adjustDateForTimezone(val) {
    const date = new Date(val);
    const offsetInMinutes = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offsetInMinutes * 60000));
    return adjustedDate;
}