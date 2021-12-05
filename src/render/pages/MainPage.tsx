import { Typography } from '@material-ui/core'
import * as React from 'react'
import { useNavigate } from 'react-router';
import { getTweet, TweetData, TweetList } from '../api/ServerApi'


export const MainPage = (): JSX.Element => {
  const [tweet, setTweet] = React.useState<TweetData[]>()
  const navigate = useNavigate();

  const getTweetList = (isLatest: boolean) => {
    getTweet(isLatest).then((json: TweetList) => {
      if (isLatest) {
        setTweet(json.tweet_list)
      } else {
        let newList = tweet.concat(json.tweet_list)
        setTweet(newList)
      }
    }).catch((error) => {
      console.log(error)
      if (error.response.status == 401) {
        navigate("/login")
      }
    })
  }

  React.useEffect(() => {
    getTweetList(true)
    return
  }, [])

  return (
    <div>
      <Typography>main page</Typography>
    </div>
  )
}