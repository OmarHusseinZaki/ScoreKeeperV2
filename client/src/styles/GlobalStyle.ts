import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #f5f7fa;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    min-height: 100vh;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding: 1rem;
  }
  
  a {
    text-decoration: none;
    color: #4a90e2;
    transition: color 0.3s;
    
    &:hover {
      color: #357abD;
    }
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  ul, ol {
    list-style: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5em;
    font-weight: 500;
    line-height: 1.2;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
  
  /* Utility classes */
  .text-center {
    text-align: center;
  }
  
  .text-right {
    text-align: right;
  }
  
  .text-left {
    text-align: left;
  }
  
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 0.75rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-5 { margin-top: 1.25rem; }
  .mt-6 { margin-top: 1.5rem; }
  
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-5 { margin-bottom: 1.25rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  
  .ml-1 { margin-left: 0.25rem; }
  .ml-2 { margin-left: 0.5rem; }
  .ml-3 { margin-left: 0.75rem; }
  .ml-4 { margin-left: 1rem; }
  .ml-5 { margin-left: 1.25rem; }
  .ml-6 { margin-left: 1.5rem; }
  
  .mr-1 { margin-right: 0.25rem; }
  .mr-2 { margin-right: 0.5rem; }
  .mr-3 { margin-right: 0.75rem; }
  .mr-4 { margin-right: 1rem; }
  .mr-5 { margin-right: 1.25rem; }
  .mr-6 { margin-right: 1.5rem; }
  
  .p-1 { padding: 0.25rem; }
  .p-2 { padding: 0.5rem; }
  .p-3 { padding: 0.75rem; }
  .p-4 { padding: 1rem; }
  .p-5 { padding: 1.25rem; }
  .p-6 { padding: 1.5rem; }
  
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .flex-wrap { flex-wrap: wrap; }
  .flex-1 { flex: 1; }
  
  .w-full { width: 100%; }
  .h-full { height: 100%; }
`;

export default GlobalStyle; 