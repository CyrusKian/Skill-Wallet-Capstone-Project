const API_URL = "http://localhost:5000/api";

// AUTH
export const loginUser = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return res.json();
};

export const registerUser = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return res.json();
};

// PROPERTIES
export const getProperties = async () => {
  const res = await fetch(`${API_URL}/properties`);
  return res.json();
};

export const getProperty = async (id: string) => {
  const res = await fetch(`${API_URL}/properties/${id}`);
  return res.json();
};

export const createProperty = async (data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};