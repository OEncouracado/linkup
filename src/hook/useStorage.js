import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { fb } from '../shared/service';

export const useStorage = (path) => {
    const [downloadURL, setDownloadURL] = useState(null);

    useEffect(() => {
        if (!path) return; // Evita uma chamada desnecessária se o caminho não estiver definido

        const imageRef = ref(fb.storage, path); // Cria uma referência para o arquivo no Firebase Storage

        getDownloadURL(imageRef)
            .then((url) => {
                setDownloadURL(url); // Define a URL de download no estado
            })
            .catch((error) => {
                console.error('Erro ao obter URL de download:', error);
                setDownloadURL(null); // Limpa a URL de download em caso de erro
            });
    }, [path]); // Atualiza o hook sempre que o caminho mudar

    return downloadURL; // Retorna a URL de download
};
