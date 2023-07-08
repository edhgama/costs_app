import { useEffect, useState } from 'react'

import Input from "../Form/Input";
import Select from "../Form/Select";
import SubmitButton from "../Form/SubmitButton";

import styles from "./ProjectForm.module.css";

export default function ProjectForm({ btnText }) {

  const [categories, setCategories] = useState([])

  useEffect(() => { 
      fetch("http://localhost:5000/categories",
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then((data) => {setCategories(data)
      })
    .catch((err)=> console.log(err))
  },[]
  )

  return (
    <form className={styles.forms}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira Nome do Projeto" />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira Valor do Projeto" />
      <Select
        name="category_id"
        text="Selecione uma Categoria"
        options={categories}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}