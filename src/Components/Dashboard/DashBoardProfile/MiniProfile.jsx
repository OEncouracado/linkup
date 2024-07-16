import React, { useEffect, useState } from "react";
import {
    Container,
    Image,
    Row,
    Col,
    ProgressBar,
} from "react-bootstrap";
import photoNull from "../../../Images/perfil/perfil.jpg";
import { useAuth, UserInfo } from "../../../hook";
import { fb } from "../../../shared/service";

function MiniProfile({ photo }) {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const infoArray = UserInfo(id);
    const stats = infoArray && infoArray[0];
    const [rankImageUrl, setRankImageUrl] = useState("");

    useEffect(() => {
        // Função para obter a URL da imagem de rank do Firebase Storage
        const getRankImageUrl = async () => {
            try {
                const rankImageRef = fb?.storage
                    .ref()
                    .child(`decoracao_rank/${determinarFaixaRank(stats?.rank).nome}.png`);
                const url = await rankImageRef.getDownloadURL();
                setRankImageUrl(url);
            } catch (error) {
                console.error("Erro ao obter a URL da imagem de rank: ", error);
            }
        };

        getRankImageUrl();
    }, [stats]);

    const determinarFaixaRank = (rank) => {
        const ranks = [
            { nome: "Bronze", min: 0, max: 99 },
            { nome: "Prata", min: 100, max: 399 },
            { nome: "Ouro", min: 400, max: 999 },
            { nome: "Platina", min: 1000, max: 1999 },
            { nome: "Diamante", min: 2000, max: 3999 },
            { nome: "Mestre", min: 4000, max: rank }
        ];

        for (let i = 0; i < ranks.length; i++) {
            if (rank <= ranks[i].max) {
                return ranks[i];
            }
        }
        return null;
    };

    const rankDetails = determinarFaixaRank(stats?.rank);

    if (!rankDetails) {
        return <div>Rank inválido</div>;
    }

    const calculateLevelAndMaxXP = (xp) => {
        const base_xp = 100; // Define o quanto a dificuldade aumenta por nível
        let nivel = 1;
        let maxxp = base_xp;

        // Encontrar o nível atual
        while (xp >= maxxp) {
            nivel++;
            xp -= maxxp;
            maxxp = base_xp * nivel * nivel;
        }

        return { nivel, maxxp };
    };

    const { nivel, maxxp } = calculateLevelAndMaxXP(stats?.xp);

    return (
        <Container className="bg-dark-subtle rounded">
            <Row className="d-flex align-items-center">
                <Col xs={3} className="d-flex justify-content-center">
                    <Image
                        className="ImgPerfilDashboardTopbarPerfil"
                        src={photo ? photo : photoNull}
                        roundedCircle
                    /></Col>
                <Col className="my-1" xs={9}>
                    <h5 className="m-0">{stats?.username}</h5>
                    <Container className="px-0 py-1">
                        <Row className="d-flex align-items-center">
                            <Col xs={4} className='pe-0'>
                                <h6 className='m-0'>Nível <span className='text-success'>{nivel}</span></h6>
                            </Col>
                            <Col xs={8} className='ps-0' >
                                <ProgressBar title={`${stats?.xp}/${maxxp}`} className='w-100 bar xp-bar' striped animated variant='success' now={stats?.xp} max={maxxp} />
                            </Col>
                        </Row>
                        <Row className="d-flex align-items-center">
                            <Col xs={4} className='pe-0'>
                                <span className="text-success m-0">{rankDetails.nome}</span>
                            </Col>
                            <Col xs={8} className='ps-0' >
                                <ProgressBar title={`${stats?.rank}/${rankDetails.max}`} className='w-100 bar xp-bar' striped animated variant='success' now={stats?.rank - rankDetails.min} max={rankDetails.max - rankDetails.min} />
                            </Col>
                        </Row>
                    </Container>
                </Col>

            </Row>
        </Container>
    )
}

export default MiniProfile
