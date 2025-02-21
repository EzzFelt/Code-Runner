// src/lessons/lesson1.jsx
import React from 'react';
import Lesson from '../Components/Lesson/Lesson';

const Lesson1 = () => {
  return (
    <Lesson 
      objective="O objetivo é criar uma função que some dois parâmetros"
      tips={[
        "Defina uma função com `function`",
        "Retorne esses valores a partir de uma palavra chave de função"
      ]}
    />
  );
};

export default Lesson1;