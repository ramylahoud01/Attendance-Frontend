const API_URL = process.env.REACT_APP_API_SERVER

export const PunchOutEmployee = (Content) => {
    console.log(Content)
    return fetch(API_URL + `/PunchOut/new`, {
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