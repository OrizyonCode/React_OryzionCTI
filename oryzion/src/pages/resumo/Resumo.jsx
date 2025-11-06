import React, { useState } from "react";
import Voltar from "../../components/voltar/Voltar";
import api from "../../Services/services";
import Swal from "sweetalert2";
import "./Resumo.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Resumo = () => {
  const [resumo, setResumo] = useState([]);

  // Função de voltar
  const handleVoltar = () => {
    window.history.back(); 
  };

  // // Função que busca o resumo na API
  // async function listarResumo() {
  //   try {
  //     const resposta = await api.get("Resumo");
  //     setResumo(resposta.data);
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire("Erro", "Não foi possível carregar o resumo.", "error");
  //   }
  // }

  // // Chama a função ao carregar o componente
  // useEffect(() => {
  //   listarResumo();
  // }, []);

 
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <section className="container-resumo" style={{ flex: 1 }}>
        <div className="modal-resumo">
          <div className="voltar">
            <Voltar acaoDeVoltar={handleVoltar} />
          </div>

          <h2 className="titulo-resumo">Resumo 0001</h2>

          {resumo && resumo.length > 0 ? (
            resumo.map((item, index) => (
              <div key={index} className="caixa-texto">
                <p>{item.descricao}</p>
              </div>
            ))
          ) : (
            <p>Nada encontrado</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resumo;
