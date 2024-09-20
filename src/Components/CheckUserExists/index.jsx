import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fb } from "../../shared/service";
import Pagina from "../../pages/Pagina";
import NotFound from "../../pages/404";

const CheckUserExists = () => {
    const { usuario } = useParams();
    const [userExists, setUserExists] = useState(null);

    useEffect(() => {
        const checkUserInCollection = async () => {
            try {
                // Acessa o documento específico no Firestore
                const docRef = fb?.firestore.collection("linkUserNames").doc("sHG2pavwu4O22AWIw0mU");
                const docSnap = await docRef.get();

                if (docSnap.exists) {
                    const data = docSnap.data();
                    // Verifica se o nome de usuário está no array linkUserNames
                    if (data.linkUserNames && data.linkUserNames.includes(usuario)) {
                        setUserExists(true);
                    } else {
                        setUserExists(false);
                    }
                } else {
                    setUserExists(false);
                }
            } catch (error) {
                console.error("Erro ao buscar o nome de usuário:", error);
                setUserExists(false);
            }
        };

        checkUserInCollection();
    }, [usuario]);

    // Mostra loading enquanto verifica se o usuário existe
    if (userExists === null) {
        return <div>Loading...</div>;
    }

    // Se o usuário existe, renderiza a página, senão, redireciona para 404
    return userExists ? <Pagina /> : <NotFound />;
};

export default CheckUserExists;
