import React, { useState, useEffect, useRef } from "react";
import Usuario from '../../assets/img/Profile2.png';
import Botao from "../botao/Botao";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import "./Card.css";
import arquiva from "../../assets/img/exibir.svg";

function classificarSentimento(texto) {
  if (!texto || typeof texto !== "string") return "neutro";

  const palavrasPositivas = [
    "bom", "ótimo", "excelente", "gostei", "maravilhoso",
    "perfeito", "legal", "satisfeito", "feliz", "positivo",
    "otimo", "otima", "boa", "adorei", "adoro", "maravilhosa",
    "perfeita", "sensacional", "excelencia", "agradavel", "top",
    "show", "ótimo", "fantastico", "fantastica", "satisfeita",
    "recomendo", "recomendaria", "nota", "maravilha", "ótima"
  ];

  const palavrasNegativas = [
    "ruim", "péssimo", "horrível", "insatisfeito",
    "triste", "problema", "erro", "demora", "lento",
    "negativo", "não gostei", "péssima",
    "pessimo", "horrivel", "terrivel", "terrível", "odiei",
    "odeio", "lixo", "chato", "chata", "insatisfeita",
    "demorou", "atrasado", "atrasada", "problemas", "erros",
    "reclamacao", "reclamação", "ruins", "pessima", "péssimos",
    "pessimos", "horriveis", "horríveis", "insuportavel",
    "insuportável", "odioso", "odiosa", "pessimismo",
    "pessimista", "decepcionado", "decepcionada",
    "ruimissimo", "ruimíssima", "ruimissimo"
  ];

  const lower = texto.toLowerCase();
  let score = 0;
  palavrasPositivas.forEach(p => { if (lower.includes(p)) score++; });
  palavrasNegativas.forEach(n => { if (lower.includes(n)) score--; });

  if (score > 0) return "positivo";
  if (score < 0) return "negativo";
  return "neutro";
}

export default function Card({
  nome,
  texto,
  audio,
  data,
  sentimento: sentimentoProp,
  idChamado,
  onArquivar,
  onOpenModal
}) {
  const [transcricao, setTranscricao] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [sentimento, setSentimento] = useState("neutro");
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString("pt-BR");
  };

  useEffect(() => {
    async function transcrever() {
      let textoParaAvaliar = texto || "";

      if (audio) {
        try {
          setCarregando(true);
          const audioResponse = await fetch(audio);
          const blob = await audioResponse.blob();

          const formData = new FormData();
          formData.append("arquivoAudio", blob, "audio.mp3");

          const resposta = await fetch("http://localhost:5128/api/AzureSpeechServiceClient/transcrever", {
            method: "POST",
            body: formData
          });

          if (!resposta.ok) throw new Error("Erro ao transcrever áudio");

          const textoTranscrito = await resposta.text();
          setTranscricao(textoTranscrito);
          textoParaAvaliar = textoTranscrito;
        } catch (error) {
          setTranscricao("Erro ao transcrever");
          textoParaAvaliar = texto || "Erro ao transcrever";
        } finally {
          setCarregando(false);
        }
      } else {
        setCarregando(false);
      }

      setSentimento(classificarSentimento(textoParaAvaliar));
    }

    transcrever();

  }, [audio, texto]);

  const handleCardClick = () => {
    setClickCount(prev => prev + 1);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    if (clickCount + 1 >= 3) {
      onOpenModal?.();
      setClickCount(0);
    } else {
      clickTimeoutRef.current = setTimeout(() => setClickCount(0), 1000);
    }

  };

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}> <div className="card_top_content"> <div className="card_user_info"> <img className="avatar_user" src={Usuario} alt="Usuário" /> <h3 className="card_name">{nome}</h3> </div>

      <p className="card_text">
        {texto || transcricao || "Nenhuma transcrição disponível."}
      </p>

      <div className="responder_botao">
        <Botao nomeBotao="Responder" />
        <img
          src={arquiva}
          alt="Arquivar"
          className="icone_arquivar"
          onClick={(e) => {
            e.stopPropagation();
            onArquivar?.(idChamado);
          }}
        />
      </div>
    </div>

      <div className="card_footer">
        <span className={`card_tag sentimento-${sentimento?.toLowerCase() || "neutro"}`}>
          {sentimento}
        </span>

        <AudioPlayer
          src={audio}
          onClick={(e) => e.stopPropagation()}
        />

        <span className="card_time">{formatDate(data)}</span>
      </div>
    </div>

  );
}
