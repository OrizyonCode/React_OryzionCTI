import Header from '../../components/header/Header'
import campo_um from '../../assets/img/campo_um.svg'
import campo_dois from '../../assets/img/campo_dois.svg'
import './TelaInicial.css'
import Footer from '../../components/footer/Footer'
import { useNavigate } from "react-router";
import { useEffect, useState } from 'react'
import { userDecodeToken } from "../../auth/Auth"; // 👈 importa o decode

const TelaInicial = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token do localStorage:", token);
    if (token) {
      const user = userDecodeToken(token);
      console.log("Token decodificado:", user);
      setNome(user.nome);
    } else {
      console.log("Nenhum token encontrado");
    }
  }, []);

  return (
    <>
      <Header />

      <main className="tela-inicial">
        <section className="titulo">
          <h1>Olá, {nome || "Usuário"}</h1>
          <p>Acesse as páginas de Chamados e Feedbacks clicando em um dos campos abaixo.</p>
        </section>

        <section className="fundo">
          <div className="campos">
            <div
              className="card_telaInicial acesso"
              onClick={() => navigate("/listagemchamado")}
            >
              <img src={campo_um} alt="Lista de Chamados" />
              <div className="overlay">
                <span>Lista de Chamados</span>
              </div>
            </div>

            <div
              className="card_telaInicial acesso"
              onClick={() => navigate("/listagemfeedback")}
            >
              <img src={campo_dois} alt="Listagem de Feedbacks" />
              <div className="overlay">
                <span>Lista de Feedbacks</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default TelaInicial;
