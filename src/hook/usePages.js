import { fb } from '../shared/service';
import { useEffect, useState } from 'react';

export const usePages = userId => {
  console.log(userId);
  const [pages, setPages] = useState();

  useEffect(() => {
    const unsubscribe = userId
      ? fb.firestore
          .collection('linkPages')
          .where('userId', "==" , userId)
          .onSnapshot(snap => {
            const _pages = [];
            snap.forEach(s => {
              _pages.push({
                ...s.data(),
                id: s.id,
              });
            });
            setPages(_pages);
            console.log(_pages);
          })
      : undefined;
          
    return unsubscribe;
  }, [userId]);

  return pages;
};