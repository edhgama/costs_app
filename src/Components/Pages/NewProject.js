import ProjectForm from '../Projects/ProjectForm'
import styles from './NewProject.module.css'

export default function NewProject(){

  return(
    <div className={styles.new_project_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para adicionar serviços.</p>
      <ProjectForm btnText='Criar Projeto' />
    </div>
  )

}
