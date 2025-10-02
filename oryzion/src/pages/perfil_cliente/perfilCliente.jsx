import React from "react";
import "./perfilCliente.css";
import iconePerfil from "../../assets/img/IconSuporte.svg";

const clientePerfil = () => {
  return (
    <div className="container-perfil">
      <div className="lado-esquerdo-perfil">
        <div className="voltar">← Voltar</div>

        <div className="imagem-perfil">
          <img src={iconePerfil} alt="Foto de perfil" />
          <input type="file" className="botao-upload" />
        </div>

        <div className="entrada-upload">
          <input
            className="input-upload-imagem"
            type="text"
            placeholder="Upload de Imagem"
            name="imagem"
          />
          <button className="botao-alterar">Alterar</button>
        </div>

        <input
          type="text"
          placeholder="Nome de usuário"
          name="usuario"
        />
        <input
          type="text"
          placeholder="CPF do usuário"
          name="cpf"
        />
        <input
          type="tel"
          placeholder="Telefone do usuário"
          name="telefone"
        />
      </div>

      <div className="lado-direito-perfil">
        <h2>Dados Adicionais:</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          type="text"
          placeholder="Endereço"
          name="endereco"
        />
        <button className="botao-salvar">Salvar</button>
      </div>
    </div>
  );
};

export default clientePerfil;
