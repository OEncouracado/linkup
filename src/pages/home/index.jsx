import React from "react";
import HomeTopbar from "../../Components/Home/HomeTopbar";
import HomePrimeiraDiv from "../../Components/Home/HomePrimeiraDiv";
import { Container } from "react-bootstrap";
import HomeSegundaDiv from "../../Components/Home/HomeSegundaDiv";

function Homepage() {
  return (
    <>
      <div className="fundo1HomePage">
        <HomeTopbar />
        <Container>
          <HomePrimeiraDiv />
        </Container>
      </div>
      <div className="fundo2HomePage">
        <Container>
          <HomeSegundaDiv />
        </Container>
      </div>
    </>
  );
}

export default Homepage;
