import "./Chamado.css";
import Botao from "../../components/botao/Botao";
import api from "../../Services/services";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "animate.css";

function Chamado() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("Senai@134");
  const [cnpj, setCnpj] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [statusCadastro, setStatusCadastro] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Modo rápido
  const [modoRapido, setModoRapido] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [idClienteSelecionado, setIdClienteSelecionado] = useState("");

  // ------------------ ALERTS ------------------

  const alertSuccess = () => {
    Swal.fire({
      title: "Chamado Criado!",
      text: "Seu chamado foi registrado com sucesso!",
      icon: "success",
      background: "#0d0d0d",
      color: "#fff",
      iconColor: "#313D65",
      confirmButtonColor: "#313D65",
      confirmButtonText: "Fechar",
      showClass: {
        popup: `animate__animated animate__fadeInDown animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutUp animate__faster`,
      },
    });
  };

  const alertError = () => {
    Swal.fire({
      title: "Erro ao Criar!",
      text: "Não foi possível criar o chamado. Verifique os dados e tente novamente.",
      icon: "error",
      background: "#0d0d0d",
      color: "#fff",
      width: "40rem",
      padding: "2.5rem",
      iconColor: "#ff4b4b",
      confirmButtonColor: "#ff4b4b",
      confirmButtonText: "Tentar Novamente",
      backdrop: `rgba(0,0,0,0.85) center top no-repeat`,
      showClass: {
        popup: `animate__animated animate__zoomIn animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__zoomOut animate__faster`,
      },
    });
  };

  const alternarSenha = () => setMostrarSenha(!mostrarSenha);

  const handleFileChange = (files) => {
    if (files && files.length > 0) setAudioFile(files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleInputFileChange = (e) => handleFileChange(e.target.files);

  // ------------------ API ------------------

  useEffect(() => {
    if (modoRapido) {
      api.get("Cliente").then((res) => {
        setClientes(res.data);
      }).catch((err) => console.log(err));
    }
  }, [modoRapido]);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setStatusCadastro("Enviando...");

    try {
      let idClienteCriado = idClienteSelecionado;

      if (!modoRapido) {
        // Cadastro normal
        const usuario = {
          nome: nomeCompleto,
          email: email,
          senha: senha,
          imagem: "",
          idTipoUsuario: "0C741803-1334-4D72-8D87-7410AA2E051C"
        };

        const resposta = await api.post("Usuario", usuario);
        if (resposta.status !== 201) throw new Error();

        const idUsuarioCriado = resposta.data.idUsuario;

        const clienteObj = { idUsuario: idUsuarioCriado };
        const resCliente = await api.post("Cliente", clienteObj);
        if (resCliente.status !== 201) throw new Error();

        idClienteCriado = resCliente.data.idCliente;

        if (cnpj.trim() !== "") {
          const empresaObj = {
            nomeFantasia: nomeFantasia || nomeCompleto,
            numeroIdentificador: cnpj.replace(/\D/g, "")
          };
          const resEmpresa = await api.post("Empresa", empresaObj);
          if (resEmpresa.status !== 201) throw new Error();
        }
      }

      const form = new FormData();
      form.append("Status", true);
      form.append("Data", new Date().toISOString());
      form.append("IdCliente", idClienteCriado);
      form.append("IdSuporte", "E588F264-C23C-4F9E-B676-4C02311CD231");
      if (audioFile) form.append("ArquivoAudio", audioFile);

      const resChamado = await api.post("Chamado/cadastrar-com-audio", form);
      if (resChamado.status !== 201) throw new Error();

      alertSuccess();
      setStatusCadastro("Chamado criado!");
    } catch (error) {
      alertError();
      setStatusCadastro("Erro ao cadastrar chamado");
    }
  };

  return (
    <div className="container_cadastro">
      <form className="form_cadastro" onSubmit={handleCadastro}>
        <h2>Cadastro de Chamado</h2>

        {/* Botãozinho de modo rápido */}
        <div style={{ textAlign: 'right', marginBottom: '15px' }}>
          <button
            type="button"
            className="btn_modo_rapido"
            onClick={() => setModoRapido(!modoRapido)}
          >
            {modoRapido ? "Voltar para cadastro completo" : "Chamado rápido"}
          </button>
        </div>

        {modoRapido ? (
          <div className="grid_campos">
            <div className="campo">
              <label>Cliente</label>
              <select
                value={idClienteSelecionado}
                onChange={(e) => setIdClienteSelecionado(e.target.value)}
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((c) => (
                  <option key={c.idCliente} value={c.idCliente}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label>Upload de áudio</label>
              <input
                type="file"
                accept=".mp3,.wav,.m4a"
                onChange={handleInputFileChange}
              />
            </div>
          </div>
        ) : (
          <div className="grid_campos">
            <div className="campo">
              <label>Nome completo</label>
              <input
                type="text"
                placeholder="Insira seu nome completo"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                required
              />
            </div>

            <div className="campo">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="campo">
              <label>Senha Padrão</label>
              <div className="campo_senha">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button type="button" className="btn_visibilidade" onClick={alternarSenha}>
                  {mostrarSenha ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="campo">
              <label>CNPJ (opcional)</label>
              <input
                type="text"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nome Fantasia"
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
              />
            </div>

            <div className="upload_section">
              <label>Upload de áudio</label>
              <div
                className={`upload_area ${isDragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".mp3,.wav,.m4a"
                  id="audioUpload"
                  hidden
                  onChange={handleInputFileChange}
                />
                <label htmlFor="audioUpload" className="upload_label">
                  <span className="icone_upload">📤</span>
                  {audioFile ? (
                    <p>
                      <strong>Arquivo Selecionado:</strong><br />
                      <small>
                        {audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                      </small>
                    </p>
                  ) : (
                    <p>
                      <strong>Clique ou arraste um áudio</strong><br />
                      <small>WAV, MP3 ou M4A (MAX. 10MB)</small>
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="btn_cadastrar">
          <Botao nomeBotao="Cadastrar" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Chamado;
