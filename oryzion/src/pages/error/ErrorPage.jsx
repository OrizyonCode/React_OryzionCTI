import { useRouteError } from "react-router-dom";
import React from 'react';
import './ErrorPage.css';

export default function ErrorPage() {
  const error = useRouteError();
  const status = error && error.status ? error.status : '404';
  const message = error && error.statusText ? error.statusText : "Ops! Parece que o endereço que você tentou acessar não existe.";

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">{status}</h1>
        <h2 className="error-title">Página Não Encontrada</h2>
        <p className="error-message">{message}</p>
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
