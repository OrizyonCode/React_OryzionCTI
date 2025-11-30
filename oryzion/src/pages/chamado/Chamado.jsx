import "./Chamado.css";
import Botao from "../../components/botao/Botao";
import api from "../../Services/services";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "animate.css";
import GravadorAudio from "../../components/gravadorAudio/GravadorAudio";

function Chamado() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("Senai@134");
  const [cnpj, setCnpj] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [statusCadastro, setStatusCadastro] = useState(null);
  const [audioFile, setAudioFile] = useState(null); // File or Blob
  const [isDragging, setIsDragging] = useState(false);

  const [modoRapido, setModoRapido] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [idClienteSelecionado, setIdClienteSelecionado] = useState("");

  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

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

  const alertError = (title = "Erro ao Criar!", text = "Não foi possível criar o chamado. Verifique os dados e tente novamente.") => {
    Swal.fire({
      title,
      text,
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
    if (files && files.length > 0) {
      // Pega o primeiro arquivo
      const f = files[0];
      setAudioFile(f);
    }
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
      api.get("Cliente")
        .then((res) => {
          setClientes(res.data);
        })
        .catch((err) => {
          console.error("Erro ao buscar clientes:", err);
        });
    }
  }, [modoRapido]);

  // Recebe blob WAV do GravadorAudio (o gravador retorna WAV Blob)
  const handleAudioReady = (wavBlob) => {
    // Transformar Blob em File para FormData (opcional, Blob também funciona)
    const file = new File([wavBlob], "gravacao.wav", { type: "audio/wav" });
    setAudioFile(file);
    console.log("Áudio gravado pronto:", file);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setStatusCadastro("Enviando...");

    try {
      let idClienteCriado = idClienteSelecionado;

      // Cadastro normal (quando não for modo rápido)
      if (!modoRapido) {
        // Validações básicas
        if (!nomeCompleto.trim() || !email.trim() || !senha.trim()) {
          alertError("Dados incompletos", "Preencha todos os campos obrigatórios.");
          setStatusCadastro("Preencha todos os campos obrigatórios");
          return;
        }

        const usuario = {
          nome: nomeCompleto,
          email: email,
          senha: senha,
          imagem: "",
          idTipoUsuario: "1A9F077D-E0BA-4EEC-BBBE-8F56166E7DFE",
        };

        // Criar usuário
        try {
          console.log("Enviando usuário:", usuario);
          const resposta = await api.post("Usuario", usuario);
          console.log("Resposta usuário:", resposta.data);
          if (resposta.status !== 201 && resposta.status !== 200) throw new Error("Erro ao criar usuário");
          idClienteCriado = resposta.data.idUsuario;
        } catch (err) {
          console.error("Erro ao criar usuário:", err.response?.data || err.message);
          alertError("Erro ao criar usuário", JSON.stringify(err.response?.data || err.message));
          setStatusCadastro("Erro ao criar usuário");
          return;
        }

        // Criar cliente
        const clienteObj = { idUsuario: idClienteCriado };
        try {
          console.log("Enviando cliente:", clienteObj);
          const resCliente = await api.post("Cliente", clienteObj);
          console.log("Resposta cliente:", resCliente.data);
          if (resCliente.status !== 201 && resCliente.status !== 200) throw new Error("Erro ao criar cliente");
          idClienteCriado = resCliente.data.idCliente;
        } catch (err) {
          console.error("Erro ao criar cliente:", err.response?.data || err.message);
          alertError("Erro ao criar cliente", JSON.stringify(err.response?.data || err.message));
          setStatusCadastro("Erro ao criar cliente");
          return;
        }

        // Criar empresa se CNPJ informado
        if (cnpj.trim() !== "") {
          const empresaObj = {
            nomeFantasia: nomeFantasia || nomeCompleto,
            numeroIdentificador: cnpj.replace(/\D/g, ""),
          };
          try {
            console.log("Enviando empresa:", empresaObj);
            const resEmpresa = await api.post("Empresa", empresaObj);
            console.log("Resposta empresa:", resEmpresa.data);
            if (resEmpresa.status !== 201 && resEmpresa.status !== 200) throw new Error("Erro ao criar empresa");
          } catch (err) {
            console.error("Erro ao criar empresa:", err.response?.data || err.message);
            alertError("Erro ao criar empresa", JSON.stringify(err.response?.data || err.message));
            setStatusCadastro("Erro ao criar empresa");
            return;
          }
        }
      }

      // -------- Criação de chamado (modo rápido ou após cadastro completo) --------
      try {
        if (audioFile && audioFile.size > MAX_SIZE_BYTES) {
          alertError("Arquivo muito grande", "O áudio deve ter no máximo 10MB");
          setStatusCadastro("O áudio deve ter no máximo 10MB");
          return;
        }

        const form = new FormData();
        form.append("Status", true);
        form.append("Data", new Date().toISOString());
        form.append("IdCliente", idClienteCriado);
        form.append("IdSuporte", "34D984CE-6AD9-47FF-86C7-74A12716996A");

        if (audioFile) {
          // audioFile pode ser File ou Blob; se for Blob, o terceiro parâmetro é o filename
          if (audioFile instanceof File) {
            form.append("ArquivoAudio", audioFile, audioFile.name);
          } else {
            form.append("ArquivoAudio", audioFile, "audio.wav");
          }
        }

        console.log("Enviando chamado (FormData):", {
          Status: true,
          Data: new Date().toISOString(),
          IdCliente: idClienteCriado,
          HasAudio: !!audioFile,
        });

        const resChamado = await api.post("Chamado/cadastrar-com-audio", form);
        console.log("Resposta chamado:", resChamado.data);

        if (resChamado.status !== 201 && resChamado.status !== 200) throw new Error("Erro ao criar chamado");

        alertSuccess();
        setStatusCadastro("Chamado criado!");
        // limpa campos úteis
        setAudioFile(null);
        if (!modoRapido) {
          setNomeCompleto("");
          setEmail("");
          setSenha("Senai@134");
          setCnpj("");
          setNomeFantasia("");
        }
      } catch (err) {
        console.error("Erro ao criar chamado:", err.response?.data || err.message);
        alertError("Erro ao criar chamado", JSON.stringify(err.response?.data || err.message));
        setStatusCadastro("Erro ao criar chamado");
        return;
      }
    } catch (err) {
      console.error("Erro desconhecido:", err);
      alertError();
      setStatusCadastro("Erro desconhecido");
    }
  };

  return (
  <div className="container_cadastro">
    <form className="form_cadastro" onSubmit={handleCadastro}>

      <div>
        <button
          type="button"
          className="btn_modo_rapido"
          onClick={() => setModoRapido(!modoRapido)}
        >
          {modoRapido ? "Modo completo" : "Modo rápido"}
        </button>
      </div>

      <h2>Cadastro de Chamado</h2>

      {/* ================= CAMPOS ================= */}
      {!modoRapido && (
        <div className="grid_campos">

          <div className="campo">
            <label>Nome Completo</label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>

          <div className="campo">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="campo">
            <label>Senha</label>
            <div className="campo_senha">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                className="btn_visibilidade"
                onClick={alternarSenha}
              >
                👁
              </button>
            </div>
          </div>

          <div className="campo">
            <label>CNPJ (Opcional)</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="Somente números"
            />
          </div>

          <div className="campo">
            <label>Nome Fantasia (Opcional)</label>
            <input
              type="text"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* ================= MODO RÁPIDO ================= */}
      {modoRapido && (
        <div className="campo">
          <label>Cliente</label>
          <select
            value={idClienteSelecionado}
            onChange={(e) => setIdClienteSelecionado(e.target.value)}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((c) => (
              <option key={c.idCliente} value={c.idCliente}>
                {c.usuario?.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ================= UPLOAD / ÁUDIO ================= */}
      <div className="upload_section">
        <label>Áudio / Gravação</label>

        <div
          className={`upload_area ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label className="upload_label">
            <span className="icone_upload">🎤</span>
            <p>Clique ou arraste o áudio aqui</p>
            <small>Máx 10MB</small>
            <input
              type="file"
              accept="audio/*"
              style={{ display: "none" }}
              onChange={handleInputFileChange}
            />
          </label>
        </div>

        <GravadorAudio onAudioReady={handleAudioReady} />
      </div>

      {/* ================= BOTÃO ================= */}
      <div className="btn_cadastrar">
        <button type="submit">Criar Chamado</button>
      </div>
    </form>
  </div>
);
}
export default Chamado;
