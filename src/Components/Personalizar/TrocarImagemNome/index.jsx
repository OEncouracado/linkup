import React, { useState, useEffect } from "react";
import "react-device-emulator/lib/styles/style.css";
import { UserInfo, useAuth } from "../../../hook";
import DashboardPerfil from "../../Dashboard/DashboardPerfil";
// import DashboardNivel from "../../Dashboard/DashboardNivel";
import { fb } from './../../../shared/service/firebase';

function PerfilEdit() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const stats = userArray && userArray[0];
    const imgPerfil = stats?.imagemPerfil;
    const userName = stats?.linkUserName;
    const selectedFrame = stats?.moldura;
    console.log('selectedFrame :>> ', selectedFrame);

    // eslint-disable-next-line
    const [molduraImageUrl, setMolduraImageUrl] = useState("");

    useEffect(() => {
        const getMolduraImageUrl = async () => {
            try {
                // Substitua "NOME_DO_BUCKET" pelo nome do seu bucket no Firebase Storage
                const molduraImageRef = fb?.storage
                    .ref()
                    .child(`molduras/${selectedFrame}.png`);
                const url = await molduraImageRef.getDownloadURL();
                setMolduraImageUrl(url);
            } catch (error) {
                console.error("Erro ao obter a URL da imagem de rank: ", error);
            }
        };

        getMolduraImageUrl();
    }, [selectedFrame]);

    return (<>
        <DashboardPerfil
            perfil={imgPerfil}
            // selectedFrame={molduraImageUrl}
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
