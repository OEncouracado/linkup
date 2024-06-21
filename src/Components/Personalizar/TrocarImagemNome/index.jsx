import React, { useState, useEffect, useMemo } from "react";
import "react-device-emulator/lib/styles/style.css";
import { UserInfo, useAuth, usePages } from "../../../hook";
import DashboardPerfil from "../../Dashboard/DashboardPerfil";
// import DashboardNivel from "../../Dashboard/DashboardNivel";

function PerfilEdit() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const pageInfo = usePages(id);
    const pages = pageInfo?.Links;
    const stats = userArray && userArray[0];
    const imgPerfil = stats?.imagemPerfil;
    const userName = stats?.linkUserName;
    const molduraAtual = stats?.moldura;
    console.log("array de paginas", pageInfo);
    console.log("const pages", pages);
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
        setSelectedFrame(userMoldura);
    }, [userMoldura]);

    return (<>
        <DashboardPerfil
            perfil={imgPerfil}
            selectedFrame={selectedFrame}
            username={userName}
            id={id}
        />
        {/* <DashboardNivel
            nivel={stats?.nivelUser}
            xp={stats?.xp}
            maxxp={stats?.maxXp}
        /> */}
    </>
    )
}

export default PerfilEdit
