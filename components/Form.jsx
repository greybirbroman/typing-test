'use client';
import Link from 'next/link';

import { useRef, useState } from 'react';

const Form = ({
  testText,
  typingSpeed,
  typingAccuracy,
  onStartTest,
  initialAccuracy,
  isCorrect,
  setIsCorrect,
  setCurrentIndex,
  setNumberOfIncorrectCharacters,
  currentIndex,
  isStartTest,
  setIsStartTest,
}) => {
  const formRef = useRef(null);
  const [isFormSubmited, setIsFormSubmited] = useState(false);

  const handleSubmit = () => {
    setIsFormSubmited(true);
    setIsStartTest(false);
    console.log(typingAccuracy);
    console.log(typingSpeed);
  };

  const handleKeyDown = (event) => {
    const pressedKey = event.key;
    const isShiftKey = event.shiftKey;

    const currentChar = testText[currentIndex];
    if (
      pressedKey === currentChar ||
      (isShiftKey && pressedKey.toLowerCase() === currentChar.toLowerCase())
    ) {
      setIsCorrect((prevIsCorrect) => {
        const updatedIsCorrect = [...prevIsCorrect];
        updatedIsCorrect[currentIndex] = true;
        return updatedIsCorrect;
      });
      setCurrentIndex((prevIndex) => prevIndex + 1); // Переходим к следующему символу
    } else {
      setIsCorrect((prevIsCorrect) => {
        const updatedIsCorrect = [...prevIsCorrect];
        updatedIsCorrect[currentIndex] = false;
        return updatedIsCorrect;
      });
      if (!isShiftKey) {
        setNumberOfIncorrectCharacters((prevCount) => prevCount + 1); // Увеличиваем счетчик неправильных нажатий
      }
    }
    if (currentIndex === testText.length - 1) {
      handleSubmit();
    }
  };

  return (
    <section className='w-full max-w-full flex-center flex-col'>
      <h1 className='head_text text-left max-w-2xl'>
        <span className='blue_gradient'>
          {isFormSubmited ? 'Congratulations!!!' : 'Pass the ultimate typing test'}
        </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {isFormSubmited
          ? 'Nice try! You are almost certified.'
          : 'Find out your typing speed and surprise your friends or guide received certificate.'}
      </p>

      <form
        ref={formRef}
        onFocus={() => formRef.current.focus()}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism outline-none'
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        tabIndex={0}
      >
        {!isStartTest && (
          <button
            type='button'
            className='outline_btn w-fit self-center'
            onClick={onStartTest}
          >
           {isFormSubmited ? 'Retry' : 'Start test'}
          </button>
        )}
        {isStartTest && (
          <>
            <div className='flex gap-5 font-bold'>
              <span className=' text-cyan-700 shadow-md rounded-full py-2 px-5 bg-white'>
                Speed: {typingSpeed} с/мин{' '}
              </span>
              <span
                className={`${
                  typingAccuracy < 70 ? 'text-red-500' : 'text-green-700'
                } shadow-md rounded-full py-2 px-5 bg-white`} // Демотивируем, если точность упала ниже 70% :)
              >
                Accuracy: {typingAccuracy} %
              </span>
            </div>
          </>
        )}
        {isStartTest ? (
          <div className='text-[21px] leading-[32px] font-bold text-gray-700 mt-[20px] font-inter'>
            {testText.split('').map((char, charIndex) => {
              const isCurrentChar = charIndex === currentIndex;
              const isCorrectChar = isCorrect[charIndex];

              let classNames = '';

              if (isCurrentChar && !isCorrectChar) {
                classNames = 'bg-red-500 text-white rounded-sm px-1';
              } else if (charIndex < currentIndex) {
                classNames = 'text-green-500';
              }
              return (
                <span key={charIndex} className={classNames}>
                  {char}
                </span>
              );
            })}
          </div>
        ) : (
          isFormSubmited && (
            <div className='flex flex-col gap-3 items-center'>
              <h3 className='green_gradient font-bold text-[40px]'>
                Final Results
              </h3>
              <div className='flex gap-5 font-semibold'>
                <span className=' text-cyan-700 shadow-md rounded-full py-2 px-5'>
                  Speed: {typingSpeed} с/мин{' '}
                </span>
                <span
                  className={`${
                    typingAccuracy < 70 ? 'text-red-500' : 'text-green-700'
                  } shadow-md rounded-full py-2 px-5`} // Демотивируем, если точность упала ниже 70% :)
                >
                  Accuracy: {typingAccuracy} %
                </span>
              </div>
            </div>
          )
        )}

        {isStartTest && (
          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href='/' className='text-gray-500 text-sm'>
              Cancel
            </Link>
            <button
              type='button'
              className='px-5 py-1.5 text-sm border border-primary-orange rounded-full text-gray-700 hover:bg-orange-500 font-semibold'
              onClick={onStartTest}
            >
              Retry
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default Form;
