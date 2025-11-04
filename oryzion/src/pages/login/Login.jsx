import './Login.css';
import Botao from '../../components/botao/Botao';
import api from '../../Services/services';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { userDecodeToken } from "../../auth/Auth";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";

const Login = () => {
  const [login, setLogin] = useState(""); // ✅ corrigido: era useEffect
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();
  const { setUsuario } = useAuth();

  // Função para exibir alertas com SweetAlert2
  function alertar(icone, mensagem) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({ icon: icone, title: mensagem });
  }

  // Função principal de login
  async function realizarAutenticacao(e) {
    e.preventDefault();

    try {
      const usuario = { email, senha };

      if (!email.trim() || !senha.trim()) {
        alertar("error", "Preencha todos os campos!");
        return;
      }

      const resposta = await api.post("Login", usuario);
      const token = resposta.data.token;

      if (token) {
        const tokenDecodificado = userDecodeToken(token);
        console.log("Token decodificado:", tokenDecodificado);

        // Salva o usuário no contexto e no armazenamento local
        setUsuario(tokenDecodificado);
        secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

        // Redireciona conforme o tipo de usuário
        switch (tokenDecodificado.tipoUsuario) {
          case "cliente":
            navigate("/chat");
            break;
          case "equipe de suporte":
            navigate("/telainicial");
            break;
          case "superior":
            navigate("/dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        alertar("error", "Resposta inválida do servidor.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alertar("error", "Email ou senha inválidos!");
    }
  }

  useEffect(() => {
    
  }, []);

  return (
    <div className="todoOLoginCliente">
      <div className="paraCentralizar">
        <div className="borda">
          <div className="borda_para_os_simbolos">
            <form onSubmit={realizarAutenticacao}>
              <div className="titulo_4">
                <h1>Login</h1>
              </div>

              <label>Email</label>
              <input
                className="input_login_cliente"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Senha</label>
              <input
                className="input_login_cliente"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <div className="espacamento"></div>
              <div className="botao">
                <Botao nomeBotao="Entrar" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;