import styles from './Project.module.css'

import { /* parse, */ v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../Layout/Loading'
import Container from '../Layout/Container'
import ProjectForm from '../Projects/ProjectForm'
import Message from "../Layout/Message"
import ServiceForm from '../Services/ServiceForm'
import ServiceCard from '../Services/ServiceCard'

export default function Project() {
  const { id } = useParams()
  const [project, setProject] = useState([])
  const [services, setservices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [message, setMessage] = useState()
  const [msgType, setMsgType] = useState()
  const [showServiceForm, setShowServiceForm] = useState(false)
  // const [msgCount, setMessageCount] = useState(0)


  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((resp) => resp.json())
        .then(data => {
          setProject(data)
          setservices(data.services)
        })
        .catch((err) => console.log(err))

    },
      100)
  }, [id])

  function editPost(project) {
    setMessage()

    //validar budget
    if (project.budget < project.cost) {

      setMessage('Orçamento maior que custo limite!')
      setMsgType('error')
      // setMessageCount(msgCount + 1) 
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)

        setMessage(`Projeto Atualizado`)
        setMsgType('sucess')
        // setMessageCount(msgCount + 1)
      }
      )
      .catch(err => console.log(err))

    //setMessage() //funciona mas é ideal? /2
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }


  function createService(project) {
    setMessage()
    //update att serviços
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    //max valeu validation
    if (newCost > parseFloat(project.budget)) {
      // setMessage("Valor ultrapassado!")
      // setMsgType('error')
      project.services.pop()
      return false
    }

    //atualiza custo total com o serviço
    project.cost = newCost

    //update no banco*
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowServiceForm(false)
        setMessage(`Serviço Criado!`)
        setMsgType('sucess')
      })
      .catch((err) => console.log(err))

  }

  function removeService(service) {

  }

  return (
    <>
      {project.name ?
        (<div className={styles.project_details}>

          <Container customClass="column">
            {message && <Message type={msgType} msg={message} />} {/* key={msgCount}  /> */}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info} >
                  <p><span>Categoria:</span> {project.category.name} </p>
                  <p><span>Orçamento:</span> R${project.budget} </p>
                  <p><span>Total Utilizado:</span> R${project.cost} </p>
                </div>
              ) : (
                <div className={styles.project_info} /*style={{"padding":"0 5rem"}}*/ >
                  <ProjectForm btnText={"Atualizar"} handleSubmit={editPost} projectData={project} />
                </div>
              )}

            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um Serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm handleSubmit={createService}
                    btnText={'Adicionar Serviço'}
                    projectData={project} />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService} />
                ))
              }
              {services.length === 0 &&
                <p>Não há serviços cadastrados</p>
              }
            </Container>



          </Container>
        </div>)
        :
        (<Loading />)
      }
    </>
  )
}