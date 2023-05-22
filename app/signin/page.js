'use client'
import ModalWindow from '@/components/ModalWindow'
import ModalForm from '@/components/ModalForm'

const SignIn = () => {
  return (
      <ModalWindow>
        <ModalForm title='Please Sign-In' subtext='To enjoy all our services' children/>
      </ModalWindow>
  )
}

export default SignIn
