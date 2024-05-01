const API_URL = process.env.REACT_APP_API_SERVER

export const NewEmployee = (FirstName, LastName, Email, Password, JobTitle, Role, SalaryHourly, HoursPerWeek) => {
    return fetch(API_URL + `/Employee/new`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ FirstName, LastName, Email, Password, JobTitle, Role, SalaryHourly, HoursPerWeek })

    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}

export const DisplayEmployees = (RowsPerPage, query, page) => {
    return fetch(API_URL + `/Employee/display/${RowsPerPage}?query=${query}&page=${page}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}

export const DisplayEmployeesFullNameandSchedule = () => {
    return fetch(API_URL + `/Employee/displayFullNameAndSchedule`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}

export const displayEmployeeForAutoComplete = (searchQuery) => {
    return fetch(API_URL + `/Employee/auto-complete?searchQuery=${searchQuery}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}