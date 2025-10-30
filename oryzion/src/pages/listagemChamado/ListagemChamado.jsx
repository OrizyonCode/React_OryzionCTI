import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListagemChamado.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import mais from '../../assets/img/MaisBotao.svg';
import adiciona from '../../assets/img/adicionar.svg';
import upload from '../../assets/img/Upload.svg';
import edita from '../../assets/img/Editar.svg';

const ListagemChamado = () => {
const [listagemChamado, setListagemChamado] = useEffect([]);

  const chamados = [
    { protocolo: '0001', nome: 'Cti' },
    { protocolo: '0002', nome: 'Cti' },
    { protocolo: '0003', nome: 'Cti' },
    { protocolo: '0004', nome: 'Cti' },
    { protocolo: '0005', nome: 'Cti' },
  ];

       useEffect(()=>{
        listagemChamado();
      }, [])

  return (
    <>
      <Header />
      <section className='layout_grid listagemChamado'>
        <div className='img_adiciona'>
          <Link to="/chamado" className="botao_adicionar">
            <img src={mais} alt="Mais" />
            <img src={adiciona} alt="Adicionar Chamado" />
          </Link>
        </div>

        <div className='tabela_chamados'>
          <div className='coluna tabela_header'>
            <h3>Protocolo</h3>
            {chamados.map((c) => <p key={c.protocolo}>{c.protocolo}</p>)}
          </div>
          <div className='coluna tabela_header'>
            <h3>Nome</h3>
            {chamados.map((c, index) => <p key={index}>{c.nome}</p>)}
          </div>
          <div className='coluna tabela_header'>
            <h3>Resumo</h3>
            {chamados.map((c, index) => (
              <div key={index}><Link to="/resumo"><img src={mais} alt="Ver resumo" /></Link></div>
            ))}
          </div>

          {/* foi o anterior */}

          {/* <div className='coluna tabela_header'>
            <h3>Upload</h3>
            {chamados.map((c, index) => (
              <div key={index}><img src={upload} alt="Upload" /></div>
            ))}
          </div> */}

          {/* aqui eu tenho apenas um provisório, para uma melhor apresentação, mas depois com o consumo da API, nós vamos alterar */}

          <div className='coluna tabela_header'>
            <h3>Upload</h3>
            {chamados.map((c, index) => (
              <div key={index}>
                <label htmlFor={`uploadItem-${index}`}>
                  <img
                    src={upload}
                    alt="Upload"
                    style={{ cursor: 'pointer' }}
                  />
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
              <div key={index}><img src={edita} alt="Editar" /></div>
            ))}
          </div>

          <div className='coluna tabela_header'>
            <h3>Status</h3>
            {chamados.map((c, index) => (
          //     <div key={index}>{status === "Concluído" ? (
          // <span>✅ Concluído</span>
          //   ) : (
          //   <span>⏳ Pendente</span>
          //   )}</div>
          <div key={index}><img src={edita} alt="Editar" /></div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ListagemChamado;
