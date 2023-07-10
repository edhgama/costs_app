import {useLocation} from 'react-router-dom'
import LinkButton from '../Layout/LinkButton'
import Container from '../Layout/Container'

import Message from "../Layout/Message"
import styles from "./Projects.module.css"

export default function Projects() {

  const location = useLocation()
  let message = '';
  if(location.state){
    message = location.state.message
  }



  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto"/>
      </div>
      {message && <Message msg={message} type={'sucess'}/> }
      <Container customClass="start">
        <p>Projetos... </p>
      </Container>
    </div>
  )

} 