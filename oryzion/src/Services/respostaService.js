import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5128/api/resposta",
});

export default {
  listarporFeedback(idFeedback) {
    return api.get(`/feedback/${idFeedback}`);
  },

  enviarMensagem(msg) {
    return api.post("/enviar", msg);
  },
};