import { Card, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import { Favorite } from '@mui/icons-material';
import * as ServerApi from '../api/ServerApi'

const CardContainer = styled(Card)`
  width: calc(100% - 6px);
  display: flex;
  flex-direction: column;
  padding: 7px;
  margin: 5px 3px;
  box-sizing: border-box;
`
const TweetText = styled(Typography)`
  width: 100%;
`

const Header = styled('div')`
  width: 100%;
  display: flex;
`

const UserName = styled(Typography)`
  flex-grow: 1;
`
const PostDate = styled(Typography)`
`
const Footer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const LikeCount = styled(Typography)`

`

type TweetRowProps = {
  tweetId: number
  user: string
  text: string
  postDate: string
  likeCount: number
  isLike: boolean
}

export const TweetRow = (props: TweetRowProps): JSX.Element => {

  const [isLike, setLike] = React.useState(props.isLike)

  const getFavoriteColor = React.useMemo(() => {
    if (isLike) {
      return "secondary"
    } else {
      return "disabled"
    }
  }, [isLike])

  const onLikeClicked = React.useCallback(() => {
    setLike(!isLike)
    ServerApi.like(props.tweetId, !isLike)
  }, [isLike])

  return (
    <CardContainer>
      <Header>
        <UserName>{props.user}</UserName>
        <PostDate>{props.postDate}</PostDate>
      </Header>
      <TweetText>{props.text.split('\n').map((line, key) => <span key={key}>{line}<br /></span>)}</TweetText>
      <Footer>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onLikeClicked}
          color="inherit"
        >
          <Favorite fontSize="small" color={getFavoriteColor} />
        </IconButton>
        <LikeCount>{props.likeCount}</LikeCount>
      </Footer>
    </CardContainer>
  )
}