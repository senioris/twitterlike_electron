import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { getFollowList } from '../api/ServerApi';

export const LaunchPage = (): JSX.Element => {

  const navigate = useNavigate();
  React.useEffect(() => {
    // フォローリスト取得で認証状態確認を代替する
    getFollowList().then((json) => {
      navigate("/main")
    }).catch((error) => {
      console.debug(error)
      if (error.response.status == 401) {
        navigate("/login")
      }
    })
    return
  }, [])

  return <div/>
}