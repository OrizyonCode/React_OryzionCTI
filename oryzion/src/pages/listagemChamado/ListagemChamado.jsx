import { Link } from 'react-router-dom';
import './ListagemChamado.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import mais from '../../assets/img/MaisBotao.svg';
import adiciona from '../../assets/img/adicionar.svg';
import upload from '../../assets/img/Upload.svg';
import edita from '../../assets/img/Editar.svg';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import { useState, useEffect } from 'react';
import ErrorPage from '../error/ErrorPage'; // 🔥 importa a página de erro

const ListagemChamado = () => {
  const [chamados, setChamados] = useState([]);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarChamados() {
      try {
        const resposta = await fetch("http://localhost:5128/api/Chamado");

        const contentType = resposta.headers.get("content-type") || "";

        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}: ${resposta.statusText}`);
        }

        if (!contentType.includes("application/json")) {
          throw new Error(`⚠️ Resposta da API não é JSON. content-type: ${contentType}`);
        }

        const dados = await resposta.json();
        setChamados(dados);
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    buscarChamados();
  }, []);

  if (erro) {
    return <ErrorPage />;
  }

  return (
    <>
      <Header />
      <BarraPesquisa visibilidade="none" />

      <section className='layout_grid listagemChamado'>
        <div className='img_adiciona'>
          <Link to="/chamado" className="botao_adicionar">
            <img src={mais} alt="Mais" />
            <img src={adiciona} alt="Adicionar Chamado" />
          </Link>
        </div>

        {loading ? (
          <p>🔄 Carregando chamados...</p>
        ) : (
          <div className='tabela_chamados'>
            <div className='coluna tabela_header'>
              <h3>Protocolo</h3>
              {chamados.map((c, index) => (
                <p key={c.idChamado || c.id}>
                  {String(index + 1).padStart(5, '0')}
                </p>
              ))}
            </div>

            <div className='coluna tabela_header'>
              <h3>Nome</h3>
              {chamados.map((c, index) => (
                <p key={index}>{c.nome || "—"}</p>
              ))}
            </div>

            <div className='coluna tabela_header'>
              <h3>Resumo</h3>
              {chamados.map((c, index) => (
                <div key={index}>
                  <Link to="/resumo">
                    <img src={mais} alt="Ver resumo" />
                  </Link>
                </div>
              ))}
            </div>

            <div className='coluna tabela_header'>
              <h3>Upload</h3>
              {chamados.map((c, index) => (
                <div key={index}>
                  <label htmlFor={`uploadItem-${index}`}>
                    <img src={upload} alt="Upload" style={{ cursor: 'pointer' }} />
                  </label>
                  <input
                    type="file"
                    id={`uploadItem-${index}`}
                    accept="*"
                    hidden
                  />
                </div>
              ))}
            </div>

            <div className='coluna tabela_header'>
              <h3>Editar</h3>
              {chamados.map((c, index) => (
                <div key={index}>
                  <img src={edita} alt="Editar" />
                </div>
              ))}
            </div>

            <div className='coluna tabela_header'>
              <h3>Status</h3>
              {chamados.map((c, index) => (
                <p key={index}>{c.status ? "✅ Ativo" : "⏳ Pendente"}</p>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default ListagemChamado;
