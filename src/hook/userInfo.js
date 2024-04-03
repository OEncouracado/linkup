import { fb } from '../shared/service';
import { useEffect, useState } from 'react';

export const UserInfo = userId => {
  const [userStats, setUserStats] = useState();

  useEffect(() => {
    const unsubscribe = userId
      ? fb.firestore
          .collection('UserStats')
          .where('userId', "==" , userId)
          .onSnapshot(snap => {
            const _stats = [];
            snap.forEach(s => {
                _stats.push({
                ...s.data(),
                id: s.id,
              });
            });
            setUserStats(_stats);
          })
      : undefined;

    return unsubscribe;
  }, [userId]);

  return userStats;
};