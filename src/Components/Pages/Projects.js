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
        // console.log(data)
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch((err) => console.log(err))
    }, 100)

  }, [])



  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message msg={message} type={'sucess'} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category}
              handleRemove={project.handleRemove}
              key={project.id}
            />
          ))}
        {!removeLoading && <Loading /> }
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  )

} 