import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../Styles/Exercises.css'; // Import CSS for styling

const Exercises = () => {
  const [expandedLesson, setExpandedLesson] = useState(null); // State to track which lesson is expanded
  const navigate = useNavigate(); // Initialize navigation

  // Function to toggle the expanded state of a lesson
  const handleToggle = (lessonId) => {
    if (expandedLesson === lessonId) {
      setExpandedLesson(null); // Close the lesson if it's already open
    } else {
      setExpandedLesson(lessonId); // Open the lesson
    }
  };

  // Function to navigate to the lesson path
  const handleStartLesson = (lessonPath) => {
    navigate(lessonPath); // Navigate to the lesson path
  };

  return (
    <div className="exercises-page">
      <h3>Exercícios</h3>
      <h4>Escolha um exercício para começar a praticar</h4>
      <div className="lessons-list">
        {/* Lesson 1 */}
        <div
          className={`lesson-card ${expandedLesson === 1 ? 'expanded' : ''}`}
          onClick={() => handleToggle(1)}
        >
          <h5>
            <span className="dot"></span>
            Lição 1
          </h5>
          {expandedLesson === 1 && (
            <div className="lesson-details">
              <p>Dificuldade: <span className="difficulty fácil">Fácil</span></p>
              <p>Faça a soma de 2 números e retorne o resultado no console.</p>
              <button className="start-button" onClick={() => handleStartLesson('/lessons/lesson1')}>Começar</button> {/* Start button for lesson 1 */}
            </div>
          )}
        </div>

        {/* Lesson 2 */}
        <div
          className={`lesson-card ${expandedLesson === 2 ? 'expanded' : ''}`}
          onClick={() => handleToggle(2)}
        >
          <h5>
            <span className="dot"></span>
            Lição 2
          </h5>
          {expandedLesson === 2 && (
            <div className="lesson-details">
              <p>Dificuldade: <span className="difficulty média">Média</span></p>
              <p>Crie uma função que multiplica 2 parâmetros e retorne o resultado no console.</p>
              <button className="start-button" onClick={() => handleStartLesson('/lessons/lesson2')}>Começar</button> {/* Start button for lesson 2 */}
            </div>
          )}
        </div>

        {/* Lesson 3 */}
        <div
          className={`lesson-card ${expandedLesson === 3 ? 'expanded' : ''}`}
          onClick={() => handleToggle(3)}
        >
          <h5>
            <span className="dot"></span>
            Lição 3
          </h5>
          {expandedLesson === 3 && (
            <div className="lesson-details">
              <p>Dificuldade: <span className="difficulty difícil">Difícil</span></p>
              <p>Crie uma função que recebe um array de números e retorna a soma de todos os números dentro dele.</p>
              <button className="start-button" onClick={() => handleStartLesson('/lessons/lesson3')}>Começar</button> {/* Start button for lesson 3 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises; // Export the Exercises component
