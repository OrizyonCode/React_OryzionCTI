import React, { useState } from "react";
import "./Chamado.css";
import Botao from "../../components/botao/Botao";
import Olho from "../../assets/img/olho.png"

function Chamado() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState("CPF");

  const alternarSenha = () => setMostrarSenha(!mostrarSenha);
  const alternarDocumento = (tipo) => setTipoDocumento(tipo);

  return (
    <div className="container_cadastro">
      <form className="form_cadastro">
        <h2>Cadastro de Chamado</h2>

        <div className="grid_campos">
          <div className="campo">
            <label>Nome completo</label>
            <input type="text" placeholder="Insira seu nome completo" />
          </div>

          <div className="campo">
            <label>E-mail</label>
            <input type="email" placeholder="exemplo@email.com" />
          </div>

          <div className="campo">
            <label>Senha</label>
            <div className="campo_senha">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
              />
              <button
                type="button"
                className="btn_visibilidade"
                onClick={alternarSenha}
              >
                👁️
              </button>
            </div>
          </div>

          <div className="campo">
            <label>{tipoDocumento}</label>
            <div className="documento_switch">
              <button
                type="button"
                className={tipoDocumento === "CPF" ? "ativo" : ""}
                onClick={() => alternarDocumento("CPF")}
              >
                CPF
              </button>
              <button
                type="button"
                className={tipoDocumento === "CNPJ" ? "ativo" : ""}
                onClick={() => alternarDocumento("CNPJ")}
              >
                CNPJ
              </button>
            </div>
            <input
              type="text"
              placeholder={
                tipoDocumento === "CPF"
                  ? "000.000.000-00"
                  : "00.000.000/0000-00"
              }
            />
          </div>
        </div>

        <div className="upload_section">
          <label>Upload de áudio</label>
          <div className="upload_area">
            <input type="file" accept=".mp3,.wav,.m4a" id="audioUpload" hidden />
            <label htmlFor="audioUpload" className="upload_label">
              <span className="icone_upload">📤</span>
              <p>
                <strong>Clique para carregar</strong> ou arraste e solte
                <br />
                <small>WAV, MP3 ou M4A (MAX. 10MB)</small>
              </p>
            </label>
          </div>
        </div>

        <div className="btn_cadastrar">
          <Botao nomeBotao="Cadastrar" type="submit" />
        </div>

      </form>
    </div>
  );
}

export default Chamado;
