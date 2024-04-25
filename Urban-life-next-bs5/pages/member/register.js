import React from 'react'
import RegisterForm from '@/components/member/register-form'

export default function Register() {
  return (
    <>
      <div className="container p-4 d-flex justify-content-center align-items-center vh-100">
        <RegisterForm />
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            background: #445c2d;
            border-bottom: 1px solid #000;
          }
        }
      `}</style>
    </>
  )
}
