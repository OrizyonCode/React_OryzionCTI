import React, { useState } from 'react';
import './CadastroEquipe.css';
import Botao from '../../components/botao/Botao';
import api from "../../Services/services";
import Swal from "sweetalert2";

const CadastroEquipe = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [idTipoUsuario, setIdTipoUsuario] = useState("501f4974-0473-4d39-9b9f-1e5be73f50ed")
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");


  async function cadastro(e) {
    e.preventDefault(); 

    const usuario = { nome, email, senha, cpf, telefone, idTipoUsuario };

    try {
      const resposta = await api.post("Usuario", usuario);
      alertar("error", "Nome, Email ou senha inválidos!");
      

      if (resposta.status == 200) {
        alertar("success", "Cadastro realizado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setCpf("")
        setTelefone("")
        setIdTipoUsuario("501f4974-0473-4d39-9b9f-1e5be73f50ed")

      } else {
        alertar("success", "Cadastrado com sucesso");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alertar("error", "Erro ao fazer o cadastro. Verifique suas credenciais!");
      console.log(usuario.nome);
      console.log(usuario.email);
      console.log(usuario.senha);
      console.log(usuario.cpf);
      console.log(usuario.telefone);
      console.log(usuario.idTipoUsuario);
      
      
    }
  }

  function alertar(icon, msg) {
    Swal.fire({
      icon,
      text: msg,
      confirmButtonColor: "#3085d6",
    });
  }

  return (
    <div className="todoOCadastroEquipe">
      <div className="paraCentralizar">
        <div className="borda">
          <div className="borda_para_os_simbolos">
            <form onSubmit={cadastro}>
              <div className="titulo_2">
                <h1>Cadastro</h1>
                <h5>Equipe</h5>
              </div>

              <label>Nome</label>
              <input
                className='input_cadastro_equipe'
                type="text"
                placeholder='Digite seu nome completo'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <label>Email</label>
              <input
                className='input_cadastro_equipe'
                type="email"
                placeholder='Digite seu e-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Senha</label>
              <input
                className='input_cadastro_equipe'
                type="password"
                placeholder='Digite sua senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <label>Telefone</label>
              <input
                className='input_cadastro_equipe'
                type="fone"
                placeholder='(11) 981234-5677)'
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}   
                required
              />
              <label>CPF</label>
              <input
                className='input_cadastro_equipe'
                type="cpf"
                placeholder='000.000.000-00'
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
              

              

              <div className="espacamento"></div>

              <div className="botao">
                <Botao nomeBotao="Cadastrar" tipo="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroEquipe;
