import React, { useState, useEffect } from "react";
import "./Perfil.css";
import iconePerfil from "../../assets/img/IconSuporte.svg";
import Botao from "../../components/botao/Botao";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import VoltarBranco from "../../components/voltarBranco/VoltarBranco";

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const idUsuario = 1; 
        const resposta = await api.get(`/usuarios/${idUsuario}`);
        const dados = resposta.data;

        setNome(dados.nome);
        setEmail(dados.email);
        setTelefone(dados.telefone);
        setEndereco(dados.endereco);
        setCpf(dados.cpf);
        setPreview(dados.imagemUrl);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        Swal.fire("Erro", "Não foi possível carregar o perfil.", "error");
      }
    }
    carregarPerfil();
  }, []);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🟣 Enviar atualização do perfil
  async function atualizarPerfil(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("telefone", telefone);
      formData.append("endereco", endereco);
      formData.append("cpf", cpf);
      if (imagem) formData.append("imagem", imagem);

      const idUsuario = 1; 
      await api.put(`/usuarios/${idUsuario}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Sucesso!", "Perfil atualizado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Swal.fire("Erro", "Não foi possível atualizar o perfil.", "error");
    }
  }

  return (
    <div className="perfil-page">
      <Header />

      <section className="container-perfil">
        {/* Lado esquerdo */}
        <div className="card lado-esquerdo-perfil">
          <div className="voltar">
            <VoltarBranco />
          </div>

          <div className="imagem-perfil">
            <img src={preview || iconePerfil} alt="Foto de perfil" />
          </div>

          <div className="upload-container">
            <label htmlFor="imageUpload" className="upload-label">
              Escolher imagem
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              hidden
              onChange={handleImagemChange}
            />
          </div>

          <input
            className="input_perfil"
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className="input_perfil"
            type="text"
            placeholder="CPF (somente números)"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            className="input_perfil"
            type="tel"
            placeholder="Telefone com DDD"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        {/* Lado direito */}
        <div className="card lado-direito-perfil">
          <h2>Dados Adicionais</h2>

          <input
            className="input_perfil"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input_perfil"
            type="text"
            placeholder="Endereço completo"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />

          <div className="centralizar">
            <Botao nomeBotao="Salvar" aoClicar={atualizarPerfil} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Perfil;
