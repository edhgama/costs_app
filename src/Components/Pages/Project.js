import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../Layout/Loading'
import Container from '../Layout/Container'
import ProjectForm from '../Projects/ProjectForm'
import Message from "../Layout/Message"

export default function Project() {
  const { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [message, setMessage] = useState()
  const [msgType, setMsgType] = useState()
  const [msgCount, setMessageCount] = useState(0)


  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((resp) => resp.json())
        .then(data => { setProject(data) })
        .catch((err) => console.log(err))

    },
      100)
  }, [id])

  function editPost(project){
    //validar budget
    if(project.budget < project.costs){
      setMessage('Orçamento maior que custo limite!')
      setMsgType('error')
      setMessageCount(msgCount + 1)
      console.log(msgCount)
      return false
    }
    
    fetch(`http://localhost:5000/projects/${project.id}`,{
      method:"PATCH",
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then((data) => {
      // console.log(data)
      setProject(data)
      setShowProjectForm(false)
      setMessage(`Projeto Atualizado`)
      setMsgType('sucess')
      setMessageCount(msgCount + 1)
      }
    )
    .catch(err => console.log(err))

  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  return (
    <>
      {project.name ?
        (<div className={styles.project_details }>
          <Container customClass="column">
            {message && <Message type={msgType} msg={message} key={msgCount}  />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info} >
                  <p><span>Categoria:</span> {project.category.name} </p>
                  <p><span>Orçamento:</span> R${project.budget} </p>
                  <p><span>Total Utilizado:</span> R${project.costs} </p>
                </div>
              ) : (
                <div className={styles.project_info} style={{"padding":"0 5rem"}}>
                  <ProjectForm btnText={"Atualizar"} handleSubmit={editPost} projectData={project}/> 
                </div>
              )}
            </div>
          </Container>
        </div>)

        :
        (
          <Loading />)
      }
    </>
  )
}