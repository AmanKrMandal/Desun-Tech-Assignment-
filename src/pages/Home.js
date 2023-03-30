import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent";

function Home() {
  const navigate = useNavigate();
  const [game, setGame] = useState([
    {
      id: 1,
      gameName: "Hi Stricker",
      startEvent: "2023-02-28T00:00",
      endEvent: "2023-03-01T00:00",
    },
    {
      id: 2,
      gameName: "Puch Challange",
      startEvent: "2023-02-28T00:00",
      endEvent: "2023-03-01T00:00",
    },
    {
      id: 3,
      gameName: "Bow & Arrow",
      startEvent: "2023-02-28T00:00",
      endEvent: "2023-03-01T00:00",
    },
    {
      id: 4,
      gameName: "Catch Fish",
      startEvent: "2023-02-28T00:00",
      endEvent: "2023-03-01T00:00",
    },
  ]);

  useEffect(() => {
    const gEmail = JSON.parse(localStorage.getItem("gEmail"));
    if (!gEmail) {
      navigate('/')
    }
  }, [navigate]);

  const handleClick = (value) => {
    localStorage.setItem("game", JSON.stringify(value));
    alert("Game added");
    navigate("/home/cart");
  };

  return (
    <>
      <NavBarComponent />
      <Container>
        <h1>Home</h1>
        <Row>
          {game.map((value, index) => {
            return (
              <Col sm={4} className="mb-2" key={index}>
                <Card className="p-5 cardbg">
                  <h1>{value.gameName}</h1>
                  <p>Start Event</p>
                  <p style={{ marginTop: "-15px" }}>
                    {Intl.DateTimeFormat("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(value.startEvent))}
                  </p>
                  <p>End Event</p>
                  <p style={{ marginTop: "-15px" }}>
                    {Intl.DateTimeFormat("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(value.endEvent))}
                  </p>
                  <Button className="mt-3" onClick={() => handleClick(value)}>
                    Add Game
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Home;
