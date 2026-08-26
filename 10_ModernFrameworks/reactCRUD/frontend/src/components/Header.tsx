import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { resolveBackendAssetUrl } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { getCartCount, subscribeToCartChanges } from "../services/cartStorage";

function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [cartCount, setCartCount] = useState(() => getCartCount());

  useEffect(() => {
    return subscribeToCartChanges(() => {
      setCartCount(getCartCount());
    });
  }, []);

  return (
    <header className="app-header shadow-sm">
      <nav className="navbar navbar-dark bg-primary py-3">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            Fashion Catalog
          </NavLink>

          <ul className="navbar-nav flex-row gap-3 ms-auto">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link position-relative" to="/veziCos">
                Cos
                {cartCount > 0 ? (
                  <span className="badge bg-light text-primary ms-2">
                    {cartCount}
                  </span>
                ) : null}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productsList">
                Produse
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-orders">
                  Comenzile mele
                </NavLink>
              </li>
            ) : null}
            {isAuthenticated ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-profile/edit">
                  Profilul meu
                </NavLink>
              </li>
            ) : null}
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin-orders">
                        Comenzi admin
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/adminProducts">
                        Admin Produse
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/users">
                        Admin Utilizatori
                      </NavLink>
                    </li>
                  </>
                ) : null}
                <li className="nav-item text-white d-flex align-items-center small px-2 gap-2">
                  {user?.photo ? (
                    <img
                      src={resolveBackendAssetUrl(user.photo)}
                      alt="Avatar"
                      width={28}
                      height={28}
                      className="rounded-circle border border-light"
                      style={{ objectFit: "cover" }}
                    />
                  ) : null}
                  <span>Salut, {user?.name}</span>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;