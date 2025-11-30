import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from '../../assets/img/Profile2.png';
import AudioPlayer from "../audioPlayer/AudioPlayer";
import "./Card.css";
import arquiva from "../../assets/img/exibir.svg";

function classificarSentimento(texto) {
  if (!texto || typeof texto !== "string") return "neutro";

  const positivas = ["bom", "ótimo", "excelente", "gostei", "maravilhoso", "perfeito", "legal", "satisfeito", "feliz", "positivo", "boa", "adorei", "top", "show"];
  const negativas = ["ruim", "péssimo", "horrível", "insatisfeito", "triste", "problema", "erro", "demora", "lento", "odiei", "odeio", "lixo", "chato"];

  const lower = texto.toLowerCase();
  let score = 0;

  positivas.forEach(p => lower.includes(p) && score++);
  negativas.forEach(n => lower.includes(n) && score--);

  if (score > 0) return "positivo";
  if (score < 0) return "negativo";
  return "neutro";
}

export default function Card({
  nome,
  texto,
  audio,
  data,
  idChamado,
  onArquivar,
  onOpenModal
}) {
  const [transcricao, setTranscricao] = useState("");
  const [sentimento, setSentimento] = useState("neutro");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function transcrever() {
      let textoBase = texto || "";

      if (!audio) {
        setSentimento(classificarSentimento(textoBase));
        return;
      }

      try {
        setCarregando(true);

        const audioResponse = await fetch(audio);
        const blob = await audioResponse.blob();

        const formData = new FormData();
        formData.append("arquivoAudio", blob, "audio.wav");

        const resposta = await fetch("http://localhost:5128/api/AzureSpeechServiceClient/transcrever", {
          method: "POST",
          body: formData
        });

        if (!resposta.ok) throw new Error("Falha na transcrição");

        const text = await resposta.text();
        setTranscricao(text);
        textoBase = text;
      } catch {
        setTranscricao("Erro ao transcrever áudio");
      } finally {
        setCarregando(false);
      }

      setSentimento(classificarSentimento(textoBase));
    }

    transcrever();
  }, [audio, texto]);

  const formatDate = (d) => new Date(d).toLocaleString("pt-BR");

  return (
    <div className="card">
      <div className="card_top_content">
        <div className="card_user_info">
          <img className="avatar_user" src={Usuario} />
          <h3 className="card_name">{nome}</h3>
        </div>

        <p className="card_text">
          {carregando ? "Transcrevendo..." : (texto || transcricao || "Nenhuma transcrição disponível.")}
        </p>

        <div className="responder_botao">
          <button
            className="btn_responder"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/chat/${idChamado}`, {
                state: {
                  chamado: {
                    idFeedback: idChamado,
                    nome,
                    texto: texto || transcricao,
                    audio,
                    data,
                    sentimento,
                  },
                },
              });
            }}
          >
            Responder
          </button>

          <img
            src={arquiva}
            className="icone_arquivar"
            onClick={(e) => {
              e.stopPropagation();
              onArquivar?.(idChamado);
            }}
          />
        </div>
      </div>

      <div className="card_footer">
        <span className={`card_tag sentimento-${sentimento}`}>{sentimento}</span>
        <AudioPlayer src={audio} />
        <span className="card_time">{formatDate(data)}</span>
      </div>
    </div>
  );
}
