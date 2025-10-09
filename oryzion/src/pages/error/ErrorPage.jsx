import { useRouteError } from "react-router-dom";
import React from 'react';
import './ErrorPage.css'; // Importa a folha de estilo

export default function ErrorPage() {
  const error = useRouteError();
  // Tenta obter o status do erro (geralmente 404)
  const status = error && error.status ? error.status : '404';

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">{status}</h1>
        
        <h2 className="error-title">Página Não Encontrada</h2>
        <p className="error-message">
          Ops! Parece que o endereço que você tentou acessar não existe.
        </p>

        {/* Botão para voltar ao histórico do navegador */}
        <button 
          className="error-home-button"
          onClick={() => window.history.back()}
        >
          Voltar para onde eu estava
        </button>
      </div>
    </div>
  );
}