import apiUrl from '../apiConfig'
import axios from 'axios'

export const createTest = (data, user) => {
  return axios({
    method: 'POST',
    route: apiUrl + '/tests/',
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
    route: apiUrl + '/tests/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showTest = (id, user) => {
  return axios({
    method: 'GET',
    route: apiUrl + '/tests/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateTest = (id, data, user) => {
  return axios({
    method: 'PATCH',
    route: apiUrl + '/tests/' + id,
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
    route: apiUrl + '/tests/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}