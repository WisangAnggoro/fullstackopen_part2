const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.map((part) => part.exercises).reduce((a, b) => a + b, 0)
  return(
    <p><b>Total of {sum} exercise</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {
        course.parts.map((part, index) => 
          <Part 
            part={part} 
            key={part.id} 
          />
        )
      }
      <Total course={course}/>
    </div>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      <h1>Web development curiculum</h1>
      {
        courses.map((course, index) =>
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
          </div>
        )
      }
    </div>
  )
}

export default Course;