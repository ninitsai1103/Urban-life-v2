import { useState } from 'react'
import styles from './member.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const InputDatePicker = dynamic(() => import('../common/input-date-picker'), {
  ssr: false,
})
export default function InformationForm() {
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [date, setDate] = useState('')
  return (
    <>
      
    </>
  )
}
