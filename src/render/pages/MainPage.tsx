import { Typography } from '@mui/material'
import * as React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import * as ServerApi from '../api/ServerApi'
import { TweetData, TweetList } from '../api/ServerApi';
import { MenuBar } from '../components/MenuBar';
import { TweetPostBox } from '../components/TweetPostBox';
import { TweetRow } from '../components/TweetRow';


const Container = styled('div')`
  display: flex;
  height: 100vh;
  flex-direction: column;
`

const ContentContainer = styled('div')`
`

const TweetListBox = styled('div')`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  min-width: 480px;
  width: 60%;
  min-height: 100%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  background-color: #3b3b3b;
`

const getTweetRows = (tweet: TweetData[]) => {
  return (
    <React.Fragment>
      {tweet.map((data) => {
        return (
          <TweetRow key={data.tweet_id} user={data.user_name} text={data.tweet} postDate={data.date}
          likeCount={data.like_count} isLike={data.is_like ==1} tweetId={data.tweet_id} />
        )
      })}
    </React.Fragment>
  )
}

export const MainPage = (): JSX.Element => {
  const [tweet, setTweet] = React.useState<TweetData[]>([])
  const navigate = useNavigate();

  const getTweetList = (isLatest: boolean, isAll: boolean, tweetId: number = -1) => {
    ServerApi.getTweet(isLatest, isAll, tweetId).then((json: TweetList) => {
      if (tweetId < 0) {
        setTweet(json.tweet_list)
      } else {
        let newList = []
        if (isLatest) {
          newList = json.tweet_list.concat(tweet)
        } else {
          newList = tweet.concat(json.tweet_list)
        }
        setTweet(newList)
      }
    }).catch((error) => {
      console.log(error)
      if (error.response.status == 401) {
        navigate("/login", {replace: true})
      }
    })
  }

  const onPost = React.useCallback(
    () => {
      getTweetList(true, true, tweet.length <= 0 ? -1 : tweet[0].tweet_id)
    }, []
  )

  const handleScroll = React.useCallback(
    (e) => {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      console.log("bottom")
      if (bottom) {
        console.log("bottom")
      }
    }, [],
  )

  React.useEffect(() => {
    getTweetList(false, true)
    return
  }, [])

  return (
    <Container onScroll={handleScroll}>
      <MenuBar />
      <ContentContainer onScroll={handleScroll}>
        <TweetListBox onScroll={handleScroll}>
          <TweetPostBox onPost={onPost}/>
          {getTweetRows(tweet)}
        </TweetListBox>
      </ContentContainer>
    </Container>
  )
}