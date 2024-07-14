const API_URL = process.env.REACT_APP_API_SERVER



export const PunchOutEmployee = (Content, QrCode) => {
    let requestBody;
    if (QrCode) {
        requestBody = JSON.stringify({ Content, });
    } else {
        requestBody = JSON.stringify({ image: Content });
    }
    return fetch(API_URL + `/PunchOut/new`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody
    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}
