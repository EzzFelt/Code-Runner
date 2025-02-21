
import React from 'react';
import Lesson from '../Components/Lesson/Lesson';

const Lesson3 = () => {
  return (
    <Lesson 
      objective="O objetivo é criar uma função que recebe um array de números e retorna a soma de todos os números dentro dele."
      tips={[
        "Defina uma função e um nome a ela, após isso passe o parâmetro que irá receber os números",
        "Certifique-se de usar um laço de repetição para contabilizar cada elemento do array"
      ]}
    />
  );
};

export default Lesson3;
