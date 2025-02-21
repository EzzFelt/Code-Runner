import React from 'react';
import MyCodeMirror from '../Code-Mirror/CodeMirror';
import styles from './styles.module.css';

const Lesson = ({ objective, tips = [] }) => {
  return (
    <div className={styles['lesson-container']}>
      <div className={styles['lesson-info']}>
        <div className={styles['lesson-objective']}>
          <h2>Objetivo da Lição</h2>
          <p>{objective}</p>
        </div>
        
        <div className={styles['lesson-divider']} />
        
        <div className={styles['lesson-tips']}>
          <h2>Dicas</h2>
          <ul>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className={styles.codeMirrorWrapper}>
        <MyCodeMirror />
      </div>
    </div>
  );
};

export default Lesson;