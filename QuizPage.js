import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './quize.css'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuizPage = () => {
  const questions = [
    { question: "What is 2 + 2?", options: [3, 4, 5], answer: 4, time: 30 },
    { question: "What is 3 + 5?", options: [7, 8, 9], answer: 8, time: 30 },
    { question: "What does 'def' do in Python?", options: ["Defines a function", "Loops through items", "Prints to the screen"], answer: "Defines a function", time: 20 },
    { question: "Which of these is a Python data type?", options: ["integer", "int", "string"], answer: "int", time: 20 },
    { question: "How do you comment a single line in Python?", options: ["//", "#", "/* */"], answer: "#", time: 20 },
    { question: "Which of these is used to create a list in Python?", options: ["[]", "{}", "()"], answer: "[]", time: 20 },
    { question: "What is the output of 'print(2 ** 3)' in Python?", options: ["6", "8", "16"], answer: "8", time: 20 },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(questions[0].time);
  const [intervalId, setIntervalId] = useState(null);

  // Start or reset the timer whenever the question changes
  useEffect(() => {
    setTimer(questions[currentQuestionIndex].time);
  }, [currentQuestionIndex]);

  // Handle the timer countdown for each question
  useEffect(() => {
    if (timer > 0 && !quizCompleted) {
      const id = setInterval(() => setTimer((prevTimer) => prevTimer - 1), 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (timer === 0) {
      handleAnswer(null); // Auto-submit when time runs out
    } else {
      clearInterval(intervalId); // Stop timer when quiz is completed
    }
  }, [timer, quizCompleted, currentQuestionIndex]);

  const handleAnswer = (answer) => {
    if (answer !== null) {
      setUserAnswers([...userAnswers, answer]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true); // End quiz when last question is answered
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        score += 1;
      }
    });
    return score;
  };

  const totalScore = calculateScore();
  const percentage = ((totalScore / questions.length) * 100).toFixed(2); // Ensures 2 decimal points for percentage

  const chartData = {
    labels: ['Correct Answers', 'Incorrect Answers'],
    datasets: [
      {
        label: 'Quiz Results',
        data: [totalScore, questions.length - totalScore],
        backgroundColor: ['#4CAF50', '#FF5722'],
      },
    ],
  };

  return (
    <div className="quiz-container">
      {!quizCompleted ? (
        <div className="question-container">
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} className="option-btn" onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer">
            <p>Time Left: {timer}s</p>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <h2>Quiz Completed!</h2>
          <p>Your score: {totalScore} / {questions.length}</p>
          <p>Percentage: {percentage}%</p>
          <div style={{ width: '300px', height: '300px' }}>
            <Bar data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
