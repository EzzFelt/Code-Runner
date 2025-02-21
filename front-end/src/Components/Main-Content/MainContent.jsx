import React from 'react';
import MyCodeMirror from './CodeMirror'; // Importa o componente CodeMirror
import '../Styles/MainContent.css';

const MainContent = () => {
  return (
    <div className="mainContent">
      <div className="questionContainer">
        <div className="text-question">
          <p>Questão 1</p>
          <p>Faça uma função que receba como parâmetro 2 valores, está função deve
            retornar a soma desses valores, após isso o valor deve ser inserido no console.
          </p>
        </div>
        <div className="text-question-variables">
          <p>Dicas</p>
          <p>Parâmetros são como exigências para sua função funcionar. Sem essas exigências,
            sua função não se torna prática.
          </p>
        </div>
      </div>

      <MyCodeMirror /> 
    </div>
  );
};

export default MainContent;
