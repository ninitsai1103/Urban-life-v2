import React, { useState, useEffect, useContext, createContext } from 'react'

const TeacherInfoContext = createContext(null)

export function TeacherInfoProvider({ children }) {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const url = 'http://localhost:3005/api/teacher'
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        const teachers = data.data.teachers

        if (Array.isArray(teachers)) {
          setTeachers(teachers)
        } else {
          console.log(
            'Server returned incorrect data type, cannot set into state'
          )
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchTeacher()
  }, [])

  return (
    <TeacherInfoContext.Provider
      value={{ teachers, setTeachers }}
    >
      {children}
    </TeacherInfoContext.Provider>
  )
}

export const UseTeacherInfo = () => useContext(TeacherInfoContext)
