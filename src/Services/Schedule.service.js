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
