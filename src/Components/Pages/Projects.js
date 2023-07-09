import {useLocation} from 'react-router-dom'

import Message from "../Layout/Message"

export default function Projects() {

  const location = useLocation()
  let message = '';
  if(location.state){
    message = location.state.message
  }


  return (
    <div>
      <h1>Projects</h1>
      {message && <Message msg={message} type={'sucess'}/> }
    </div>
  )

} 