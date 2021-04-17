import React from 'react';
import ReactDOM from 'react-dom';

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))