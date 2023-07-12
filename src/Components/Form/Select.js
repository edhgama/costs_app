import styles from './Select.module.css'
export default function Select({ text, name, options, handleOnChange, value }) {

  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ''}>
        <option disable selected hidden >Selecione opção</option>
        {/*aqui pra evitar problemas no valor do select*/}
        {
          options.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))
        }
      </select>
    </div>
  )
}