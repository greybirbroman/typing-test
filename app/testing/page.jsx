'use client';

import { useState, useEffect } from 'react';
import Form from '../../components/Form';

const Testing = () => {
  const [testText, setTestText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStartTest, setIsStartTest] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100)
  const [numberOfIncorrectCharacters, setNumberOfIncorrectCharacters] = useState(0);


  const handleStartTest = async () => {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=all-meat');
      const data = await response.json();
      const generatedText = 'Your test text goes here';
      setTestText(generatedText);
      setCurrentIndex(0);
      setIsCorrect(Array(generatedText.length).fill(false));
      setNumberOfIncorrectCharacters(0)
      setTypingAccuracy(100)
      setTypingSpeed(0);
      setStartTime(Date.now());
      setIsStartTest(true);
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  useEffect(() => {
    if (currentIndex === testText.length && isStartTest) {
      setEndTime(Date.now());
    }
    if(isStartTest) {
        setTypingSpeed(calculateTypingSpeed());
        setTypingAccuracy(calculateTypingAccuracy())
    }
  }, [isStartTest, currentIndex, testText]);


  function calculateTypingSpeed() {
    const numberOfCorrectCharacters = isCorrect.filter((correct) => correct).length;
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
    <Form
      testText={testText}
      typingSpeed={typingSpeed}
      typingAccuracy={typingAccuracy}
      onStartTest={handleStartTest}
      onRetryTest={handleStartTest}
      isCorrect={isCorrect}
      setIsCorrect={setIsCorrect}
      setCurrentIndex={setCurrentIndex}
      setNumberOfIncorrectCharacters={setNumberOfIncorrectCharacters}
      currentIndex={currentIndex}
      isStartTest={isStartTest}
      setIsStartTest={setIsStartTest}
    />
  );
};

export default Testing;
