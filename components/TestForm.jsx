'use client';
import Link from 'next/link';
import ButtonDifficultyBar from './ButtonDifficultyBar';
import TestResultsBar from './TestResultsBar';
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
    if (testStatus === 'completed') return;
    setTestStatus('completed');
  };

  const handleKeyDown = (event) => {
    event.preventDefault(); // предотвратить скролл при нажатии на space
    const pressedKey = event.key;
    const isShiftKey = event.shiftKey;
    const currentChar = testText[currentIndex];
    const isUppercaseChar = /^[A-Z]$/.test(currentChar);
    const isCorrectShiftPress = isShiftKey && isUppercaseChar;

    // Проверка на currentIndex, чтобы убедиться, что он не выходит за пределы массива testText
    if (currentIndex >= testText.length) {
      return;
    }

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
    } else if (isCorrectShiftPress) {
      // Обработка нажатия Shift только для символов, которые должны быть набраны с использованием Shift
      updatedCharacters[currentIndex].isIncorrect = false;
    } else {
      updatedCharacters[currentIndex].isIncorrect = true;
      setNumberOfIncorrectCharacters((prevCount) => prevCount + 1);
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
      const generatedText = data[0];
      //const generatedText = 'test text'
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
      className='mt-10 w-full max-w-2xl flex flex-col justify-between outline-none bg-slate-50 py-4 px-4 rounded shadow relative overflow-hidden'
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
      tabIndex={0}
    >
      {testStatus === 'notStarted' && (
        <>
          <img
            src='/assets/images/keyboard-1.jpg'
            className='absolute object-contain inset-0'
          />
          <ButtonDifficultyBar handleStartTest={handleStartTest} />
        </>
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
        <TestResultsBar
          typingSpeed={typingSpeed}
          typingAccuracy={typingAccuracy}
        />
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
            } else if (
              isIncorrect ||
              (isShiftKey && !isCorrect && !isCurrent)
            ) {
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
            <h2 className='font-bold sm:text-[40px] text-[30px] orange_gradient max-w-2xl'>
              Congratulations!!!
            </h2>
            <p className='text-[20px] font-semibold text-center'>
              {typingAccuracy > 70
                ? 'Nice try! You are almost certified.'
                : 'You could do better if you worked with us!'}
            </p>
            <h3 className='blue_gradient font-bold text-[40px]'>
              Your Results
            </h3>
            <TestResultsBar
              typingSpeed={typingSpeed}
              typingAccuracy={typingAccuracy}
            />
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
