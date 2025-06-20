
const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)


const Content = ({ parts}) => (
  <div>

    {
      parts.map((part, index) => (
      <Part key={index} part={part} />
    ))
    }

  </div>
)

const Total = ({parts}) => <h2>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</h2>


const Course = ({name,parts}) => (
  <div>
  <Header course={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </div>
)

export default Course;