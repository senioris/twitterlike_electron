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

export const MainPage = (): JSX.Element => {
  const [tweet, setTweet] = React.useState<TweetData[]>()
  const navigate = useNavigate();

  const getTweetList = (isLatest: boolean) => {
    ServerApi.getTweet(isLatest).then((json: TweetList) => {
      if (isLatest) {
        setTweet(json.tweet_list)
      } else {
        let newList = tweet?.concat(json.tweet_list)
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
    <Container>
      <MenuBar />
      <ContentContainer>
        <TweetListBox>
          <TweetPostBox />
          <TweetRow user={'aaaa'} text={'bbbb'} postDate={'cccc'} likeCount={1} isLike={true} tweetId={0} />
          <TweetRow user={'aaaa'} text={'bbbb'} postDate={'cccc'} likeCount={1} isLike={true} tweetId={0} />
        </TweetListBox>
      </ContentContainer>
    </Container>
  )
}