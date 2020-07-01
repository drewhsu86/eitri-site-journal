import axios from 'axios'

const getToken = () => {

  return new Promise(resolve => {
    console.log('apiConfig token: ', localStorage.getItem('token'))
    resolve(`Bearer ${localStorage.getItem('token') || null}`)
  })

}

let apiUrl

const apiUrls = {
  production: 'https://eitri-site-journal.herokuapp.com/api/',
  development: 'http://localhost:3000/api'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

const api = axios.create({
  baseURL: apiUrl
})

api.interceptors.request.use(async function (options) {
  options.headers['Authorization'] = await getToken()
  options.headers['Access-Control-Allow-Origin'] = '*'
  return options
}, function (error) {
  console.log('Request error: ', error)
  return Promise.reject(error)

});

export default api