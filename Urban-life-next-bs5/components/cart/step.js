import React from 'react'
import styles from './cart.module.css'

export default function Step({
  step = '',
  title = '',
  circle_color = {}
}) {
  return (
    <>
      <div className={styles.box}>
        <div className={`${styles.circle} ${circle_color}`}>{step}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </>
  )
}
