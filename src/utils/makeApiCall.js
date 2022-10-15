import React from 'react'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const makeApiCall = (method='get', endpoint, authToken='', body={}, header={}) => {
    if (method !== 'get') {
        return fetch(`${API_BASE_URL}/${endpoint}`, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            ...header
          },
            body: JSON.stringify(body)
        })
    } else {
        return fetch(`${API_BASE_URL}/${endpoint}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            ...header
      }
    })
  }
}

export default makeApiCall