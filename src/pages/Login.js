import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  console.log("email:", email);
  const [password, setPassword] = useState("");
  console.log("password:", password);

  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  console.log("emailInput:", emailInput);
  const [passwordInput, setPasswordInput] = useState("");
  console.log("passwordInput:", passwordInput);

  const submitForm = async (e) => {
    e.preventDefault();
    if (email !== emailInput && password !== passwordInput) {
      alert("Credentials Wrong");
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    const gEmail = JSON.parse(localStorage.getItem("gEmail"));
    const gPassword = JSON.parse(localStorage.getItem("gPassword"));
    if (gEmail && gPassword) {
      setEmail(gEmail);
      setPassword(gPassword);
    }
  }, []);

  return (
    <Container>
      <Row style={{ marginTop: "120px" }}>
        <Col sm={4}></Col>
        <Col sm={4}>
          <Card className="shadow-sm">
            <Card.Header>Login</Card.Header>

            <Card.Body>
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="md">
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Link to="/signup" className="text-center mb-3">
              Signup
            </Link>
          </Card>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default Login;
