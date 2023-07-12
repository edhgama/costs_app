import { useHistory } from 'react-router-dom'

import ProjectForm from '../Projects/ProjectForm'
import styles from './NewProject.module.css'

export default function NewProject(){

  const history = useHistory()

  function createPost(project){
    project.cost  = 0;
    project.services = []

    fetch("http://localhost:5000/projects",
    {
      method: "POST",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify(project) , //post precisa de um body :B e um failsafe
    }).then((resp) => resp.json())
    .then((data) => {
      history.push('/projects', {message: `Projeto criado com sucesso`})
    })
    .catch(err => console.log(err)) 
  }

  return(
    <div className={styles.new_project_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para adicionar serviços.</p>
      <ProjectForm handleSubmit={createPost} btnText='Criar Projeto' />
    </div>
  )

}
