import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';

import './ListagemChamado.css';

import mais from '../../assets/img/MaisBotao.svg';
import adiciona from '../../assets/img/adicionar.svg';
import transcricao from '../../assets/img/transcricao.png';
import download from '../../assets/img/download.png';

const ListagemChamado = () => {
  const [chamados, setChamados] = useState([]);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [transcricaoSelecionada, setTranscricaoSelecionada] = useState("");

  // Buscar chamados
  useEffect(() => {
    async function buscarChamados() {
      try {
        const resposta = await fetch("http://localhost:5128/api/Chamado");
        const contentType = resposta.headers.get("content-type") || "";

        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}: ${resposta.statusText}`);
        }

        if (!contentType.includes("application/json")) {
          throw new Error(`Resposta da API não é JSON. Tipo recebido: ${contentType}`);
        }

        const dados = await resposta.json();
        setChamados(dados);

      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    buscarChamados();
  }, []);

  if (loading) return <p>🔄 Carregando chamados...</p>;
  if (erro) return <p className="erro">Erro ao carregar chamados: {erro}</p>;

  // Filtro seguro
  const chamadosFiltrados = chamados.filter((c) => {
    const termo = searchTerm.toLowerCase();

    const protocolo = (c.idChamado ?? "").toString().toLowerCase();
    const cliente = (c.cliente?.usuario?.nome ?? "").toLowerCase();
    const status = c.status ? "ativo" : "pendente";

    return (
      protocolo.includes(termo) ||
      cliente.includes(termo) ||
      status.includes(termo)
    );
  });


  // 🔥 ABRIR MODAL + GERAR TRANSCRIÇÃO
  const abrirModal = async (idChamado) => {
    try {
      setTranscricaoSelecionada("Gerando transcrição...");
      setModalAberto(true);

      const resposta = await fetch(
        `http://localhost:5128/api/Chamado/transcricao/${idChamado}`
      );

      if (!resposta.ok) {
        throw new Error("Erro ao gerar a transcrição.");
      }

      const dados = await resposta.json();
      setTranscricaoSelecionada(dados.transcricao);

    } catch (error) {
      console.error(error);
      setTranscricaoSelecionada("Não foi possível gerar a transcrição.");
    }
  };

  return (
    <>
      <Header />

      <BarraPesquisa mostrarFiltros={false} onSearch={setSearchTerm} />

      <section className="layout_grid listagemChamado">

        {/* Botão Adicionar */}
        <div className="img_adiciona">
          <Link to="/chamado" className="botao_adicionar">
            <img src={mais} alt="Mais" />
            <img src={adiciona} alt="Adicionar Chamado" />
          </Link>
        </div>

        {/* Tabela */}
        <div className="tabela_chamados">

          {/* Cabeçalho */}
          <div className="linha header">
            <h3>Protocolo</h3>
            <h3>Cliente</h3>
            <h3>Transcrição</h3>
            <h3>Áudio</h3>
            <h3>Status</h3>
          </div>

          {/* Linhas */}
          {chamadosFiltrados.map((c, index) => (
            <div className="linha" key={c.idChamado}>

              {/* Protocolo */}
              <p>{c.idChamado}</p>

              {/* Cliente */}
              <p>{c.cliente?.usuario?.nome ?? "—"}</p>

              {/* Transcrição */}
              <div className="acao">
                <div onClick={() => abrirModal(c.idChamado)}>
                  <img
                    src={transcricao}
                    alt="Transcrição"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              {/* Áudio */}
              <div className="acao">
                {c.audio ? (
                  <a href={c.audio} download>
                    <img
                      src={download}
                      alt="Baixar áudio"
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                ) : (
                  <p style={{ opacity: 0.5 }}>—</p>
                )}
              </div>

              {/* Status */}
              <p>{c.status ? "✅ Ativo" : "⏳ Pendente"}</p>

            </div>
          ))}

        </div>
      </section>

      {/* MODAL */}
      {modalAberto && (
        <div className="modal_overlay">
          <div className="modal_conteudo">

            <h2 className='titulo_do_modal'>Transcrição do Áudio</h2>

            <p className="texto_transcricao">
              {transcricaoSelecionada || "Nenhuma transcrição disponível."}
            </p>

            <button onClick={() => setModalAberto(false)}>
              Fechar
            </button>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ListagemChamado;
