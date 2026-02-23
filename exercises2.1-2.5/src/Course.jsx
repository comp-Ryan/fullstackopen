const Course = (props) => {
  const courses = props.parts.parts
  const total = courses.reduce((s, p) => s+p.exercises, 0)
  return (
    <div>
      <h1>{props.parts.name}</h1>
      <div>
        {courses.map(courses => 
            <div key={courses.id}> 
              {courses.name} {courses.exercises}
            </div>
        )}
      </div>
      <strong>total of {total} exercises</strong>
    </div>
  )
}

export default Course