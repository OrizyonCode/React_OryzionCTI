import "./Chamado.css";
import Botao from "../../components/botao/Botao";
import api from "../../Services/services";
import React, { useState } from "react";

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

    let idUsuarioCriado = null;

    try {
      // 1️⃣ CADASTRA O USUÁRIO
      const novoUsuario = {
        nome: nomeCompleto,
        email: email,
        senha: senha,
        idTipoUsuario: "82951b0c-a10d-4cbe-9fcf-0a5b9a970df2" 
      };

      const resUsuario = await api.post("Usuario", novoUsuario);
      if (resUsuario.status !== 201) {
        // Se o backend retornar um 400 ou outro erro, o catch será acionado. 
        // Esta linha é para garantir que a execução não continue se o status for inesperado.
        throw new Error("Erro ao cadastrar usuário"); 
      }

      idUsuarioCriado = resUsuario.data.idUsuario; // Supondo que o ID venha nesta propriedade

      // 2️⃣ SE TIVER CNPJ, CADASTRA A EMPRESA
      if (cnpj.trim() !== "") {
        const novaEmpresa = {
          nomeFantasia: nomeCompleto, // ou outro campo
          numeroIdentificador: cnpj
        };

        // Não precisa de await aqui se não for dependência crítica para o Chamado
        await api.post("Empresa", novaEmpresa);
      }

      // 3️⃣ CADASTRA O CHAMADO COM ÁUDIO (CORRIGIDO PARA O ERRO 405)
      
      // Cria o objeto FormData para enviar multipart/form-data
      const dataChamado = new FormData();
      
      // Anexa os campos do DTO do backend (ChamadoDTO)
      dataChamado.append('Status', true); 
      // O backend espera a data como string no formato ISO
      dataChamado.append('Data', new Date().toISOString()); 
      dataChamado.append('IdCliente', idUsuarioCriado);
      dataChamado.append('IdSuporte', "bf4dcc04-d76b-40d0-946d-90f1e096bec3"); 
      
      // Anexa o arquivo de áudio se ele existir. O nome do campo deve ser 'ArquivoAudio'
      if (audioFile) {
        dataChamado.append('ArquivoAudio', audioFile); 
      }

      // CORREÇÃO DA ROTA: Chama o endpoint específico que aceita o upload de áudio e FormData
      const resChamado = await api.post("Chamado/cadastrar-com-audio", dataChamado, {
          // O Axios geralmente define automaticamente o header 'multipart/form-data' ao enviar FormData,
          // mas você pode ser explícito se tiver problemas.
          // headers: { 'Content-Type': 'multipart/form-data' } 
      });

      if (resChamado.status === 201) {
        setStatusCadastro("✅ CHAMADO CRIADO COM SUCESSO!");
      }

    } catch (error) {
      console.error("Erro no cadastro:", error);
      
      let mensagemErro = "❌ ERRO AO CADASTRAR. Verifique a conexão e o console.";
      
      // Tenta pegar a mensagem de erro da resposta do backend
      if (error.response && error.response.data) {
          // O backend retorna um JSON com { mensagem: "..." }
          if (error.response.data.mensagem) {
            mensagemErro = `❌ ERRO: ${error.response.data.mensagem}`;
          // Se for o erro 405 original ou outro erro de rede
          } else if (error.response.status === 405) {
             mensagemErro = "❌ ERRO 405: Método não permitido. Verifique a rota da API.";
          }
      }
      
      setStatusCadastro(mensagemErro);
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
        <div className="btn_cadastrar">
          <Botao nomeBotao="Cadastrar" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Chamado;