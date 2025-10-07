import React from 'react'
import './ListaChamado.css'
import Header from '../../components/header/Header'
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa'
import adiciona from '../../assets/img/adicionar.svg'
import mais from '../../assets/img/MaisBotao.svg'
import upload from '../../assets/img/Upload.svg'
import edita from '../../assets/img/Editar.svg'

const ListaChamado = () => {
  return (
    <>
        <Header/>
        
        <BarraPesquisa
        visiNega = "none"
        visiPosi = "none"
        visiNeut = "none"
        visiReso = "none"
        visiPend = "none"
        />

        <section className='layout_grid'>
            <div className='img_adiciona'>
                <img src={mais} alt="" />
                <img src={adiciona} alt="" />
            </div>

            <div className='tabela_chamados'>

              <div className='numero_protocolo'>
                <h3>Protocolo</h3>
                <p>0001</p>
                <p>0002</p>
                <p>0003</p>
              </div>

              <div className='nome_chamdo'>
                <h3>Nome</h3>
                <p>Cti</p>
                <p>Cti</p>
                <p>Cti</p>
              </div>

              <div className='resumo_chamado'>
                <h3>Resumo</h3>
                <img src={mais} alt="" />
                <img src={mais} alt="" />
                <img src={mais} alt="" />
              </div>

              <div className='upload_chamado'> 
                <h3>Upload</h3>
                <img src={upload} alt="" />
                <img src={upload} alt="" />
                <img src={upload} alt="" />
              </div>

              <div className='editar_chamado'>
                <h3>Editar</h3>
                <img src={edita} alt="" />
                <img src={edita} alt="" />
                <img src={edita} alt="" />
              </div>

            </div>

        </section>
    </>
  )
}

export default ListaChamado