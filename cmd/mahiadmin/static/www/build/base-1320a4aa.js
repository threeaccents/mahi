const DEFAULT_ERR_MSG = 'Oops! Something went wrong. Please refresh and try again';
// export const post = (url: string, data: any): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", url, true);
//         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//         xhr.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
//         xhr.onload = () => {
//             if (xhr.readyState === 4) {
//                 const resp = JSON.parse(xhr.response)
//                 if (resp.error) {
//                     return reject(resp)
//                 }
//                 resolve(resp)
//             }
//         };
//         xhr.onerror = () => {
//             reject(xhr.statusText)
//         };
//         xhr.send(JSON.stringify(data))
//     })
// }
const post = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(payload => {
            if (payload.error)
                return reject(payload);
            resolve(payload);
        })
            .catch(err => {
            reject(err);
        });
    });
};
const postFile = (url, file) => {
    let data = new FormData();
    data.append('file', file);
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
            body: data
        })
            .then(resp => resp.json())
            .then(payload => {
            if (payload.error) {
                return reject(payload);
            }
            return resolve(payload);
        });
    });
};
const put = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(payload => {
            if (payload.error)
                return reject(payload);
            resolve(payload);
        })
            .catch(err => {
            reject(err);
        });
    });
};
const patch = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(payload => {
            if (payload.error)
                return reject(payload);
            resolve(payload);
        })
            .catch(err => {
            reject(err);
        });
    });
};
const get = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
        })
            .then(resp => resp.json())
            .then(payload => {
            if (payload.error)
                return reject(payload);
            resolve(payload);
        })
            .catch(err => {
            reject(err);
        });
    });
};
const del = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
        })
            .then(resp => resp.json())
            .then(payload => {
            if (payload.error)
                return reject(payload);
            resolve(payload);
        })
            .catch(err => {
            reject(err);
        });
    });
};

export { DEFAULT_ERR_MSG as D, patch as a, put as b, del as d, get as g, post as p };
