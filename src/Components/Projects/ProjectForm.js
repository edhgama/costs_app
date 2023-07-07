export default function ProjectForm() {
  return (
    <form>
      <div>
        <input type="text" placeholder="Nome do Projeto" />
      </div>
      <div>
        <input type="number" placeholder="00.00" />
      </div>
      <div>
        <select name="category_id">
          <option disabled>Select</option>
        </select>
      </div>
    </form>
  )
}