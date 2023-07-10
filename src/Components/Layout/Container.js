import styles from './Container.module.css'

export default function Container(props) {

  return(
    <div className={`${styles.container} ${styles[props.customClass]} `}>
      {props.children /*children do elemento aka dentro da tag html* */}
    </div>
  )

}