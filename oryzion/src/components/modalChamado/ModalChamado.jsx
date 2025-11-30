import "./ModalChamado.css";
import { useNavigate } from "react-router-dom";


export default function ModalChamado({ chamado, idChamado, onClose, onArquivar, sentimentoCalculado }) {

  const navigate = useNavigate();

  // se não tiver dados, não renderiza
  if (!chamado && !idChamado) return null;

  function formatarData(dataStr) {
    if (!dataStr) return "Data inválida";
    const data = new Date(dataStr);
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // id efetivo do chamado (prioriza idChamado recebido, senão tenta o do objeto)
  const chamadoIdEfetivo = idChamado ?? chamado?.idChamado;

  // 🎯 CORREÇÃO: Usa o sentimento calculado do Card (se existir) ou o do objeto
  const sentimentoBase = chamado?.sentimento || chamado?.classificacao || "Neutro";
  const sentimentoAtual = (sentimentoCalculado || sentimentoBase).toLowerCase();


  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>

        <div className="modal_header">
          <h2>Detalhes do Feedback</h2>
          <button className="modal_close" onClick={onClose}>×</button>
        </div>

        <div className="modal_content">
          <div className="modal_user_info">
            <div className="modal_avatar">👤</div>

            <div className="modal_user_texts">
              <h3>{chamado?.cliente?.usuario?.nome ?? "Usuário"}</h3>

              {/* Data formatada (tenta chamado.data) */}
              <span className="modal_data">{formatarData(chamado?.data)}</span>
            </div>

            {/* 🎯 BADGE DE SENTIMENTO ATUALIZADO 🎯 */}
            <span className={`modal_status sentimento-${sentimentoAtual}`}>
              {sentimentoAtual === "positivo" && "😊 Positivo"}
              {sentimentoAtual === "negativo" && "😠 Negativo"}
              {sentimentoAtual === "neutro" && "😐 Neutro"}
            </span>
          </div>

          <div className="modal_msg_box">
            <h4>Mensagem</h4>
            <p>{chamado?.transcricao || "Sem mensagem disponível."}</p>
          </div>

          {(!chamado?.transcricao || chamado?.transcricao === "Erro ao transcrever") && (
            <p className="modal_info">
              Esta mensagem foi originada de um erro na transcrição de áudio.
            </p>
          )}
        </div>

        <div className="modal_footer">
          <button
            className="btn_resolvido"
            onClick={(e) => {
              e.stopPropagation();
              // chama onArquivar com o id efetivo (se houver)
              onArquivar?.(chamadoIdEfetivo);
              onClose?.();
            }}
          >
            Marcar como resolvido
          </button>

          <button
            className="btn_responder"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/chat/${chamadoIdEfetivo}`, {
                state: {
                  chamado: chamado, // envia o objeto completo
                },
              });
            }}
          >
            ↩ Responder
          </button>

        </div>
      </div>
    </div>
  );
}