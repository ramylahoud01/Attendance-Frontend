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
export const displayAllSchedule = (query) => {
    return fetch(API_URL + `/Schedule/displayAll?query=${query}`, {
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

export const displayScheduleforReports = (EmployeeID, Role, SelectedDate) => {
    return fetch(API_URL + `/Schedule/reports`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EmployeeID, Role, SelectedDate })
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}
export const displaySummaryScheduleforReports = (SelectedDate, EmployeeID, punchStatus) => {
    console.log('EmployeeID', EmployeeID)
    return fetch(API_URL + `/Schedule/display/summaryReport?SelectedDate=${SelectedDate}&EmployeeID=${EmployeeID}&punchStatus=${punchStatus}`, {
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
