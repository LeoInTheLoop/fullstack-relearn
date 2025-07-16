
const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <li key={index}>  
        {person.name + "  "+ person.number} 
        <button onClick={()=>deletePerson(person.id)}>delete</button>
         </li>
      ))}
    </ul>
  )
}
export default Persons