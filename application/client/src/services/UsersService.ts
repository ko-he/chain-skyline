import { apiClient } from './BaseService'
class UsersService {
  create = async(
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await apiClient.post(
        'users',
        { email, username, password }
      )
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    } 
  }
}

export default UsersService