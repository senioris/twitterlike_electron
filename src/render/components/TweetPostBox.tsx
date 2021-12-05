import { LoadingButton } from '@mui/lab';
import { TextField, TextFieldProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
const PostButton = styled(LoadingButton)`
  width: 80px;
`

const Divider = styled('div')`
  background-color: white;
  height: 1px;
  width: 100%;
`

const useStyles = makeStyles({
  postButton: {
    marginLeft: 'auto',
  }
})

export const TweetPostBox = (): JSX.Element => {
  const classes = useStyles()

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
        <EditBox label="Post Tweet" required multiline inputRef={userPostTextRef} onChange={onPostTextChanged}/>
        <PostButton variant="contained" className={classes.postButton} onClick={onPostClicked} disabled={!isEnablePost} loading={loading}>
          Post
        </PostButton>
      </Container>
      <Divider />
    </React.Fragment>
  )
}