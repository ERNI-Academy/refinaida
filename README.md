# About

Refinaida is a solution to help product owners refine user stories. Where, through a definition, a context can be configured to finally be able to obtain several user stories that can be imported into Jira.

> [!NOTE]
> In order to use the solution, it is necessary to have an instance in Azure OpenAI, so the variables in the **.env** file located at the root of the project must be changed:
> <pre><code>
> VITE_AZURE_OPEN_AI_API_KEY=OPEN_AI_API_KEY #Replace with your API key
> VITE_AZURE_OPEN_AI_API_VERSION=API_VERSION #Replace with the API version
> VITE_AZURE_OPEN_AI_DEPLOYMENT=DEPLOYEMENT #Replace with the deployment name of your OpenAI model
> VITE_AZURE_OPEN_AI_ENDPOINT=OPEN_AI_ENDPOINT #Replace with the Azure OpenAI endpoints
> VITE_AZURE_OPEN_AI_MODEL=OPEN_AI_MODEL #Replace with the model name
> VITE_AZURE_OPEN_AI_TEMPERATURE=0.5 # Replace with the temperature value, by default it is 0.7
> </code></pre>
> Can you check the documentation here:
> - https://learn.microsoft.com/en-us/azure/ai-services/openai/reference
> - https://learn.microsoft.com/en-us/azure/ai-services/what-are-ai-services?context=%2Fazure%2Fai-studio%2Fcontext%2Fcontext


## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Built With

<ul>
<li><p><a href="https://tailwindcss.com/"> Tailwindcss</a></p></li>
<li><p><a href="https://ui.shadcn.com/"> Shadcn</a></p></li>
<li><p><a href="https://lucide.dev/"> Lucide</a></p></li>
</ul>

# Getting Started

<ol>
  <li>Open solution with visual studio.</li>
  <li>Clone this repository.</li>
  <br/>
  <pre><code>https://github.com/ERNI-Academy/refinaida.git</code></pre>
  <li>Update packages.</li>
  <br/>
  <pre><code>npm install</code></pre>
  <li>Update environment variables, only first time.</li>
  <li>Run the solution.</li>
  <br/>
  <pre><code>npm run dev</code></pre>
  <li>Open <a href="http://localhost:5173"> http://localhost:5173</a> with your browser to see the result.</li>
</ol>

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
