import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Project() {
  const { id } = useParams()
  const [project, setProject] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((resp) => resp.json())
      .then(data => { setProject(data) })
      .catch((err) => console.log(err))
  }, [id])


  return (
    <p className={styles.project_}>{project.name}</p>
  )
}