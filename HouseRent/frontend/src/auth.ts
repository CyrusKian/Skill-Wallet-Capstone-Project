export type Role = "owner" | "tenant";

export type AuthUser = {
  id: string;
  role: Role;
  name?: string;
};

const TOKEN_KEY = "token";

function base64UrlDecode(input: string) {
  const str = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const base64 = str + pad;
  return atob(base64);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAuthUser(): AuthUser | null {
  const token = getToken();
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    if (!payload?.id) return null;

    return {
      id: String(payload.id),
      role: (payload.role === "owner" ? "owner" : "tenant") as Role,
    };
  } catch {
    return null;
  }
}

