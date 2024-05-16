import React from "react";
import HomeTopbar from "../../Components/Home/HomeTopbar";
import HomePrimeiraDiv from "../../Components/Home/HomePrimeiraDiv";
import HomeSegundaDiv from "../../Components/Home/HomeSegundaDiv";
import Footer from "../../Components/Home/Footer";

function Homepage() {
  return (
    <>
      <HomeTopbar />
      <HomePrimeiraDiv />
      <HomeSegundaDiv />
      <Footer />
    </>
  );
}

export default Homepage;
