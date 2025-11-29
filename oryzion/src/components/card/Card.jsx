import React, { useState, useEffect } from "react";
import Usuario from '../../assets/img/Profile2.png';
import Botao from "../botao/Botao";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import "./Card.css";
import arquiva from "../../assets/img/exibir.svg";

export default function Card({
  nome,
  texto,
  audio,
  data,
  sentimento,
  idChamado,
  onArquivar,
  onOpenModal
}) {

  const [transcricao, setTranscricao] = useState("");
  const [carregando, setCarregando] = useState(true);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString("pt-BR");
  };

  useEffect(() => {
    async function transcrever() {
      if (!audio) {
        setCarregando(false);
        return;
      }

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

      } catch (error) {
        setTranscricao("Erro ao transcrever");
      } finally {
        setCarregando(false);
      }
    }

    transcrever();
  }, [audio]);

  return (
    <div
  className="card"
  onClick={() => onOpenModal()}   // AGORA FUNCIONA
  style={{ cursor: "pointer" }}
>

      <div className="card_top_content">

        <div className="card_user_info">
          <img className="avatar_user" src={Usuario} alt="Usuário" />
          <h3 className="card_name">{nome}</h3>
        </div>

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
              onArquivar?.(idChamado);  // 🔥 evita erro
            }}
          />
        </div>
      </div>

      <div className="card_footer">
        <span className="card_tag">
          {sentimento || "Neutro"}
        </span>

        <AudioPlayer src={audio} />

        <span className="card_time">{formatDate(data)}</span>
      </div>
    </div>
  );
}
