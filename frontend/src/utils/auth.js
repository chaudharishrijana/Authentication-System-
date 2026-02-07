// Save JWT tokens in localStorage
export const saveToken = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

// Remove tokens from localStorage
export const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Get access token
export const getAccessToken = () => localStorage.getItem("access_token");

// Check if token exists and is not expired
export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) return false;

  // Check expiration
  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp;
  const now = Math.floor(Date.now() / 1000);
  return exp > now;
};
