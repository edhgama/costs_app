import styles from "../Projects/ProjectForm.module.css"

import Input from "../Form/Input"
import SubmitButton from "../Form/SubmitButton"
import { useState } from "react"

export default function ServiceForm({ handleSubmit, btnText, projectData }) {

  const [service, setService] = useState({})

  const submit = (e) => {
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)  //manda o dado pra funcao do pai, que vai lidar com resto /\
  }

  function handleChange(e) {
    setService({
      ...service,
      [e.target.name]: e.target.value
    })

  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Serviço"
        name="name"
        placeholder={"Insira o nome do serviço"}
        handleOnChange={handleChange} />
      <Input
        type="number"
        text="Custo do Serviço"
        name="cost"
        placeholder={"Insira o valor do serviço"}
        handleOnChange={handleChange} />
      <Input
        type="text"
        text="Descrição do Serviço"
        name="description"
        placeholder={"Insira a descrição do serviço"}
        handleOnChange={handleChange} />
      <SubmitButton text={btnText} />
    </form>
  )

}