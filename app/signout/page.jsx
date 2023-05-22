'use client'
import ModalWindow from '@/components/ModalWindow'
import ModalForm from '@/components/ModalForm'

const SignOut = () => {
  return (
    <ModalWindow>
    <ModalForm title='Goodbye and come back!' subtext='To keep exercising'/>
  </ModalWindow>
  )
}

export default SignOut
