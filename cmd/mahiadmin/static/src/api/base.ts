export interface ApiResponse {
  data: any
}

export interface ApiError {
  error: string;
  httpCode: number;
  requestId: string;
  type: string;
}

export interface SuccessResponse {
  data: string;
}

export const DEFAULT_ERR_MSG = 'Oops! Something went wrong. Please refresh and try again';

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

export const post = (url: string, data: any): Promise<ApiResponse> => {
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
          return reject(payload)
        resolve(payload)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const postFile = (url: string, file: File): Promise<ApiResponse> => {
  let data = new FormData();
  data.append('file', file)
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
          return reject(payload)
        }
        return resolve(payload)
      });
  })
}

export const put = (url: string, data: any): Promise<ApiResponse> => {
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
          return reject(payload)
        resolve(payload)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const patch = (url: string, data: any): Promise<ApiResponse> => {
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
          return reject(payload)
        resolve(payload)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const get = (url: string): Promise<ApiResponse> => {
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
          return reject(payload)
        resolve(payload)
      })
      .catch(err => {
        reject(err)
      })
  })

}

export const del = (url: string): Promise<ApiResponse> => {
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
          return reject(payload)
        resolve(payload)
      })
      .catch(err => {
        reject(err)
      })
  })

}
