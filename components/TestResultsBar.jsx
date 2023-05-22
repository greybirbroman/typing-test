import React from 'react'

const TestResultsBar = ({ typingSpeed, typingAccuracy }) => {
  return (
    <ul className='flex gap-5 font-bold text-sm'>
    <li className='flex items-center gap-2'>
      <img
        src='/assets/images/speed-icon.png'
        alt='speed-icon'
        className='w-7 h-7 object-contain'
      />
      <span className=' text-cyan-700'>{`Speed: ${typingSpeed} с/мин`}</span>
    </li>
    <li className='flex items-center gap-2'>
      <img
        src='/assets/images/accuracy-icon.png'
        alt='accuracy-icon'
        className='w-7 h-7 object-contain'
      />
      <span
        className={`${
          typingAccuracy < 70 ? 'text-red-500' : 'text-green-700'
        }`} // Демотивируем, если точность упала ниже 70% :)
      >
        {`Accuracy: ${typingAccuracy} %`}
      </span>
    </li>
  </ul>
  )
}

export default TestResultsBar
