import React, { useState } from "react";
import "./Chamado.css";
import Botao from "../../components/botao/Botao";
import api from "../../Services/services";

function Chamado() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Estados do formulário
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("Senai@134"); 
  const [cnpj, setCnpj] = useState(""); // ⚠ CNPJ opcional
  const [statusCadastro, setStatusCadastro] = useState(null);

  // Upload de áudio
  const [audioFile, setAudioFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const alternarSenha = () => setMostrarSenha(!mostrarSenha);

  // Upload do arquivo
  const handleFileChange = (files) => {
    if (files && files.length > 0) {
      setAudioFile(files[0]);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleInputFileChange = (e) => handleFileChange(e.target.files);

  // -------------- CADASTRAR ---------------------  
  const handleCadastro = async (e) => {
    e.preventDefault();
    setStatusCadastro("Enviando dados...");

    try {
      const novoUsuario = {
        nome: nomeCompleto,
        email: email,
        senha: senha,
        idTipoUsuario: "82951b0c-a10d-4cbe-9fcf-0a5b9a970df2" 
      };

      const resUsuario = await api.post("Usuario", novoUsuario);
      if (resUsuario.status !== 201) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const idUsuarioCriado = resUsuario.data.idUsuario; // vem do backend

      // 2️⃣ SE TIVER CNPJ, CADASTRA A EMPRESA
      if (cnpj.trim() !== "") {
        const novaEmpresa = {
          nomeFantasia: nomeCompleto, // ou outro campo
          numeroIdentificador: cnpj
        };

        await api.post("Empresa", novaEmpresa);
      }

      // 3️⃣ CADASTRA O CHAMADO
      const novoChamado = {
        status: true,
        data: new Date().toISOString(),
        idCliente: idUsuarioCriado,
        idSuporte: "bf4dcc04-d76b-40d0-946d-90f1e096bec3", // pegar via contexto/login
        audio: null // futuramente, será pelo FormData
      };

      const resChamado = await api.post("Chamado", novoChamado);
      if (resChamado.status === 201) {
        setStatusCadastro("✅ CHAMADO CRIADO COM SUCESSO!");
      }

    } catch (error) {
      console.error("Erro no cadastro:", error);
      setStatusCadastro("❌ ERRO AO CADASTRAR. Veja o console.");
    }
  };

  // -------------------------------------------------
  return (
    <div className="container_cadastro">
      <form className="form_cadastro" onSubmit={handleCadastro}>
        <h2>Cadastro de Chamado</h2>

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
                {mostrarSenha ? '🙈' : '👁️'}
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
          </div>
        </div>

        {/* UPLOAD DE ÁUDIO */}
        <div className="upload_section">
          <label>Upload de áudio</label>
          <div 
            className={`upload_area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file"
              accept=".mp3,.wav,.m4a"
              id="audioUpload" hidden
              onChange={handleInputFileChange}
            />
            
            <label htmlFor="audioUpload" className="upload_label">
              <span className="icone_upload">📤</span>
              {audioFile ? (
                <p>
                  <strong>Arquivo Selecionado:</strong><br />
                  <small>{audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)</small>
                </p>
              ) : (
                <p><strong>Clique ou arraste um áudio</strong><br /><small>WAV, MP3 ou M4A (MAX. 10MB)</small></p>
              )}
            </label>
          </div>
        </div>

        {statusCadastro && (
          <div style={{ padding: 10, marginTop: 10, fontWeight: 'bold', color: statusCadastro.includes('❌') ? 'red' : 'green' }}>
            {statusCadastro}
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