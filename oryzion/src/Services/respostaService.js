import axios from "axios";

const API_URL = "https://localhost:7162/api/resposta";

export default {
  
  listarPorFeedback: (idFeedback) => {
    return axios.get(`${API_URL}/feedback/${idFeedback}`);
  },

  enviar: (mensagem) => {
    return axios.post(API_URL, mensagem);
  }

};