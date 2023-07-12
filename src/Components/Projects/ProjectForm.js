import { useEffect, useState } from 'react'

import Input from "../Form/Input";
import Select from "../Form/Select";
import SubmitButton from "../Form/SubmitButton";

import styles from "./ProjectForm.module.css";

export default function ProjectForm({ btnText, handleSubmit, projectData }) {

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})


  useEffect(() => {
    fetch("http://localhost:5000/categories",
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => console.log(err))
  }, []
  )

  const submit = (e) => {
    e.preventDefault();
    //console.log(project)
    handleSubmit(project); // do pai createPost(project)
  }

  function handleChange(e) {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      },
    })
  }

  return (
    <form onSubmit={submit} className={styles.forms}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        handleOnChange={handleChange}
        placeholder="Insira Nome do Projeto"
        value={project.name ? project.name : ''} />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        handleOnChange={handleChange}
        placeholder="Insira Valor do Projeto"
        value={project.budget ? project.budget : ''} />
      <Select
        name="category_id"
        text="Selecione uma Categoria"
        handleOnChange={handleCategory}
        options={categories}
        value={project.category ? project.category.id : 'Categorias'}
      //aqui quando volta pro select ele conta como valor
      />
      {project.category && <SubmitButton text={btnText} />}
      {/* <SubmitButton text={btnText}/> */}
    </form>
  )
}