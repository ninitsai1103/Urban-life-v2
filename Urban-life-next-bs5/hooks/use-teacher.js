import React, { useState, useEffect, useContext, createContext } from 'react'

const TeacherInfoContext = createContext(null)

export const TeacherInfoProvider = ({ children }) => {
  const [teacher, setTeacher] = useState([])

  // useEffect(() => {
  const fetchUserTeacher = async () => {
    try {
      const url = 'http://localhost:3005/api/user_teacher'
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      const userTeacher = data.data.user_teacher
     
      if (Array.isArray(userTeacher)) {
        setTeacher(userTeacher)
      } else {
        console.log(
          'Server returned incorrect data type, cannot set into state'
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  // fetchUserTeacher()
  // }, [])

  return (
    <TeacherInfoContext.Provider
      value={{ teacher, setTeacher, fetchUserTeacher }}
    >
      {children}
    </TeacherInfoContext.Provider>
  )
}

export const useUserTeacher = () => useContext(TeacherInfoContext)
