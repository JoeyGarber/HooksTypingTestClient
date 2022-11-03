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