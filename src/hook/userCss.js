import { fb } from '../shared/service';
import { useEffect, useState } from 'react';

export const UserCss = userId => {
  console.log(userId);
  const [userstyle, setUserstyle] = useState();

  useEffect(() => {
    const unsubscribe = userId
      ? fb.firestore
          .collection('UserCss')
          .where('userId', "==" , userId)
          .onSnapshot(snap => {
            const _style = [];
            snap.forEach(s => {
                _style.push({
                ...s.data(),
                id: s.id,
              });
            });
            setUserstyle(_style);
          })
      : undefined;

    return unsubscribe;
  }, [userId]);

  return userstyle;
};