import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react';
import { toast } from 'sonner';

export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'tenant' as 'owner' | 'tenant'
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  if (formData.password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return;
  }

  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/register',
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
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

    console.log(res.data);

    toast.success('Account created successfully!');

    navigate('/dashboard');

  } catch (error: any) {
    console.error(error);

    toast.error(
      error.response?.data?.message || 'Registration failed'
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
            <UserPlus size={24} color="white" />
          </div>

          <h2>Create Account</h2>
          <p className="text-muted">Join HouseHunt and start your journey</p>
        </div>

        {/* FORM */}
        <form style={{ display: "flex", flexDirection: "column", gap: 18 }} onSubmit={handleSubmit}>

          {/* NAME */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="text-muted" style={{ fontSize: 13 }}>Full Name</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <User size={16} />
              <input
                style={{ flex: 1 }}
                value={formData.name}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Doe"
              />
            </div>
          </div>

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

          {/* PHONE */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="text-muted" style={{ fontSize: 13 }}>Phone</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Phone size={16} />
              <input
                style={{ flex: 1 }}
                value={formData.phone}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, phone: e.target.value }))
                }
                placeholder="+63 9XX XXX XXXX"
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
                placeholder="At least 6 characters"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="text-muted" style={{ fontSize: 13 }}>Confirm Password</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Lock size={16} />
              <input
                style={{ flex: 1 }}
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))
                }
                placeholder="Re-enter password"
              />
            </div>
          </div>

          {/* ROLE SELECT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="text-muted" style={{ fontSize: 13 }}>Account Type</label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

              <button
                type="button"
                className="card"
                onClick={() =>
                  setFormData(prev => ({ ...prev, role: 'tenant' }))
                }
                style={{
                  border: formData.role === "tenant"
                    ? "1px solid var(--primary)"
                    : "1px solid var(--border)",
                  cursor: "pointer"
                }}
              >
                <strong>Tenant</strong>
                <p className="text-muted">Rent a home</p>
              </button>

              <button
                type="button"
                className="card"
                onClick={() =>
                  setFormData(prev => ({ ...prev, role: 'owner' }))
                }
                style={{
                  border: formData.role === "owner"
                    ? "1px solid var(--primary)"
                    : "1px solid var(--border)",
                  cursor: "pointer"
                }}
              >
                <strong>Owner</strong>
                <p className="text-muted">List property</p>
              </button>

            </div>
          </div>

          {/* SUBMIT */}
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>

        </form>

        {/* LOGIN LINK */}
        <div className="center" style={{ marginTop: 16 }}>
          <p className="text-muted" style={{ fontSize: 13 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--primary)", fontWeight: "bold" }}>
              Sign in
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}