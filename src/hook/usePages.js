import { useEffect, useState } from "react"
import { fb } from "../shared/service/firebase"



export const usePages = (userId) => {
  const [pages,setPages] = useState();

  useEffect(() => {

    const unsubscribe = userId 
    ? fb.firestore
        .collection('pages')
        .where('userId', '==',userId)
        .onSnapshot(snap => {
            const _pages =[];
            snap.forEach(s => {
                _pages.push({
                    ...(s.data()),
                    id:s.id,
                });
            });
            setPages(_pages);
        })
    : undefined;

        return unsubscribe;
  },[userId]);

  return pages;
};
