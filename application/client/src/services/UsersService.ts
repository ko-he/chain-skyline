import { apiClient } from './BaseService'
class UsersService {
  create = async() => {
    try {
      const response = await apiClient.post('users')
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    } 
  }

}

export default UsersService