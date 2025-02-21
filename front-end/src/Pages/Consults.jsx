import React, { useState } from 'react';
import '../Styles/Consults.css';

const ConsultsPage = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = (event) => {
    if (event.target.classList.contains('modal')) {
      setActiveModal(null);
    }
  };

  return (
    <div className="consults-page">
      <h1>Consultas</h1>
      <h2>Caso tenha dúvidas, consulte aqui nesta página</h2>

      <div className="consults-grid">
        <div className="consult-card" onClick={() => openModal('modal-funcoes')}>
          Funções
          <span className="icon">func()</span>
        </div>
        
        <div className="consult-card" onClick={() => openModal('modal-operadores-aritmeticos')}>
          Operadores Aritméticos
          <span className="icon">+ - * / %</span>
        </div>
        
        <div className="consult-card" onClick={() => openModal('modal-operadores-logicos')}>
          Operadores Lógicos
          <span className="icon">&& || !</span>
        </div>

        <div className="consult-card" onClick={() => openModal('modal-estruturas-de-controle')}>
          Estruturas de Controle
          <span className="icon">if / else / switch</span>
        </div>

        <div className="consult-card" onClick={() => openModal('modal-variaveis')}>
          Variáveis
          <span className="icon">let / const / var</span>
        </div>

        <div className="consult-card" onClick={() => openModal('modal-arrays')}>
          Arrays
          <span className="icon">[]</span>
        </div>

        <div className="consult-card" onClick={() => openModal('modal-objetos')}>
              Objetos
           <span className="icon">&#123;&#125;</span>
        </div>
      </div>

      {/* Modais */}
      {activeModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            {activeModal === 'modal-funcoes' && (
              <>
                <h3>Funções</h3>
                <p>Funções são blocos de código que você pode criar para realizar tarefas específicas. Elas são muito úteis porque você pode reutilizar o mesmo código em diferentes partes do seu programa sem precisar escrever tudo de novo.</p>
                <p>Você define uma função com a palavra-chave <code>function</code>, seguida de um nome, e dentro de chaves você coloca o que a função deve fazer.</p>
                <pre className="code-box">
{`function minhaFuncao() {
  console.log("Olá, mundo!");
}`}
                </pre>
                <p>Para usar essa função, você a chama pelo nome:</p>
                <pre className="code-box">
{`minhaFuncao();  // Vai imprimir "Olá, mundo!" no console`}
                </pre>
              </>
            )}

            {activeModal === 'modal-operadores-aritmeticos' && (
              <>
                <h3>Operadores Aritméticos</h3>
                <p>Operadores aritméticos são símbolos usados para fazer operações matemáticas em números, como soma, subtração, multiplicação, divisão e módulo.</p>
                <p>Aqui estão os principais operadores aritméticos:</p>
                <ul>
                  <li><strong>+</strong>: Soma</li>
                  <li><strong>-</strong>: Subtração</li>
                  <li><strong>*</strong>: Multiplicação</li>
                  <li><strong>/</strong>: Divisão</li>
                  <li><strong>%</strong>: Módulo (resto da divisão)</li>
                </ul>
                <pre className="code-box">
{`let soma = 5 + 3;   // soma = 8
let subtracao = 5 - 3;   // subtracao = 2
let multiplicacao = 5 * 3;   // multiplicacao = 15
let divisao = 5 / 3;   // divisao = 1.6667
let modulo = 5 % 3;   // modulo = 2`}
                </pre>
              </>
            )}

            {activeModal === 'modal-operadores-logicos' && (
              <>
                <h3>Operadores Lógicos</h3>
                <p>Os operadores lógicos são usados para combinar expressões booleanas (verdadeiro ou falso). Eles ajudam a fazer decisões mais complexas no seu código.</p>
                <ul>
                  <li><strong>&&</strong> (E): Retorna verdadeiro apenas se ambas as condições forem verdadeiras.</li>
                  <li><strong>||</strong> (OU): Retorna verdadeiro se pelo menos uma das condições for verdadeira.</li>
                  <li><strong>!</strong> (NÃO): Inverte o valor lógico da condição (verdadeiro vira falso, e vice-versa).</li>
                </ul>
                <pre className="code-box">
{`let a = true;
let b = false;
console.log(a && b); // false
console.log(a || b); // true
console.log(!a); // false`}
                </pre>
              </>
            )}

            {activeModal === 'modal-estruturas-de-controle' && (
              <>
                <h3>Estruturas de Controle</h3>
                <p>As estruturas de controle são usadas para alterar o fluxo de execução do programa. Você pode tomar decisões e executar diferentes blocos de código com base em condições.</p>
                <ul>
                  <li><strong>if</strong>: Executa um bloco de código se uma condição for verdadeira.</li>
                  <li><strong>else</strong>: Executa um bloco de código se a condição do <code>if</code> for falsa.</li>
                  <li><strong>switch</strong>: Verifica várias condições possíveis, facilitando a decisão.</li>
                </ul>
                <pre className="code-box">
{`if (idade >= 18) {
  console.log("Você é maior de idade");
} else {
  console.log("Você é menor de idade");
}`}
                </pre>
              </>
            )}

            {activeModal === 'modal-variaveis' && (
              <>
                <h3>Variáveis</h3>
                <p>As variáveis são como "caixas" onde você pode armazenar dados, como números, texto ou até outros tipos de dados. Elas ajudam a organizar e manipular informações no seu código.</p>
                <p>Você pode criar variáveis usando as palavras-chave <code>let</code>, <code>const</code> ou <code>var</code>:</p>
                <ul>
                  <li><code>let</code>: Para variáveis que podem mudar durante a execução do programa.</li>
                  <li><code>const</code>: Para variáveis que não podem ser reatribuídas depois de definidas.</li>
                  <li><code>var</code>: Mais antigo, mas ainda usado, e tem escopo de função.</li>
                </ul>
                <pre className="code-box">
{`let idade = 25;
const nome = "João";
var cidade = "São Paulo";`}
                </pre>
              </>
            )}

            {activeModal === 'modal-arrays' && (
              <>
                <h3>Arrays</h3>
                <p>Arrays são listas de valores que podem ser de qualquer tipo. Eles são úteis quando você quer armazenar múltiplos valores em uma única variável. No JavaScript, um array é definido com colchetes <code>[]</code>.</p>
                <p>Os valores dentro de um array são indexados a partir de 0. Ou seja, o primeiro valor está na posição 0, o segundo na posição 1, e assim por diante.</p>
                <pre className="code-box">
{`let frutas = ["Maçã", "Banana", "Laranja"];
console.log(frutas[0]);  // Imprime "Maçã"
console.log(frutas[1]);  // Imprime "Banana"`}
                </pre>
              </>
            )}

            {activeModal === 'modal-objetos' && (
              <>
                <h3>Objetos</h3>
                <p>Objetos são estruturas que podem armazenar múltiplos valores, mas ao invés de serem acessados por índice (como nos arrays), os valores são acessados por "chaves".</p>
                <p>Os objetos são definidos com chaves <code>{`{}`}</code> e podem conter diferentes tipos de dados, incluindo outros objetos ou arrays.</p>
                <pre className="code-box">
{`let pessoa = {
  nome: "Maria",
  idade: 30,
  cidade: "Rio de Janeiro"
};
console.log(pessoa.nome);  // Imprime "Maria"`}
                </pre>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultsPage;
