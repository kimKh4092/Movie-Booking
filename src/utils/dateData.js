export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const week = ['Sunday',
    'Monday', 'Tuesday',
    'Wednesday', 'Thursday',
    'Friday', 'Saturday'];


export const getToday = () => {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const converted = {
        month: months[today.getMonth()],
        weekDay: week[today.getDay()],
        day: today.getDate()
    }
    return converted
}