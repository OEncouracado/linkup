import { useEffect, useState } from "react"
import { fb } from './../shared/service';

export const useAuth = () => {
  const [isAuthed, setIsAuthed] = useState();
  const [authUser, setAuthUser] = useState();

  useEffect(()=>{
    const unsubscribe = fb.auth.onAuthStateChanged(user => {
        if (user){
            setAuthUser(user);
            setIsAuthed(true);
        } else {
            setAuthUser(null);
            setIsAuthed(false);
        }
    });
    return unsubscribe;
  }, [authUser]);
  
  return {
    isAuthed,
    authUser,
  };
}
