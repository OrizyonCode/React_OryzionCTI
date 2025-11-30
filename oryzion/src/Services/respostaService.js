import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5128/api/Resposta",
  headers: {
    "Content-Type": "application/json"
  }
});

const listarPorFeedback = (idFeedback) => {
  return api.get(`/chamado/${idFeedback}`);
};

const enviarMensagem = (mensagem) => {
  // Garante que Data seja ISO 8601 e que IDs existam
  const payload = {
    IdFeedback: mensagem.IdFeedback,
    IdUsuario: mensagem.IdUsuario,
    Texto: mensagem.Texto,
    Data: mensagem.Data || new Date().toISOString()
  };

  return api.post("/", payload);
};

export default { listarPorFeedback, enviarMensagem };
