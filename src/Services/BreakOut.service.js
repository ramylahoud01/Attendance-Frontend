const API_URL = process.env.REACT_APP_API_SERVER

export const BreakOutEmployee = (Content) => {
    return fetch(API_URL + `/BreakOut/new`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Content })
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}