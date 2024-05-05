const API_URL = process.env.REACT_APP_API_SERVER

export const MapScheduleById = (EmployeeID) => {
    return fetch(API_URL + `/Schedule/${EmployeeID}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}

export const newSchedule = (EmployeeID, FromDate, ToDate) => {
    return fetch(API_URL + `/Schedule/new/${EmployeeID}`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ FromDate, ToDate })
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}
export const generateScheduleFromTable = (employeeId, date, period) => {
    return fetch(API_URL + `/Schedule/table/${employeeId}`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: new Date(date).toISOString(), period })
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}

export const generateMultiScheduleFromTable = (multiCheckBoxSelected, period) => {
    return fetch(API_URL + '/Schedule/table/manySchedule', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ multiCheckBoxSelected, period })
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}
export const displayAllSchedule = () => {
    return fetch(API_URL + '/Schedule/displayAll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}