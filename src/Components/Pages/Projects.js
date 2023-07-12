import { useLocation } from 'react-router-dom'
import Loading from '../Layout/Loading'
import LinkButton from '../Layout/LinkButton'
import Container from '../Layout/Container'
import ProjectCard from '../Projects/ProjectCard'

import Message from "../Layout/Message"
import styles from "./Projects.module.css"
import { useState, useEffect } from 'react'

export default function Projects() {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')
  // const [msgCount, setMessageCount] = useState(0)

  const location = useLocation()
  let message = '';
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data)
          setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    }, 100)

  }, [])

  function removeProject(id) {
    setProjectMessage()
    
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "delete",
      headers: {
        "content-Type": "appliation/json"
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        
        setProjects(projects.filter(project => project.id !== id))
        setProjectMessage('Projeto removido com sucesso!')
        // setMessageCount(msgCount + 1) 
      })
      .catch((err) => console.log(err))

    //setProjectMessage() //funciona mas é ideal?
  }


  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message msg={message} type={'sucess'} />}
      {projectMessage && <Message msg={projectMessage} type={'sucess'} />} {/* key={msgCount} /> */}

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  )

} 