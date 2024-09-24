import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { TelaLoading } from '../../Components/Loading';
import { useAuth, UserInfo } from '../../hook';
import AdminDashboard from '../../Components/Admin/painel';
import NotAuthorized from './notAuthorized';

function AdminPage() {
    const { isAuthed, authUser } = useAuth();
    const id = authUser?.uid;
    const infoArray = UserInfo(id);
    const stats = infoArray && infoArray[0];


    // Estado para controlar se a verificação do admin foi feita
    const [isLoading, setIsLoading] = useState(true);

    // useEffect para verificar quando o estado admin foi carregado
    useEffect(() => {
        // Verifica se os dados do usuário estão carregados
        if (authUser !== undefined && stats !== undefined) {
            setIsLoading(false); // Quando tiver certeza que carregou, encerra o loading
        }
    }, [authUser, stats]);

    // Se está carregando, mostra a tela de loading
    if (isLoading) {
        return <TelaLoading />;
    }

    // Verifica se o usuário está autenticado e é admin
    if (!isAuthed) {
        return <Navigate to="/Login" />;
    }

    if (!stats?.isAdmin) {
        return (
            <NotAuthorized />
        ); // Redireciona se o usuário não for admin
    }

    // Se passar todas as verificações, exibe o conteúdo da página de admin
    return (
        <AdminDashboard />
    );
}

export default AdminPage;
