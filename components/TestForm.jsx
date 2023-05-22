'use client';
import Link from 'next/link';
import ButtonDifficultyBar from './ButtonDifficultyBar';
import { useRef, useState, useEffect } from 'react';

const TestForm = () => {
  const formRef = useRef(null);
  const [testText, setTestText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [testStatus, setTestStatus] = useState('notStarted');
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
  const [numberOfIncorrectCharacters, setNumberOfIncorrectCharacters] =
    useState(0);
  const [characters, setCharacters] = useState([]);

  const handleSubmit = () => {
    setTestStatus('completed');
  };

  const handleKeyDown = (event) => {
    event.preventDefault(); // предотвратить скролл при нажатии на space
    const pressedKey = event.key;
    const isShiftKey = event.shiftKey;
    const currentChar = testText[currentIndex];
    const isShiftAndNotUppercase = isShiftKey && !/^([A-Z])$/.test(pressedKey);

    const updatedCharacters = characters.map((charObj, index) => {
      if (index === currentIndex) {
        return {
          ...charObj,
          isShiftKey: isShiftKey && index === currentIndex,
          isCurrent: false,
          isCorrect: false,
          isIncorrect: false,
        };
      }
      return charObj;
    });

    if (
      pressedKey === currentChar ||
      (isShiftKey && pressedKey.toLowerCase() === currentChar.toLowerCase())
    ) {
      updatedCharacters[currentIndex].isCorrect = true;
      setCurrentIndex((prevIndex) => prevIndex + 1);
      if (currentIndex + 1 < testText.length) {
        updatedCharacters[currentIndex + 1].isCurrent = true;
      }
    } else if (isShiftAndNotUppercase) {
      // Обработка нажатия Shift только для символов, которые должны быть набраны с использованием Shift
      updatedCharacters[currentIndex].isIncorrect = true;
    } else {
      setNumberOfIncorrectCharacters((prevCount) => prevCount + 1);
      updatedCharacters[currentIndex].isIncorrect = true;
    }

    setCharacters(updatedCharacters);

    if (currentIndex === testText.length - 1) {
      handleSubmit();
    }
  };

  const handleStartTest = async (difficulty) => {
    try {
      const response = await fetch(
        `https://baconipsum.com/api/?type=all-meat&paras=1`
      );
      const data = await response.json();
      console.log(data);
      const generatedText = data[0];
      // Установка уровня сложности
      let sentenceCount = 1;

      if (difficulty === 'medium') {
        sentenceCount = 2;
      } else if (difficulty === 'high') {
        sentenceCount = 4 || 3;
      }

      const sentenceRegex = /[.|!|?]+/g;
      const sentences = generatedText
        .split(sentenceRegex)
        .slice(0, sentenceCount);
      const generatedTextModified = sentences.join('.');

      const initialCharacters = generatedTextModified.split('').map((char) => ({
        char,
        isCurrent: false,
        isCorrect: false,
        isIncorrect: false,
      }));

      setTestText(generatedTextModified);
      initialCharacters[0].isCurrent = true;
      setCharacters(initialCharacters);
      setCurrentIndex(0);
      setNumberOfIncorrectCharacters(0);
      setTypingAccuracy(100);
      setTypingSpeed(0);
      setStartTime(Date.now());
      setTestStatus('inProgress');
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  useEffect(() => {
    if (currentIndex === testText.length && testStatus === 'inProgress') {
      setEndTime(Date.now());
    }
    if (testStatus === 'inProgress') {
      setTypingSpeed(calculateTypingSpeed());
      setTypingAccuracy(calculateTypingAccuracy());
    }
  }, [testStatus, currentIndex, testText]);

  function calculateTypingSpeed() {
    const numberOfCorrectCharacters = characters.filter(
      (char) => char.isCorrect
    ).length;
    const totalTimeInSeconds = (Date.now() - startTime) / 1000;
    const typingSpeed = (numberOfCorrectCharacters / totalTimeInSeconds) * 60;
    return typingSpeed.toFixed(0); // Округляем до целого числа
  }

  function calculateTypingAccuracy() {
    const totalCharacters = testText.length;
    const numberOfCorrectCharacters =
      totalCharacters - numberOfIncorrectCharacters;
    const accuracy = (numberOfCorrectCharacters / totalCharacters) * 100;

    if (accuracy < 0) {
      return 0;
    }
    return accuracy.toFixed(1);
  }

  return (
    <form
      ref={formRef}
      onFocus={() => formRef.current.focus()}
      className='mt-10 w-full max-w-2xl flex flex-col justify-between outline-none bg-slate-50 py-4 px-4 rounded-md shadow'
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
      tabIndex={0}
    >
      {testStatus === 'notStarted' && (
        <ButtonDifficultyBar handleStartTest={handleStartTest} />
      )}
      {testStatus === 'completed' && (
        <button
          type='button'
          className='black_btn w-fit self-center'
          onClick={handleStartTest}
        >
          Retry
        </button>
      )}
      {testStatus === 'inProgress' && (
        <>
          <div className='flex gap-5 font-bold text-sm'>
            <div className='flex items-center gap-2'>
              <img
                src='/assets/images/speed-icon.png'
                alt='speed-icon'
                className='w-7 h-7 object-contain'
              />
              <span className=' text-cyan-700'>{typingSpeed} с/мин </span>
            </div>
            <div className='flex items-center gap-2'>
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
                {typingAccuracy} %
              </span>
            </div>
          </div>
        </>
      )}
      {testStatus === 'inProgress' ? (
        <div className='text-[21px] leading-[32px] font-bold text-gray-700 mt-[20px] font-inter'>
          {characters.map((charInfo, charIndex) => {
            const { char, isCurrent, isCorrect, isIncorrect, isShiftKey } =
              charInfo;
            let classNames = '';
            const errorClass = 'bg-red-500 text-white px-[2px]';
            const correctClass = 'bg-green-500 text-white px-[2px]';

            if (isCurrent) {
              classNames += correctClass;
            } else if (isIncorrect && !isCurrent && !isShiftKey) {
              classNames += errorClass;
            } else if (isCorrect) {
              classNames += ' text-green-500';
            } else if (isShiftKey && !isCurrent) {
              classNames += correctClass;
            } else {
              classNames += ' text-gray-700';
            }

            return (
              <span key={charIndex} className={classNames}>
                {char}
              </span>
            );
          })}
        </div>
      ) : (
        testStatus === 'completed' && (
          <div className='flex flex-col gap-3 items-center'>
            <h1 className='head_text text-left max-w-2xl'>
              <span className='orange_gradient'>Congratulations!!!</span>
            </h1>
            <p className='desc text-left max-w-md'>
              {typingAccuracy > 70
                ? 'Nice try! You are almost certified.'
                : 'You could do better if you worked with us!'}
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
      {testStatus === 'inProgress' && (
        <div className='flex-end mx-3 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='button'
            className='orange_btn'
            onClick={handleStartTest}
          >
            Retry
          </button>
        </div>
      )}
    </form>
  );
};

export default TestForm;
