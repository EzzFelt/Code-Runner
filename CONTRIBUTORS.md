# Contribuindo para o Code Runner

Obrigado por querer contribuir para o **Code Runner**!  
Aqui estão as diretrizes para ajudar você a colaborar com o projeto.

---

## 📌 Como contribuir?

Você pode contribuir com o projeto de diferentes formas:

1. **Melhorando o código e a interface**  
   - Refatoração do código para melhorar legibilidade e desempenho.  
   - Melhorias na interface e usabilidade do site.  

2. **Adicionando novos desafios**  
   - Atualmente, os desafios estão disponíveis apenas em **JavaScript**.  
   - Quero expandir o suporte para **Python** e **C#**.  
   - Se você deseja adicionar desafios nessas linguagens, siga as instruções abaixo.  

---

## 🔧 Configurando o ambiente

Antes de começar, siga os passos abaixo para configurar seu ambiente de desenvolvimento.

1. **Clone o repositório**  
   ```sh
   git clone git@github.com:EzzFelt/Code-Runner.git
   ```
   Substitua `<SEU_NOME>` pelo seu usuário do GitHub.

2. **Entre na pasta do projeto**  
   ```sh
   cd Code-Runner
   ```

3. **Inicie os containers**  
   ```sh
   docker compose up --build
   ```

Agora você já pode começar a contribuir!

---

## 📜 Adicionando novos desafios

Se você deseja adicionar novos desafios em **Python** ou **C#**, siga este padrão:

1. Acesse a pasta dos desafios:
   ```
   /coderunner/back-end/src/Controllers/
   ```
   No validateCode, é definido a função correta para cada exercício
   Você precisa definir as funções em **Python** ou **C#** e então
   criar as novas telas para navegar entre os desafios

2. Siga o formato dos desafios existentes.

3. Teste seu desafio antes de enviar um **Pull Request**.

---

## 🔥 Enviando sua contribuição

1. **Crie um novo branch para suas alterações**  
   ```sh
   git checkout -b minha-contribuicao
   ```

2. **Faça suas alterações e as registre no Git**  
   ```sh
   git add .
   git commit -m "Adicionando melhorias e desafios"
   ```

3. **Envie seu branch para o repositório**  
   ```sh
   git push origin minha-contribuicao
   ```

4. **Crie um Pull Request no GitHub**  
   - Acesse o repositório no GitHub.  
   - Clique em "New Pull Request".  
   - Explique suas alterações e envie.  

---

## 🤝 Código de Conduta

Pedimos que todos os colaboradores sigam nosso [Código de Conduta](CODE_OF_CONDUCT.md) para manter um ambiente saudável e respeitoso.

---

Se tiver dúvidas, abra uma **issue** no GitHub! 

