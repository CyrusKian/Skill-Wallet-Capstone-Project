import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      try {

        const res = await axios.post(
          'http://localhost:5000/api/auth/login',
          {
            email: formData.email,
            password: formData.password,
          }
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        toast.success(`Welcome back, ${res.data.user.name}!`);

        navigate('/dashboard');

      } catch (error: any) {

        console.error(error);

        toast.error(
          error.response?.data?.message || 'Login failed'
        );
      }
    };


  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}
    >

      {/* ================= AUTH CARD ================= */}
      <div className="card" style={{ width: "100%", maxWidth: 460, padding: 28 }}>

        {/* HEADER */}
        <div className="center" style={{ flexDirection: "column", marginBottom: 24 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            <LogIn size={24} color="white" />
          </div>

          <h2>Welcome Back</h2>
          <p className="text-muted">Sign in to continue</p>
        </div>

        {/* FORM */}
        <form style={{ display: "flex", flexDirection: "column", gap: 18 }} onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="text-muted" style={{ fontSize: 13 }}>Email</label>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Mail size={16} />
              <input
                style={{ flex: 1 }}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, email: e.target.value }))
                }
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="text-muted" style={{ fontSize: 13 }}>Password</label>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Lock size={16} />
              <input
                style={{ flex: 1 }}
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex-between" style={{ fontSize: 13 }}>

            <label className="flex center" style={{ gap: 6 }}>
              <input type="checkbox" />
              Remember me
            </label>
                
            <a style={{ color: "var(--primary)", cursor: "pointer" }}>
              Forgot password?
            </a>

          </div>

          {/* SUBMIT */}
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>

        </form>

        {/* REGISTER LINK */}
        <div className="center" style={{ marginTop: 16 }}>
          <p className="text-muted" style={{ fontSize: 13 }}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "var(--primary)", fontWeight: "bold" }}>
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}