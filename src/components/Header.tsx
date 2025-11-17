import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCartStore } from "../store/useCartStore";
import "../styles/index.css";

const Header = () => {
  const cartCount = useCartStore((state) => state.cartCount());

  return (
    <Navbar expand="lg" className="py-2">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Shopella
        </Navbar.Brand>

        {/* Mobile cart */}
        <div className="d-flex align-items-center">
          <Navbar.Toggle aria-controls="main-navbar" />
          <Nav.Link as={Link} to="/cart" className="d-lg-none">
            <HiOutlineShoppingBag size={25} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 fw-bold text-xs">
                {cartCount}
              </span>
            )}
          </Nav.Link>
        </div>

        {/* Nav links */}
        <Navbar.Collapse id="main-navbar">
          <Nav className=" ms-auto d-flex gap-lg-3 align-items-center">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>

            {/* Desktop cart */}
            <Nav.Link as={Link} to="/cart" className="d-none d-lg-block">
              <HiOutlineShoppingBag size={23} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 fw-bold text-xs">
                  {cartCount}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
