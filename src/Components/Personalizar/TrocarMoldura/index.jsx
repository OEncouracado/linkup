import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Container } from 'react-bootstrap';
import { fb } from '../../../shared/service'; // Certifique-se de que o caminho esteja correto
import { useAuth, UserInfo } from '../../../hook';
import './customScrollbar.css';

function TrocarMoldura() {
  const [molduras, setMolduras] = useState([]);
  const { authUser } = useAuth();
  const statsArray = UserInfo(authUser?.uid);
  const stats = statsArray && statsArray[0];
  // eslint-disable-next-line
  const userMolduras = stats?.userMolduras || [];
  const rank = stats?.rank;

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

  useEffect(() => {
    const updateMoldurasBasedOnRank = async () => {
      let newMolduras = [...userMolduras];
      if (rank >= 100 && rank <= 399 && !newMolduras.includes("3-molduraprata")) {
        newMolduras.push("3-molduraprata");
          } else if (rank >= 400 && rank <= 999 && !newMolduras.includes("4-molduraouro")) {
            newMolduras.push("4-molduraouro");
          } else if (rank >= 1000 && rank <= 1999 && !newMolduras.includes("5-molduraplatina")) {
            newMolduras.push("5-molduraplatina");
          } else if (rank >= 2000 && rank <= 3999 && !newMolduras.includes("6-molduradiamante")) {
            newMolduras.push("6-molduradiamante");
          } else if (rank >= 4000 && !newMolduras.includes("7-molduramestre")) {
            newMolduras.push("7-molduramestre");
          }

      // Adiciona a moldura Bronze se o rank é válido para ela
      if (!newMolduras.includes("2-moldurabronze")) {
        newMolduras.push("2-moldurabronze");
      }

      if (newMolduras.length !== userMolduras.length) {
        await fb.firestore.collection("UserStats").doc(authUser.uid).update({ userMolduras: newMolduras });
      }
    };

    if (rank !== undefined) {
      updateMoldurasBasedOnRank();
    }
  }, [rank, authUser.uid, userMolduras]);

  const handleSelectMoldura = async (moldura) => {
    try {
      await fb.firestore.collection("UserStats").doc(authUser.uid).update({ moldura: moldura === 'sem moldura' ? '' : moldura });
    } catch (error) {
      console.error("Erro ao atualizar a moldura do usuário:", error);
      alert('Erro ao selecionar a moldura.');
    }
  };

  // Preenche a lista de molduras com quadrados fantasmas até atingir 52 quadrados
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
                moldura.name === 'sem moldura' || userMolduras.includes(moldura.name) ? (
                  <img
                    title={moldura.name}
                    src={moldura.url}
                    alt={moldura.name}
                    className="img-thumbnail"
                    style={{ width: "100%", height: "100%", cursor: 'pointer' }}
                  />
                ) : (
                  <div
                    title={moldura.name}
                    className="img-thumbnail d-flex align-items-center justify-content-center"
                      style={{ cursor: 'pointer', width: "100%", height: "100%", position: 'relative' }}
                    >
                      <img
                        src={moldura.url}
                        alt={moldura.name}
                        style={{ width: "100%", height: "100%", opacity: 0.5 }}
                      />
                      <i
                        className="fas fa-lock"
                        style={{
                        position: 'absolute',
                        fontSize: '1.5rem',
                        color: 'white',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                )
              ) : (
                <div
                  className="img-thumbnail"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: 'gray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Opcional: Adicionar um ícone ou texto para placeholders */}
                </div>
              )}
            </Container>
          ))}
      </CardBody>
    </Card>
  );
}

export default TrocarMoldura;
