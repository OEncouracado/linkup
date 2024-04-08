import React from "react";
import HomeTopbar from "../../Components/Home/HomeTopbar";
import { Container } from 'react-bootstrap';

function Homepage() {
  return (
    <div className="pt-3 fundoHomePage">
      <Container>
        <HomeTopbar />
      </Container>
    </div>
  );
}

export default Homepage;
