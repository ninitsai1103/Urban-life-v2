import React from 'react'
import LoginForm from '@/components/member/login-form'

export default function Login() {
  return <>
    <div className='container p-4 d-flex justify-content-center align-items-center vh-100 '>
      <LoginForm />
    </div>
    <style jsx>{`
       
        @media (max-width: 768px) {
          .container{
            background: #445C2D;
            border-bottom: 1px solid #000;
          }
        }
      `}</style>
</>
}
