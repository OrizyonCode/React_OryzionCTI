export default function Modal({ onClose }) {
  return (
    // ...
    <div className="modal-botao" onClick={onClose}>
      <div
        className="modal-conteudo"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          {/* O caminho é absoluto, a partir da pasta 'public' */}
          <img src="/img/Usuario.svg" alt="Usuário" /> 
          <h2>Suporte</h2>
        </div>
        {/* ... */}
      </div>
    </div>
  );
}