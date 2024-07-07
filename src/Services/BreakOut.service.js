const API_URL = process.env.REACT_APP_API_SERVER



export const BreakOutEmployee = (Content, QrCode) => {
    let requestBody;
    if (QrCode) {
        requestBody = JSON.stringify({ Content });
    } else {
        requestBody = JSON.stringify({ image: Content });
    }
    return fetch(API_URL + `/BreakOut/new`, {
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
