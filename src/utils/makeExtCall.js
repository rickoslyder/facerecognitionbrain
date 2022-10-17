import React from 'react'

const makeExtCall = (method='get', endpoint, authToken='', body={}, header={}) => {
    if (method !== 'get') {
        return fetch(`${endpoint}`, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            ...header
          },
            body: JSON.stringify(body)
        })
    } else {
        return fetch(`${endpoint}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            ...header
      }
    })
  }
}

export default makeExtCall