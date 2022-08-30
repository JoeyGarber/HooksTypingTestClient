import apiUrl from '../apiConfig'
import axios from 'axios'

export const createTest = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/tests/',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      test: {
        title: data.title,
        body: data.body
      }
    }
  })
}

export const indexTests = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/tests/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showTest = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/tests/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateTest = (id, data, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/tests/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      test: {
        title: data.title,
        body: data.body
      }
    }
  })
}

export const deleteTest = (id, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/tests/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}