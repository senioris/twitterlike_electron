import { LoadingButton } from '@mui/lab';
import { TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import * as ServerApi from '../api/ServerApi'

const Container = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 2px 0;
  width: 100%;
`;

const EditBox = styled(TextField)`
  width: 100%;
`

const Footer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const PostButton = styled(LoadingButton)`
  width: 80px;
`

const Divider = styled('div')`
  background-color: white;
  height: 1px;
  width: 100%;
`

type TweetPostBoxProps = {
  onPost: (() => void)
}

export const TweetPostBox = (props: TweetPostBoxProps): JSX.Element => {
  const [isEnablePost, setEnablePost] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  
  const userPostTextRef = React.useRef<TextFieldProps>(null)

  const onPostTextChanged = React.useCallback(() => {
    if (!userPostTextRef.current?.value) {
      if (isEnablePost) {
        setEnablePost(false)
      }
    } else {
      if (!isEnablePost) {
        setEnablePost(true)
      }
    }
  }, [isEnablePost])

  const onPostClicked = React.useCallback(() => {
      const postText = userPostTextRef.current?.value as string
      setLoading(true)
      ServerApi.tweet(postText).then(() => {
        setLoading(false)
        props.onPost()
        if (userPostTextRef.current) {
          userPostTextRef.current.value = ""
        }
        return
      }).catch((error) => {
        setLoading(false)
        console.log(error)
      })
    }, [],
  )

  return (
    <React.Fragment>
      <Container>
        <EditBox label="Post Tweet" multiline inputRef={userPostTextRef} onChange={onPostTextChanged} maxRows="20"/>
        <Footer>
          <PostButton variant="contained" onClick={onPostClicked} disabled={!isEnablePost} loading={loading}>
            Post
          </PostButton>
        </Footer>
      </Container>
      <Divider />
    </React.Fragment>
  )
}