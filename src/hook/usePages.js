import { fb } from '../shared/service';
import { useEffect, useState } from 'react';

export const usePages = userId => {
  const [pages, setPages] = useState();

  useEffect(() => {
    const unsubscribe = userId
      ? fb.firestore
          .collection('linkPages')
          .doc(userId) // Acessa diretamente o documento com o nome do userId
          .onSnapshot(doc => {
            if (doc.exists) {
              // Se o documento existir, define as páginas com base nos dados do documento
              setPages({ id: doc.id, ...doc.data() });
            } else {
              // Se o documento não existir, define as páginas como null
              setPages(null);
            }
          })
      : undefined;
      
    return unsubscribe;
  }, [userId]);

  return pages;
};
