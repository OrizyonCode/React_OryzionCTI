import React from 'react';
import './ErrorPage.css';

export default function ErrorPage() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Página Não Encontrada</h2>
        <p className="error-message">
          Ops! Parece que o endereço que você tentou acessar não existe.
        </p>
        <button 
          className="error-home-button"
          onClick={() => window.history.back()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
  