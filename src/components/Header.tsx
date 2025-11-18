import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCartStore } from "../store/useCartStore";
import "../styles/index.css";

/**
 * Header Component
 *
 * Renders the navigation bar with links to Home, Contact, and Cart.
 * Displays cart count dynamically and supports mobile menu toggle.
 *
 * @component
 * @returns {JSX.Element} Header/navbar view
 */
const Header = () => {
  // Get cart count from Zustand store
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
              <span className="position-absolute fw-bold cart-count">
                {cartCount}
              </span>
            )}
          </Nav.Link>
        </div>

        {/* Nav links */}
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto d-flex align-items-end gap-2 mt-3 mt-lg-0 gap-lg-3 align-lg-items-center">
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
                <span className="position-absolute fw-bold cart-count">
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
