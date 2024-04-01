import { fb } from "../shared/service";
import { useEffect, useState } from "react";

export const UseLinkCss = (usuario) => {
  console.log(usuario);
  const [useLinkstyle, setUseLinkstyle] = useState();

  useEffect(() => {
    const unsubscribe = usuario
      ? fb.firestore
          .collection("UserCss")
          .where("username", "==", usuario)
          .onSnapshot((snap) => {
            const _linkstyle = [];
            snap.forEach((s) => {
              _linkstyle.push({
                ...s.data(),
                id: s.id,
              });
            });
            setUseLinkstyle(_linkstyle);
          })
      : undefined;

    return unsubscribe;
  }, [usuario]);

  return useLinkstyle;
};
