import React, { useState } from 'react';
import './Chamado.css';

// Ícone de upload (SVG simples)
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon_upload"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 014 4.973V18a3 3 0 01-3 3H7a3 3 0 01-3-3v-1h1z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v16m-4-8h8"
    />
  </svg>
);

export default function Chamado() {
  const [cpfCnpj, setCpfCnpj] = useState('cpf');
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <div className="container_pagina">
      <div className="container_cadastro">
        <form className="form_cadastro">
          <h1 className="titulo_cadastro">Crie sua Conta</h1>

          {/* Nome completo */}
          <label>Nome completo</label>
          <input type="text" placeholder="Insira seu nome completo" className="input_comum" />

          {/* E-mail */}
          <label>E-mail</label>
          <input type="email" placeholder="exemplo@email.com" className="input_comum" />

          {/* Senha */}
          <label>Senha</label>
          <div className="senha_container">
            <input
              type={senhaVisivel ? 'text' : 'password'}
              placeholder="Mínimo 8 caracteres"
              className="input_comum input_senha"
            />
            {/* O ícone de olho no screenshot é mais elaborado, então vou usar um SVG */}
            <button
              type="button"
              className="btn_olho"
              onClick={() => setSenhaVisivel(!senhaVisivel)}
            >
              <svg className="olho_icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={senhaVisivel ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7 1.274-4.057 5.065-7 9.542-7 1.54 0 3.018.397 4.364 1.127" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z"} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={senhaVisivel ? "M18.364 15.636A9.99 9.99 0 0021.542 12c-1.274-4.057-5.065-7-9.542-7a9.99 9.99 0 00-3.364.557M2.458 12c1.274 4.057 5.065 7 9.542 7 1.54 0 3.018-.397 4.364-1.127m4.092-4.509L13.875 18.825M17.5 12a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" : "M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
              </svg>
            </button>
          </div>
          
          {/* Toggle CPF/CNPJ */}
          <div className="cpf_cnpj_toggle">
            <button
              type="button"
              className={cpfCnpj === 'cpf' ? 'ativo' : ''}
              onClick={() => setCpfCnpj('cpf')}
            >
              CPF
            </button>
            <button
              type="button"
              className={cpfCnpj === 'cnpj' ? 'ativo' : ''}
              onClick={() => setCpfCnpj('cnpj')}
            >
              CNPJ
            </button>
          </div>

          {/* Input do documento */}
          <input
            type="text"
            placeholder={cpfCnpj === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
            className="input_comum"
          />

          {/* Upload de áudio */}
          <label className="label_upload">Upload de áudio</label>
          <div className="upload_box">
            <UploadIcon />
            <p>
              <span className="upload_link">Clique para carregar</span> ou arraste e solte
              <br />
              <span className="upload_info">WAV, MP3 ou M4A (MÁX. 10MB)</span>
            </p>
            {/* Input real de arquivo (escondido) */}
            <input type="file" style={{ display: 'none' }} accept=".wav,.mp3,.m4a" />
          </div>

          {/* Botão Cadastrar */}
          <button type="submit" className="btn_cadastrar">
            Cadastrar
          </button>

          {/* Link para login */}
          <p className="login_text">
            Já tem uma conta? <a href="#">Faça login</a>
          </p>
        </form>
      </div>
    </div>
  );
}