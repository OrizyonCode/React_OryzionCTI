import React, { useState, useEffect } from 'react';
import './Perfil.css';
import api from '../../Services/services';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useAuth } from '../../contexts/AuthContext';

const Perfil = () => {
    const { usuario, setUsuario } = useAuth();
    
    const [formData, setFormData] = useState({
        phone: '',
        cpf: '',
        address: ''
    });
    const [originalData, setOriginalData] = useState({}); 

    // Inicializa a foto pelo token usando a chave 'imagem'
    const [profilePhoto, setProfilePhoto] = useState(usuario?.imagem || null); 

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fullNameFromToken = usuario?.nome || 'Nome Indisponível';
    const emailFromToken = usuario?.email || 'Email Indisponível';
    const idUsuario = usuario?.idUsuario;

    useEffect(() => {
        if (!idUsuario) {
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                // Endpoint para buscar dados detalhados (ex: phone, cpf, address)
                const response = await api.get(`/user/${idUsuario}/profile`); 
                const data = response.data;

                const loadedData = {
                    phone: data.phone || '',
                    cpf: data.cpf || '',
                    address: data.address || ''
                };

                setFormData(loadedData);
                setOriginalData(loadedData);
                
                // Atualiza a foto se a API retornar a chave 'imagem'
                if (data.imagem) {
                    setProfilePhoto(data.imagem);
                }

            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [idUsuario]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Dados a serem enviados para o endpoint de PATCH/PUT
        const dataToUpdate = {
            phone: formData.phone,
            cpf: formData.cpf,
            address: formData.address,
        };

        try {
            // A chamada de API para salvar os dados do formulário
            await api.patch(`/user/${idUsuario}/profile`, dataToUpdate); 
            
            setOriginalData(dataToUpdate); 
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            // Mostrar erro do servidor
            alert(`Erro ao salvar as alterações. Detalhe: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData(originalData);
    };

    // Handlers para a Foto
    const handleUpdatePhoto = () => {
        document.getElementById('photo-upload').click();
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsSubmitting(true);
        const formDataUpload = new FormData();
        // O nome do campo do formulário aqui ('profilePhoto') DEVE corresponder ao que a API C# espera para receber o arquivo.
        formDataUpload.append('profilePhoto', file); 

        try {
            const response = await api.post(`/user/${idUsuario}/photo/upload`, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const newToken = response.data.token; 
            // A API deve retornar a URL final da foto na chave 'imagem'
            const newPhotoUrl = response.data.imagem; 

            if (newToken && newPhotoUrl) {
                // 1. Atualiza o Contexto de Autenticação (e o Header)
                setUsuario(newToken); 
                // 2. Atualiza o estado local para o Perfil
                setProfilePhoto(newPhotoUrl);
                alert('Foto de perfil atualizada com sucesso!');
            } else {
                 throw new Error("API não retornou token ou URL da foto na chave 'imagem'.");
            }

        } catch (error) {
            console.error("Erro ao fazer upload da foto:", error);
            alert("Erro ao enviar a foto. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeletePhoto = async () => {
        if (!profilePhoto) return;
        setIsSubmitting(true);

        try {
            // A API deve retornar um NOVO TOKEN sem a claim da foto
            const response = await api.delete(`/user/${idUsuario}/photo`); 
            
            const newToken = response.data.token;

            if (newToken) {
                setUsuario(newToken);
                setProfilePhoto(null); 
                alert('Foto de perfil removida.');
            } else {
                 throw new Error("API não retornou token após remoção da foto.");
            }
        } catch (error) {
            console.error("Erro ao deletar foto:", error);
            alert("Erro ao remover a foto. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="loading-state">Carregando perfil...</div>;
    }

    if (!usuario) {
        return <div className="error-state">Você precisa estar logado para ver esta página.</div>;
    }

    return (
      <>
        <Header/>

        <div className="perfil-container">
            {/* O cabeçalho foi removido conforme solicitado */}
            
            <div className="perfil-card">
                <section className="perfil-photo-section">
                    <div className="photo-display">
                        <div className="avatar-wrapper">
                            <div className="avatar">
                                {/* Exibe a foto real se houver, caso contrário, o ícone placeholder do CSS */}
                                {profilePhoto ? (
                                    <img src={profilePhoto} alt="Profile" className="profile-img" />
                                ) : (
                                    <span role="img" aria-label="User Icon">👤</span>
                                )}
                            </div>
                            {/* Input de arquivo escondido */}
                            <input 
                                type="file" 
                                id="photo-upload" 
                                hidden 
                                accept="image/*"
                                onChange={handlePhotoChange}
                                disabled={isSubmitting}
                            />
                            <button 
                                className="edit-photo-btn" 
                                onClick={handleUpdatePhoto}
                                disabled={isSubmitting}
                            >
                                <span role="img" aria-label="Editar">✏️</span>
                            </button>
                        </div>
                        <div className="photo-info">
                            <h3>Your Photo</h3>
                            <p>This will be displayed on your profile.</p>
                        </div>
                    </div>
                    <div className="photo-actions">
                        <button 
                            className="delete-btn" 
                            onClick={handleDeletePhoto} 
                            disabled={!profilePhoto || isSubmitting}
                        >
                            Delete
                        </button>
                        <button 
                            className="update-btn" 
                            onClick={handleUpdatePhoto}
                            disabled={isSubmitting}
                        >
                            Update
                        </button>
                    </div>
                </section>

                <hr className="divider" />

                <form className="perfil-form" onSubmit={handleSave}>
                    <div className="form-group">
                        <label htmlFor="fullName">Nome completo</label>
                        <input 
                            type="text" 
                            id="fullName" 
                            value={fullNameFromToken} 
                            readOnly 
                            className="input-field" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={emailFromToken} 
                            readOnly 
                            className="input-field" 
                        />
                    </div>
                    
                    {/* Campos editáveis, usando formData e handleChange */}
                    <div className="form-group">
                        <label htmlFor="phone">Telefone</label>
                        <input 
                            type="text" 
                            id="phone" 
                            value={formData.phone} 
                            onChange={handleChange}
                            className="input-field" 
                            placeholder="(00) 00000-0000"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input 
                            type="text" 
                            id="cpf" 
                            value={formData.cpf} 
                            onChange={handleChange}
                            className="input-field" 
                            placeholder="000.000.000-00"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="address">Endereço</label>
                        <input 
                            type="text" 
                            id="address" 
                            value={formData.address} 
                            onChange={handleChange}
                            className="input-field" 
                            placeholder="123 Main Street, Anytown, USA"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-actions full-width">
                        <button 
                            type="button" 
                            className="cancel-changes-btn" 
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="save-changes-btn" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Salvando...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <Footer/>

      </>     
    );
};

export default Perfil;