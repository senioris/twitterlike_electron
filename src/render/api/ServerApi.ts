import axios from "axios"

axios.defaults.baseURL = 'https://solen_sns/'
axios.defaults.withCredentials = true


export type TweetList = {
  tweet_list: TweetData[]
}

export type TweetData = {
  user_id: number
  user_name: string
  tweet_id: number
  tweet: string
  like_count: number
  is_like: number
  date: string
}

export const signin = async (userid:string, password:string): Promise<string> => {
  const response = await axios.post("user/login", {
    user_id: userid,
    password: password
  })

  if (response.status != 200) {
    console.log(response.status)
    throw new Error('login error')
  }

  return response.data
}

export const signup = async (userid: string, password: string): Promise<string> => {
  const response = await axios.post("/user/regist", {
    user_id: userid,
    password: password
  })

  if (response.status != 200) {
    console.log(response.status)
    throw new Error('signup error')
  }

  return response.data
}

export const logout = async (): Promise<string> => {
  const response = await axios.get("/user/logout",)
  return response.data
}

export const getTweet = async (isLatest: boolean, isAll: boolean , tweetId: number): Promise<TweetList> => {
  const json = {
    tweet_id: tweetId,
    isLatest: isLatest,
    isAll: isAll
  }

  const response = await axios.post("/tweet/request_tweet", json)
  return JSON.parse(JSON.stringify(response.data)) as TweetList
}

export const tweet = async (tweet: string): Promise<string> => {
  const response = await axios.post("/tweet/tweet", {
    tweet: tweet
  })

  if (response.status != 200) {
    console.log(response.status)
    throw new Error('tweet error')
  }

  return response.data
}

export const like = async (tweetId: number, isRegister: boolean): Promise<string> => {
  const response = await axios.post("/like/like_update", {
    tweet_id: tweetId,
    isRegister: isRegister
  })

  if (response.status != 200) {
    console.log(response.status)
    throw new Error('tweet error')
  }

  return response.data
}

export const getFollowList = async (): Promise<string> => {
  const response = await axios.get("/follow/request_follow_list",)
  return response.data
}