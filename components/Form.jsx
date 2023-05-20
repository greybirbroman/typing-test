'use client';
import Link from 'next/link';

import { useRef, useState, useEffect } from 'react';

const Form = () => {
  const formRef = useRef(null);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [testText, setTestText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStartTest, setIsStartTest] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
  const [numberOfIncorrectCharacters, setNumberOfIncorrectCharacters] =
    useState(0);
  const [pressedKey, setPressedKey] = useState('');
  const [currentChar, setCurrentChar] = useState('');

  const handleSubmit = () => {
    setIsFormSubmited(true);
    setIsStartTest(false);
  };

  const handleKeyDown = (event) => {
    const pressedKey = event.key;
    setPressedKey(pressedKey);
    console.log('pressedKey', pressedKey);
    const isShiftKey = event.shiftKey;

    const currentChar = testText[currentIndex];
    setCurrentChar(currentChar);
    console.log('currentChar', currentChar);

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

  const handleStartTest = async () => {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=all-meat');
      const data = await response.json();
      const generatedText = 'Your test text goes here';
      setTestText(generatedText);
      setCurrentIndex(0);
      setIsCorrect(Array(generatedText.length).fill(false));
      setNumberOfIncorrectCharacters(0);
      setTypingAccuracy(100);
      setTypingSpeed(0);
      setStartTime(Date.now());
      setIsStartTest(true);
      setIsFormSubmited(false);
      setPressedKey('');
      setCurrentChar('');
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  useEffect(() => {
    if (currentIndex === testText.length && isStartTest) {
      setEndTime(Date.now());
    }
    if (isStartTest) {
      setTypingSpeed(calculateTypingSpeed());
      setTypingAccuracy(calculateTypingAccuracy());
    }
  }, [isStartTest, currentIndex, testText]);

  function calculateTypingSpeed() {
    const numberOfCorrectCharacters = isCorrect.filter(
      (correct) => correct
    ).length;
    const totalTimeInSeconds = (Date.now() - startTime) / 1000;
    const typingSpeed = (numberOfCorrectCharacters / totalTimeInSeconds) * 60;
    return typingSpeed.toFixed(0); // Округляем до целого числа
  }

  function calculateTypingAccuracy() {
    const totalCharacters = testText.length;
    const accuracy = (numberOfIncorrectCharacters / totalCharacters) * 100;
    return (100 - accuracy).toFixed(1);
  }

  return (
    <form
      ref={formRef}
      onFocus={() => formRef.current.focus()}
      className='mt-10 w-full max-w-2xl flex flex-col gap-7  outline-none bg-slate-50 py-4 px-4 rounded-md shadow'
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
      tabIndex={0}
    >
      {!isStartTest && (
        <button
          type='button'
          className='black_btn w-fit self-center'
          onClick={handleStartTest}
        >
          {isFormSubmited ? 'Retry' : 'Start'}
        </button>
      )}
      {isStartTest && (
        <>
          <div className='flex gap-5 font-bold text-sm'>
            <span className=' text-cyan-700'>Speed: {typingSpeed} с/мин </span>
            <span
              className={`${
                typingAccuracy < 70 ? 'text-red-500' : 'text-green-700'
              }`} // Демотивируем, если точность упала ниже 70% :)
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
            if (isCurrentChar) {
              classNames = 'bg-green-500 text-white rounded-sm px-1';
            } else if (charIndex < currentIndex) {
              classNames = isCorrectChar ? 'text-green-500' : 'bg-red-500 text-white rounded-sm px-1';
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
            <h1 className='head_text text-left max-w-2xl'>
              <span className='orange_gradient'>Congratulations!!!</span>
            </h1>
            <p className='desc text-left max-w-md'>
              Nice try! You are almost certified.
            </p>
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
            onClick={handleStartTest}
          >
            Retry
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;
