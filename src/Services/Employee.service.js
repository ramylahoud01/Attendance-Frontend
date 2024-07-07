const API_URL = process.env.REACT_APP_API_SERVER

export const NewEmployee = (FirstName, LastName, Email, Password, JobTitle, Role, SalaryHourly, HoursPerWeek, file) => {
    const formData = new FormData();
    formData.append('FirstName', FirstName);
    formData.append('LastName', LastName);
    formData.append('Email', Email);
    formData.append('Password', Password);
    formData.append('JobTitle', JobTitle);
    formData.append('Role', Role);
    formData.append('SalaryHourly', SalaryHourly);
    formData.append('HoursPerWeek', HoursPerWeek);
    formData.append('file', file);

    return fetch(API_URL + `/Employee/new`, {
        method: 'POST',
        body: formData
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
};


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

export const recognizeFace = (imageData) => {
    console.log('imageData', imageData)
    return fetch(API_URL + '/Employee/recognize-face', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}

export const BulkInsertEmployee = (FormData) => {
    return fetch(API_URL + "/Employee/import-csv", {
        method: "POST",
        body: FormData,
    }).catch((error) => {
        console.error("Error occurred:", error.message);
        throw error;
    });
};