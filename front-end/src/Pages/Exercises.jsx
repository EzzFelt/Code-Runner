import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para navegação
import '../Styles/Exercises.css';

const Exercises = () => {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const navigate = useNavigate(); // Inicializa a navegação

  const handleToggle = (lessonId) => {
    if (expandedLesson === lessonId) {
      setExpandedLesson(null); // Fecha a lição se já estiver aberta
    } else {
      setExpandedLesson(lessonId); // Abre a lição
    }
  };

  const handleStartLesson = (lessonPath) => {
    navigate(lessonPath); // Navega para o caminho da lição
  };

  return (
    <div className="exercises-page">
      <h3>Exercícios</h3>
      <h4>Escolha um exercício para começar a praticar</h4>
      <div className="lessons-list">
        {/* Lição 1 */}
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
              <button className="start-button" onClick={() => handleStartLesson('/lessons/lesson1')}>Começar</button> {/* Corrigido */}
            </div>
          )}
        </div>

        {/* Lição 2 */}
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
              <button className="start-button" onClick={() => handleStartLesson('/lessons/lesson2')}>Começar</button> {/* Corrigido */}
            </div>
          )}
        </div>

        {/* Lição 3 */}
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
              <button className="start-button" onClick={() => handleStartLesson('/lessons/lesson3')}>Começar</button> {/* Corrigido */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
