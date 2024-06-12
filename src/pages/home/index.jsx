import React from "react";
import HomeTopbar from "../../Components/Home/HomeTopbar";
import HomePrimeiraDiv from "../../Components/Home/HomePrimeiraDiv";
import HomeSegundaDiv from "../../Components/Home/HomeSegundaDiv";
import Footer from "../../Components/Home/Footer";
import HomeTerceiraDiv from "../../Components/Home/HomeTerceiraDiv";
import HomeQuartaDiv from "../../Components/Home/HomeQuartaDiv";
import HomeDivPreco from "../../Components/Home/HomeDivPrecos";
import QeADiv from "../../Components/Home/HomeQeADiv";

function Homepage() {
  return (
    <>
      <HomeTopbar />
      <HomePrimeiraDiv />
      <HomeQuartaDiv />
      <HomeTerceiraDiv />
      <HomeSegundaDiv />
      <HomeDivPreco />
      <QeADiv />
      <Footer />
    </>
  );
}

export default Homepage;
