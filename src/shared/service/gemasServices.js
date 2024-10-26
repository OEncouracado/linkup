// gemasService.js

import { fb } from "./firebase";
import gemas from "../../Images/gemas/gemas.png";
import gemas2 from "../../Images/gemas/gemas2.png";
import gemas3 from "../../Images/gemas/gemas3.png";
import gemas4 from "../../Images/gemas/gemas4.png";
import gemas5 from "../../Images/gemas/gemas5.png";


export const updateUserGemas = async (userId, gemCount) => {
  const userRef = fb?.firestore.collection("UserStats").doc(userId);
  await userRef.update({
    gemas: fb?.increment(gemCount),
  });
};

export const gemPackages = [
    {
      id: "bundle100",
      image: gemas, // ajuste o caminho conforme necessário
      title: "Punhado de LinkGems",
      description: "Bundle com 100 LinkGems",
      priceId: "price_1QDxAHCfAppK3pBhYFW0YbJi",
      price: 3.9,
      gemCount: 100,
    },
    {
      id: "bundle250",
      image: gemas2, // ajuste o caminho conforme necessário
      title: "Pacote de LinkGems",
      description: "Bundle com 250 LinkGems",
      priceId: "price_1QDxAMCfAppK3pBh8If5YqN0",
      price: 8.9,
      gemCount: 250,
    },
    {
      id: "bundle500",
      image: gemas3, // ajuste o caminho conforme necessário
      title: "Grande Pacote de LinkGems",
      description: "Bundle com 500 LinkGems",
      priceId: "price_1QDxAOCfAppK3pBhIdguq32Q",
      price: 15.9,
      gemCount: 500,
    },
    {
      id: "bundle1000",
      image: gemas4, // ajuste o caminho conforme necessário
      title: "Bolsa de LinkGems",
      description: "Bundle com 1.000 LinkGems",
      priceId: "price_1QDxAQCfAppK3pBhCDmnveWM",
      price: 29.9,
      gemCount: 1000,
    },
    {
      id: "bundle2500",
      image: gemas5, // ajuste o caminho conforme necessário
      title: "Baú de LinkGems",
      description: "Bundle com 2.500 LinkGems",
      priceId: "price_1QDxASCfAppK3pBh21G9x5rR",
      price: 69.9,
      gemCount: 2500,
    },
  ];
  
