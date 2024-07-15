import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Container } from 'react-bootstrap';
import { fb } from '../../../shared/service'; // Certifique-se de que o caminho esteja correto
import { useAuth } from '../../../hook';
import './customScrollbar.css'

function TrocarMoldura() {
    const [molduras, setMolduras] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        const fetchMolduras = async () => {
            const storageRef = fb.storage.ref();
            const moldurasRef = storageRef.child('molduras');
            const moldurasList = await moldurasRef.listAll();
            const urls = await Promise.all(
                moldurasList.items.map(async item => {
                    const url = await item.getDownloadURL();
                    return { name: item.name.replace('.png', ''), url };
                })
            );
            // Adiciona o item "sem moldura" no início da lista
            urls.unshift({ name: 'sem moldura', url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Empty_set.svg' });
            setMolduras(urls);
        };

        fetchMolduras();
    }, []);

    const handleSelectMoldura = async (moldura) => {
        try {
            await fb.firestore.collection("UserStats").doc(authUser.uid).update({ moldura: moldura === 'sem moldura' ? '' : moldura });
        } catch (error) {
            console.error("Erro ao atualizar a moldura do usuário:", error);
            alert('Erro ao selecionar a moldura.');
        }
    };

    // Preenche a lista de molduras com quadrados fantasmas até atingir 10 quadrados
    const filledMolduras = [...molduras];
    while (filledMolduras.length < 52) {
        filledMolduras.push({ name: '', url: '' });
    }

    return (
        <Card bg='secondary' text='light' className='m-0 p-0 h-100'>
            <CardHeader className='text-center p-0'>
                <h4>Molduras</h4>
            </CardHeader>
            <CardBody
                style={{ overflowY: "scroll" }}
                className='molduraBody h-100 p-0 d-flex flex-wrap justify-content-center'>

                {filledMolduras.map((moldura, index) => (
                    <Container
                        key={index}
                        style={{ height: "5rem", width: "5rem", margin: "1%" }}
                        className={`quadradosMoldura p-0`}
                        onClick={() => moldura.name && handleSelectMoldura(moldura.name)}
                    >
                        {moldura.name ? (
                            <img title={moldura.name} src={moldura.url} alt={moldura.name} className="img-thumbnail" style={{ width: "100%", height: "100%", cursor: 'pointer' }} />
                        ) : (
                            <div
                                title='bloqueado'
                                className="img-thumbnail d-flex align-items-center justify-content-center"
                                style={{ cursor: 'pointer', width: "100%", height: "100%", backgroundColor: 'gray' }}>
                                    {moldura.name && <span>{moldura.name}</span>}<i className="fas fa-lock    "></i>
                            </div>
                        )}
                    </Container>
                ))}
            </CardBody>
        </Card>
    );
}

export default TrocarMoldura;
