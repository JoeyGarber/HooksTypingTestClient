import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexResults = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/results/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const createResult = (WPM, Accuracy, testId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/results',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      results: {
        WPM,
        Accuracy,
        Test: testId
      }
    }
  })
}