import React, { useState, useEffect } from "react";
import "./Perfil.css";
import iconePerfil from "../../assets/img/IconSuporte.svg";
import Botao from "../../components/botao/Botao";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import VoltarBranco from "../../components/voltarBranco/VoltarBranco";
import api from "../../Services/services";
import Swal from "sweetalert2";

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  // Constante do ID fixo para teste, alinhada com a função 'atualizarPerfil'
  const ID_DO_USUARIO_FIXO = 1;

  useEffect(() => {
    async function carregarPerfil() {
      try {
        // 💡 CORREÇÃO DO REFERENCE ERROR: Define idUsuario
        const idUsuario = ID_DO_USUARIO_FIXO;
        // Agora a requisição usa o ID
        const resposta = await api.get(`/usuarios/${idUsuario}`);
        const dados = resposta.data;

        setNome(dados.nome || "");
        setEmail(dados.email || "");
        setPreview(dados.imagemUrl || null);

      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    }
    carregarPerfil();
  }, [ID_DO_USUARIO_FIXO]);

  const atualizarImg = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  async function atualizarPerfil(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("email", email);
      if (imagem) formData.append("imagem", imagem);

      // Usa a constante já definida
      const idUsuario = ID_DO_USUARIO_FIXO;
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
        {/* O formulário agora envolve os dois "cards" */}
        <form onSubmit={atualizarPerfil}>

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
                onChange={atualizarImg}
              />
            </div>

            <input
              className="input_perfil"
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Lado direito */}
          <div className="card lado-direito-perfil">

            {/* Você deve ter inputs de email, telefone, etc. aqui, mas não estavam no código postado */}

            <div className="centralizar">
              {/* Mantenho o aoClicar={atualizarPerfil} como no seu original, mas o type="submit" no Botao é o essencial */}
              <Botao nomeBotao="Salvar" aoClicar={atualizarPerfil} tipo="submit" />
            </div>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Perfil;