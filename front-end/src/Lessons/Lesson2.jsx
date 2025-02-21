import React from 'react';
import Lesson from '../Components/Lesson/Lesson';

const Lesson2 = () => {
  return (
    <Lesson 
      objective="O objetivo é criar uma função que multiplica dois parâmetros"
      tips={[
        "Defina uma função com `function` e o nome do que está função faz.",
        "Retorne diretamente os valores dentro da função."
      ]}
    />
  );
};

export default Lesson2;