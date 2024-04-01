import { fb } from "../shared/service";
import { useEffect, useState } from "react";

export const useLinkPages = (usuario) => {
  console.log(usuario);
  const [linkPages, setlinkPages] = useState();

  useEffect(() => {
    const unsubscribe = usuario
      ? fb.firestore
          .collection("linkPages")
          .where("username", "==", usuario)
          .onSnapshot((snap) => {
            const _linkpages = [];
            snap.forEach((s) => {
              _linkpages.push({
                ...s.data(),
                id: s.id,
              });
            });
            setlinkPages(_linkpages);
            console.log(_linkpages);
          })
      : undefined;

    return unsubscribe;
  }, [usuario]);

  return linkPages;
};