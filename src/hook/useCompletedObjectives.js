import { useState, useEffect } from 'react';
import { useAuth } from './authUser'; // Hook de autenticação do usuário
import { fb } from '../shared/service';

const useCompletedObjectives = () => {
  const { authUser } = useAuth();
  const [completedObjectives, setCompletedObjectives] = useState([]);

  useEffect(() => {
    if (!authUser) return;

    const unsubscribe = fb?.firestore
      .collection('UserStats')
      .doc(authUser?.uid)
      .onSnapshot((snapshot) => {
        const userData = snapshot.data();
        if (userData && userData.completedObjectives) {
          setCompletedObjectives(userData.completedObjectives);
        }
      });

    return () => unsubscribe();
  }, [authUser]);

  return { completedObjectives };
};

export default useCompletedObjectives;
