import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import "../styles/index.css";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4 py-3">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/">
          OnlineShop
        </Navbar.Brand>

        {/* Mobile cart */}
        <div className="d-flex align-items-center gap-2 order-lg-3">
          <Navbar.Toggle aria-controls="main-navbar" />
          <Nav.Link as={Link} to="/cart" className="d-lg-none p-0">
            <HiOutlineShoppingBag size={25} />
          </Nav.Link>
        </div>

        {/* Nav links */}
        <Navbar.Collapse id="main-navbar" className="order-lg-2 mt-3">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="px-0 px-lg-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="px-0 px-lg-2">
              Contact
            </Nav.Link>

            {/* Desktop cart */}
            <Nav.Link as={Link} to="/cart" className="d-none d-lg-block ps-3">
              <HiOutlineShoppingBag size={23} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
