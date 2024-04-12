import React from "react";
import HomeTopbar from "../../Components/Home/HomeTopbar";
import HomePrimeiraDiv from "../../Components/Home/HomePrimeiraDiv";
import { Container } from "react-bootstrap";
import HomeSegundaDiv from "../../Components/Home/HomeSegundaDiv";

function Homepage() {
  return (
    <div className="py-3 fundoHomePage">
      <Container className="">
        <HomeTopbar />
        <HomePrimeiraDiv />
        <HomeSegundaDiv />
      </Container>
    </div>
  );
}

export default Homepage;
