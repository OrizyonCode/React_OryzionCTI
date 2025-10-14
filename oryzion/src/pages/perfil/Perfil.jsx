import React from "react";
import "./Perfil.css";
import iconePerfil from "../../assets/img/IconSuporte.svg";
import Botao from "../../components/botao/Botao";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import VoltarBranco from "../../components/voltarBranco/voltarBranco";

const Perfil = () => {
  return (
    <div className="perfil-page">
      <Header />

      <section className="container-perfil">
        {/* Lado esquerdo */}
        <div className="card lado-esquerdo-perfil">
          <div className="voltar">
            <VoltarBranco/>
          </div>

          <div className="imagem-perfil">
            <img src={iconePerfil} alt="Foto de perfil" />
          </div>

          <div className="upload-container">
            <label htmlFor="imageUpload" className="upload-label">
              Escolher imagem
            </label>
            <input className="input_perfil" type="file" id="imageUpload" accept="image/*" hidden />
          </div>

          <input className="input_perfil" type="text" placeholder="Nome completo" name="usuario" />
          <input className="input_perfil" type="text" placeholder="CPF (somente números)" name="cpf" />
          <input className="input_perfil" type="tel" placeholder="Telefone com DDD" name="telefone" />
        </div>

        {/* Lado direito */}
        <div className="card lado-direito-perfil">
          <h2>Dados Adicionais</h2>

          <input className="input_perfil" type="email" placeholder="Email" name="email" />
          <input className="input_perfil" type="text" placeholder="Endereço completo" name="endereco" />

          <div className="centralizar">
            <Botao nomeBotao="Salvar" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Perfil;
