import React from "react";
import "./perfilCliente.css";
import iconePerfil from "../../assets/img/IconSuporte.svg";
import Botao from "../../components/botao/Botao";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const ClientePerfil = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <section className="container-perfil" style={{ flex: 1 }}>
        <div className="lado-esquerdo-perfil">
          <div className="voltar">← Voltar</div>

          <div className="imagem-perfil">
            <img src={iconePerfil} alt="Foto de perfil" />
          </div>

          <div className="entrada-upload">
            <input
              className="input-upload-imagem"
              type="text"
              placeholder="Upload de Imagem"
              name="imagem"
            />
            <Botao nomeBotao="Alterar" />
          </div>

          <input type="text" placeholder="Nome de usuário" name="usuario" />
          <input type="text" placeholder="CPF do usuário" name="cpf" />
          <input type="tel" placeholder="Telefone do usuário" name="telefone" />
        </div>

        <div className="lado-direito-perfil">
          <div className="centralizar">
            <h2>Dados Adicionais:</h2>
          </div>

          <input type="email" placeholder="Email" name="email" />
          <input type="text" placeholder="Endereço" name="endereco" />

          <div className="centralizar">
            <Botao nomeBotao="Salvar" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientePerfil;
