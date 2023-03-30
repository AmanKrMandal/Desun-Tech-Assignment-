import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import CartIcon from "../SVG/CartIcon";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function NavBarComponent() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Navbar.Brand>Game</Navbar.Brand>
        </Link>

        <Link to="cart">
          <Button variant="light">
            <span className="me-2">CheckOut</span>
            <span className="me-2">
              <CartIcon />
            </span>

            {/* <Badge bg="secondary">1</Badge> */}
          </Button>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
