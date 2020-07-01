import api from './apiConfig'

// ===== Projects ======

export const getProjects = async userID => {
  try {
      const response = await api.get(`/users/${userID}`)
      return response.data
  } catch (error) {
      throw error
  }
}

export const getProject = async id => {
  try {
      const response = await api.get(`/projects/${id}`)
      return response.data
  } catch (error) {
      throw error
  }
}

export const createProject = async project => {
  try {
      const response = await api.post('/projects', project)
      return response.data
  } catch (error) {
      throw error
  }
}

export const updateProject = async (id, project) => {
  try {
      const response = await api.put(`/projects/${id}`, project)
      return response.data
  } catch (error) {
      throw error
  }
}

export const deleteProject = async id => {
  try {
      const response = await api.delete(`/projects/${id}`)
      return response.data
  } catch (error) {
      throw error
  }
}

// ===== Entries ======
export const getEntries = async userID => {
  try {
      const response = await api.get(`/projects/${userID}/entries`)
      return response.data
  } catch (error) {
      throw error
  }
}

export const getEntry = async id => {
  try {
      const response = await api.get(`/entries/${id}`)
      return response.data
  } catch (error) {
      throw error
  }
}

export const createEntry = async entry => {
  try {
      const response = await api.post('/entries', entry)
      return response.data
  } catch (error) {
      throw error
  }
}

export const updateEntry = async (id, entry) => {
  try {
      const response = await api.put(`/entries/${id}`, entry)
      return response.data
  } catch (error) {
      throw error
  }
}

export const deleteEntry = async id => {
  try {
      const response = await api.delete(`/entries/${id}`)
      return response.data
  } catch (error) {
      throw error
  }
}
