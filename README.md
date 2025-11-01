# 🛒 Automation Ecommerce - Trabalho Final

Suite de testes **end-to-end** desenvolvida com **Cypress** para o site [Automation Exercise](https://www.automationexercise.com) como avaliação final da disciplina de Automação de Testes de Software na Camada de Interface Web, referente e pós graduação em testes de Automação de Testes de Software.

---

## ✅ Casos de Teste Implementados

- [x] Test Case 2: Login com email e senha corretos  
- [x] Test Case 3: Login com email e senha incorretos  
- [x] Test Case 4: Logout de usuário  
- [x] Test Case 5: Registro de usuário com email já existente  
- [x] Test Case 6: Formulário “Contact Us”  
- [x] Test Case 8: Verificação de produtos e página de detalhes  
- [x] Test Case 9: Busca de produto  
- [x] Test Case 10: Verificação de assinatura na página inicial  
- [x] Test Case 15: Realizar pedido (usuário registrado antes do checkout)

---

## 👨‍💻 Autor
**Rodrigo Barbosa**  
Analista de Testes | Automação de Testes com Cypress

---

## 📂 Estrutura do Projeto

```
cypress/
  e2e/                 # Casos de teste (specs)
  fixtures/            # Massa de dados (ex.: products-list.json)
  screenshots/         # Capturas automáticas de falhas
  support/             # Comandos e configurações personalizadas
cypress.config.js
package.json
```

---

## ⚙️ Pré-requisitos

- **Node.js** (versão recomendada: v16+)
- Conexão com a internet (os testes acessam o site público `https://www.automationexercise.com`)

---

## 🚀 Instalação

Na raiz do projeto, execute:

```bash
npm install
```

---

## 🧪 Execução dos Testes

### ▶️ Rodar todos os testes (modo headless)
```bash
npx cypress run
```

### 🧩 Rodar um teste específico
```bash
npx cypress run --spec "cypress/e2e/modules/05-checkout-produto/Place-order-register-before-checkout.cy.js"
```

### 🖥️ Abrir o Cypress Test Runner (modo interativo)
```bash
npm run cypress:open
# ou
npx cypress open --e2e
```

---

## � Relatórios (mochawesome)

O projeto inclui suporte para geração de relatórios com o reporter mochawesome. O fluxo gera arquivos JSON por spec, mescla-os e produz um relatório HTML legível.

Como gerar localmente:

1. Instale dependências (se ainda não instalou):

```bash
npm install
# ou, se tiver package-lock.json
npm ci
```

2. Rode o comando de relatório (script disponível em `package.json`):

```bash
npm run cypress:report
```

3. Abra o relatório gerado:

```
# Windows (PowerShell)
Start-Process "cypress/reports/mochawesome/report.html"

# Linux
xdg-open cypress/reports/mochawesome/report.html

# macOS
open cypress/reports/mochawesome/report.html
```

Notas:
- O HTML final fica em `cypress/reports/mochawesome/report.html`.
- Recomendamos usar Node.js v20+ localmente por compatibilidade com dependências (ex.: `@faker-js/faker@10`).
- No CI, o workflow já faz upload dos artefatos (`cypress/reports`) para download a partir da execução no GitHub Actions.


## �💡 Dica: Script npm (opcional)

Adicione ao seu `package.json`:

```json
"scripts": {
  "cypress:run": "cypress run",
  "cypress:open": "cypress open"
}
```

Assim, você poderá executar:
```bash
npm run cypress:run
npm run cypress:open
```

---

## 📦 Dependências Principais

- **Cypress** 13.x  
- **@faker-js/faker**

> Confira as versões exatas no arquivo `package.json`.

---

## 🧭 Boas Práticas

- Alguns arquivos `.cy.js` possuem espaços no nome — utilize aspas ao referenciá-los com `--spec`.
- Caso algum teste falhe por **timeout**, verifique se há **pop-ups ou modais** bloqueando as ações.
- Para **CI/CD**, utilize o Dashboard do Cypress com `--record` e defina a variável `CYPRESS_RECORD_KEY` com segurança.

---

## 🛠️ Troubleshooting

- Se ocorrer erro de navegador ausente, use `--browser chrome` ou instale um navegador compatível.
- No **Windows**, prefira rodar via **Git Bash** ou **WSL** para evitar problemas com caminhos.

---

## 📬 Contato

Se precisar de melhorias (scripts, CI ou estrutura de testes), fique à vontade para abrir uma **issue** ou entrar em contato para sugestões e contribuições.
