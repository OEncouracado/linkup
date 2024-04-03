import React, { useState } from 'react'
import moldura from "../../Images/molduras/moldura.png";
import moldurabronze from "../../Images/molduras/moldurabronze.png";
import semMoldura from "../../Images/vazio.png";
import { useEffect, useMemo } from 'react';
import { UserInfo, useAuth } from '../../hook';
import DashboardMoldura from '../Dashboard/DashboardMoldura';

function Frames() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const stats = userArray && userArray[0];
    const molduraAtual = stats?.moldura;
    const userMoldura = useMemo(
        () => ({
            id: 5000,
            src: molduraAtual,
            nome: "Moldura Atual",
        }),
        [molduraAtual]
    );
    // eslint-disable-next-line
    const [frames, setFrames] = useState([]);
    const [selectedFrame, setSelectedFrame] = useState(userMoldura);

    useEffect(() => {
        // Simulação de busca de molduras e páginas
        const fakeFramesData = [
            {
                id: 0,
                src: semMoldura,
                nome: "Remover Molduras",
            },
            {
                id: 1,
                src: moldurabronze,
                nome: "Moldura Bronze",
            },
            {
                id: 2,
                src: moldura,
                nome: "Moldura 1",
            },
        ];
        setFrames(fakeFramesData);
    }, []);
    // eslint-disable-next-line
    const handleSelectFrame = (frame) => {
        if (frame.id === 0) {
            setSelectedFrame(null); // Define o estado selectedFrame como null
        } else {
            setSelectedFrame(frame); // Define o estado selectedFrame como a moldura selecionada
        }
    };
    return (
        <div>
            <DashboardMoldura frames={frames} handleSelectFrame={handleSelectFrame} />
        </div>
    )
}

export default Frames
