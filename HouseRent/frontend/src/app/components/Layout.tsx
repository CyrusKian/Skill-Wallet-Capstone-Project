import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Building2,
  PlusCircle,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';

import { Toaster } from '../components/ui/sonner';
import { getCurrentUser, setCurrentUser } from '../data/mockData';

export function Layout() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="full-screen" style={{ background: "var(--bg)" }}>

      <Toaster position="top-center" richColors />

      {/* ================= HEADER ================= */}
      <header
  style={{
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255, 255, 255, 0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border)"
  }}
>
  <div
    className="container"
    style={{
      height: "64px",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center"
    }}
  >

    {/* ================= LEFT (LOGO) ================= */}
    <Link
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifySelf: "start"
      }}
      to="/"
    >
      <Building2 style={{ color: "var(--primary)", width: 28, height: 28 }} />
      <span style={{ fontSize: "20px", fontWeight: 800 }}>
        HouseHunt
      </span>
    </Link>

    {/* ================= CENTER (NAV) ================= */}
    <nav
      style={{
        display: "flex",
        gap: "20px",
        justifySelf: "center",
        alignItems: "center"
      }}
    >
      <Link className="nav-link" to="/">
        <Home size={16} /> Home
      </Link>

      <Link className="nav-link" to="/properties">
        <Building2 size={16} /> Properties
      </Link>

      {currentUser?.role === 'owner' && (
        <Link className="nav-link" to="/add-property">
          <PlusCircle size={16} /> Add Property
        </Link>
      )}

      {currentUser && (
        <Link className="nav-link" to="/dashboard">
          <LayoutDashboard size={16} /> Dashboard
        </Link>
      )}
    </nav>

    {/* ================= RIGHT (AUTH) ================= */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifySelf: "end"
      }}
    >

      {currentUser ? (
        <>
          {/* USER BADGE */}
          <div
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              gap: "10px"
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700
              }}
            >
              {currentUser.name.charAt(0)}
            </div>

            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: "13px", fontWeight: 600 }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                {currentUser.role}
              </div>
            </div>
          </div>

          {/* LOGOUT */}
          <button className="btn btn-outline" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="btn btn-outline" to="/login">
            <LogIn size={16} />
            Login
          </Link>

          <Link className="btn btn-primary" to="/register">
            <UserPlus size={16} />
            Register
          </Link>
        </>
      )}

    </div>

  </div>
</header>
          

      {/* ================= MAIN ================= */}
      <main className="container" style={{ paddingTop: "30px", paddingBottom: "60px" }}>
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ padding: "50px 0" }}>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "30px"
            }}
          >

            {/* BRAND */}
            <div>
              <div className="flex center" style={{ gap: "10px", marginBottom: "10px" }}>
                <Building2 style={{ color: "var(--primary)" }} />
                <strong>HouseHunt</strong>
              </div>
              <p className="text-muted" style={{ fontSize: "13px" }}>
                Your trusted platform for finding modern rental homes with ease.
              </p>
            </div>

            {/* LINKS */}
            <div>
              <h4>Quick Links</h4>
              <div className="footer-links">
                <Link to="/properties">Browse Properties</Link>
                <Link to="/register">List Property</Link>
                <a href="#">About</a>
              </div>
            </div>

            <div>
              <h4>Support</h4>
              <div className="footer-links">
                <a href="#">Help Center</a>
                <a href="#">Contact</a>
                <a href="#">FAQ</a>
              </div>
            </div>

            <div>
              <h4>Legal</h4>
              <div className="footer-links">
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
              </div>
            </div>

          </div>

          <div
            style={{
              marginTop: "30px",
              paddingTop: "15px",
              borderTop: "1px solid var(--border)",
              textAlign: "center",
              fontSize: "12px",
              color: "var(--muted)"
            }}
          >
            © 2026 HouseHunt. All rights reserved.
          </div>

        </div>
      </footer>

      {/* ================= LOCAL STYLES ================= */}
      <style>
        {`
          .nav-link {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-main);
            transition: 0.2s ease;
            text-decoration: none;
          }

          .nav-link:hover {
            color: var(--primary);
          }

          h4 {
            margin-bottom: 10px;
            font-size: 14px;
          }

          .footer-links {
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 13px;
            color: var(--muted);
          }

          .footer-links a {
            color: var(--text-muted);
            transition: 0.2s;
          }

          .footer-links a:hover {
            color: var(--primary);
          }
        `}
      </style>

    </div>
  );
}