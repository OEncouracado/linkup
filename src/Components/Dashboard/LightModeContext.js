import React, { createContext, useContext, useState, useEffect } from "react";

// Criação do contexto
const LightModeContext = createContext();

// Hook para usar o contexto
export const useLightMode = () => useContext(LightModeContext);

// Provedor de contexto
export const LightModeProvider = ({ children }) => {
  // Inicializa o estado com base na preferência do usuário
  const [isLightMode, setIsLightMode] = useState(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return !userPrefersDark; // Se o usuário preferir o tema escuro, isLightMode será false
  });

  // Atualiza o estado quando a preferência do usuário muda
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setIsLightMode(!mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <LightModeContext.Provider value={{ isLightMode, setIsLightMode }}>
      {children}
    </LightModeContext.Provider>
  );
};
