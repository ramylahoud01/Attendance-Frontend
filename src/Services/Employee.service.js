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