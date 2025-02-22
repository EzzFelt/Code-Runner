import React from 'react';
import MyCodeMirror from '../Code-Mirror/CodeMirror';
import styles from './styles.module.css';

// Lesson component that displays the lesson objective, tips, and a code editor
const Lesson = ({ objective, tips = [] }) => {
  return (
    <div className={styles['lesson-container']}>
      {/* Lesson information section */}
      <div className={styles['lesson-info']}>
        {/* Lesson objective section */}
        <div className={styles['lesson-objective']}>
          <h2>Objetivo da Lição</h2>
          <p>{objective}</p>
        </div>

        {/* Divider between objective and tips */}
        <div className={styles['lesson-divider']} />

        {/* Lesson tips section */}
        <div className={styles['lesson-tips']}>
          <h2>Dicas</h2>
          <ul>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code editor section */}
      <div className={styles.codeMirrorWrapper}>
        <MyCodeMirror />
      </div>
    </div>
  );
};

export default Lesson;