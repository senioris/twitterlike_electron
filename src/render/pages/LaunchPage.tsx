import * as React from 'react'
import { useNavigate } from 'react-router';

export const LaunchPage = (): JSX.Element => {

  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/login")
    return
  }, [])

  return <div/>
}