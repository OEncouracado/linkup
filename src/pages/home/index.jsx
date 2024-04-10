import React from "react";
import HomeTopbar from "../../Components/Home/HomeTopbar";
import HomePrimeiraDiv from "../../Components/Home/HomePrimeiraDiv";
import { Container } from "react-bootstrap";

function Homepage() {
  return (
    <div className="py-3 fundoHomePage">
      <Container className="pb-2">
        <HomeTopbar />
        <HomePrimeiraDiv />
      </Container>
    </div>
  );
}

export default Homepage;
