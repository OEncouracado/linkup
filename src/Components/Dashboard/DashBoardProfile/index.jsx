import React from 'react'
import { Container } from 'react-bootstrap'
import { useAuth, UserInfo } from '../../../hook';
import DashboardNivel from '../DashboardNivel';
import PerfilRank from '../../../pages/perfil/PerfilRank';

function DashboardProfile() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const infoArray = UserInfo(id);
    const stats = infoArray && infoArray[0];

    return (
        <Container className='profileContainers mt-5 rounded'>
            <div className="d-flex flex-column align-items-center text-center px-3">
                <img
                    className="rounded-circle mt-2"
                    width="150px"
                    alt=""
                    src={authUser?.photoURL}
                />

                <span className="font-weight-bold">{authUser?.displayName}</span>
                <span className="text-white-50">{authUser?.email}</span>
                <DashboardNivel xp={stats?.xp} />
                <PerfilRank rank={stats?.rank} />
            </div>
        </Container>
    )
}

export default DashboardProfile
