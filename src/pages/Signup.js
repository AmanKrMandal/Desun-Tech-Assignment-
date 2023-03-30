import { useState } from "react";
import { Col, Container, Row, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import img from "../image/img.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    localStorage.setItem("gEmail", JSON.stringify(email));
    localStorage.setItem("gPassword", JSON.stringify(password));
    navigate("/");
  };

  return (
    <Container style={{ display: "flex" }}>
      <img src={img} />
      <Row style={{ marginTop: "120px" }}>
        <Col sm={12}>
          <Card className="shadow-sm">
            <Card.Header>Signup</Card.Header>

            <Card.Body>
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="md">
                    Signup
                  </Button>
                </div>
              </Form>
            </Card.Body>

            <Link to="/" className="text-center mb-3">
              Login
            </Link>
          </Card>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default Signup;
