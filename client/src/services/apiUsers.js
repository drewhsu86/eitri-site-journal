import api from './apiConfig'

export const signin = async (userData) => {
  try {
    const response = await api.post(`/signin`, userData)
    
    await localStorage.setItem('token', response.data.token)
    return response.data
  } catch (error) {
      throw error
  }
}

export const signup = async (userData) => {
  try {
    const response = await api.post(`/signup`, userData)

    await localStorage.setItem('token', response.data.token)
    return response.data
  } catch (error) {
      throw error
  }
}

// verifyuser happens with the jwt
// so no login info required
export const verifyuser = async () => {
  try {
    const response = await api.get(`/verifyUser`) 
    return response.data
  } catch (error) {
    throw error
  }
}