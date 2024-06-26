import { fb } from "../shared/service";
import { useEffect, useState } from "react";

export const UseLinkInfo = (usuario) => {
  const [useLinkStats, setUseLinkStats] = useState();

  useEffect(() => {
    const unsubscribe = usuario
      ? fb.firestore
          .collection("UserStats")
          .where("linkUserName", "==", usuario)
          .onSnapshot((snap) => {
            const _linkstats = [];
            snap.forEach((s) => {
              _linkstats.push({
                ...s.data(),
                id: s.id,
              });
            });
            setUseLinkStats(_linkstats);
          })
      : undefined;

    return unsubscribe;
  }, [usuario]);

  return useLinkStats;
};
