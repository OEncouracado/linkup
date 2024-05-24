import React from 'react';
import { fb } from '../shared/service';

function InserirObjetivos() {
    const adicionarObjetivos = async () => {
        try {
            const objetivos = [
                {
                    titulo: "Primeiro Link",
                    descricao: "Adicione seu primeiro link.",
                    imagem: ""
                },
                {
                    titulo: "Cinco Links",
                    descricao: "Adicione um total de cinco links.",
                    imagem: ""
                },
                {
                    titulo: "Dez Links",
                    descricao: "Adicione um total de dez links.",
                    imagem: ""
                },
                {
                    titulo: "Troca de Foto de Perfil",
                    descricao: "Atualize sua foto de perfil.",
                    imagem: ""
                },
                {
                    titulo: "Todas as Metas Inicialmente",
                    descricao: "Complete os quatro objetivos acima (adicionar o primeiro link, adicionar cinco links, adicionar dez links, e atualizar a foto de perfil).",
                    imagem: ""
                }
            ];

            await fb?.firestore.collection('Objetivos').doc('htsim9AD40DTTkCz9FJI').set({ objetivos });

            console.log('Objetivos adicionados com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar objetivos:', error);
        }
    };

    return (
        <button onClick={adicionarObjetivos}>Inserir Objetivos</button>
    );
}

export default InserirObjetivos;
