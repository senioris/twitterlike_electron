import axios from "axios"

const URL = "dummy"

export const signin = async (userid:string, password:string): Promise<string> => {
  const response = await axios.post(URL + "/user/login", {
    user_id: userid,
    password: password
  })

  if (response.status != 200) {
    console.log(response.status)
    throw new Error('login error')
  }

  return response.data
}