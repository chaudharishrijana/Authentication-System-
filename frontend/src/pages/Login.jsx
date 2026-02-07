import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { saveToken } from "../utils/auth";


//login
const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isRegisterSlide, setIsRegisterSlide] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("login/", form);
      saveToken(res.data.access, res.data.refresh);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid credentials. Please register or check password.");
        } else if (err.response.data) {
          setError(JSON.stringify(err.response.data));
        } else {
          setError("Something went wrong. Try again.");
        }
      } else if (err.request) {
        setError("No response from server. Check backend or CORS.");
      } else {
        setError("Something went wrong: " + err.message);
      }
    }
  };

  // register 
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [registerError, setRegisterError] = useState("");

  const handleRegisterChange = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");

    try {
      await api.post("register/", registerForm);
      alert("Successfully registered! Please login.");
      setIsRegisterSlide(false);
      setRegisterForm({ username: "", email: "", password: "", password2: "" });
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.username) setRegisterError("Username already exists.");
        else if (data.email) setRegisterError("Email already exists.");
        else if (data.password) setRegisterError(data.password);
        else setRegisterError(JSON.stringify(data));
      } else if (err.request) {
        setRegisterError("No response from server. Check backend or CORS.");
      } else {
        setRegisterError("Something went wrong: " + err.message);
      }
    }
  };

  return (
    <div
        style={{
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1950&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    }}

    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          display: "flex",
          minHeight: "500px",
        }}
      >
        
        <div
          style={{
            width: "40%",
            background: "linear-gradient(135deg, #2d98e0b7 0%, #f0f9ffdf 100%)",
            color: "#0c5782c7",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div style={{ position: "relative", zIndex: "2" }}>
            <h2 style={{ 
              fontSize: "28px", 
              marginBottom: "20px",
              fontWeight: "600",
              color: "#1c6bacd6"
            }}>
              {isRegisterSlide ? "Sign Up ?" : "Welcome Back"}
            </h2>
            <p style={{ 
              fontSize: "16px", 
              lineHeight: "1.6",
              color: "#475569",
              marginBottom: "30px"
            }}>
              {isRegisterSlide 
                ? "Create your account if you don't have one." 
                : "Sign in to access your personalized dashboard."
              }
            </p>
            
           
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "40px"
            }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: isRegisterSlide ? "#cbd5e1" : "#0284c7",
                  transition: "all 0.3s",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: isRegisterSlide ? "#0ea5e9" : "#cbd5e1",
                  transition: "all 0.3s",
                }}
              />
            </div>
          </div>
          
       
          <div style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "rgba(14, 165, 233, 0.1)",
          }} />
          <div style={{
            position: "absolute",
            bottom: "40px",
            right: "30px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "rgba(2, 132, 199, 0.1)",
          }} />
        </div>

       
        <div
          style={{
            width: "60%",
            padding: "40px",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#f8fafc",
          }}
        >
          {/* navigation */}
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
            gap: "10px",
          }}>
            <button
              onClick={() => setIsRegisterSlide(false)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: isRegisterSlide ? "#94a3b8" : "#0284c7",
                cursor: isRegisterSlide ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (isRegisterSlide) {
                  e.target.style.backgroundColor = "#0284c7";
                  e.target.style.color = "white";
                  e.target.style.borderColor = "#0284c7";
                }
              }}
              onMouseOut={(e) => {
                if (isRegisterSlide) {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.color = "#94a3b8";
                  e.target.style.borderColor = "#cbd5e1";
                }
              }}
            >
              ‹
            </button>
            <button
              onClick={() => setIsRegisterSlide(true)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: isRegisterSlide ? "#0ea5e9" : "#94a3b8",
                cursor: isRegisterSlide ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (!isRegisterSlide) {
                  e.target.style.backgroundColor = "#187aa8b9";
                  e.target.style.color = "white";
                  e.target.style.borderColor = "#1257769d";
                }
              }}
              onMouseOut={(e) => {
                if (!isRegisterSlide) {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.color = "#94a3b8";
                  e.target.style.borderColor = "#cbd5e1";
                }
              }}
            >
              ›
            </button>
          </div>

          {/* forms  */}
          <div
            style={{
              display: "flex",
              width: "200%",
              transform: isRegisterSlide ? "translateX(-50%)" : "translateX(0)",
              transition: "transform 0.4s ease",
            }}
          >
            {/* login Form */}
            <div
              style={{
                width: "50%",
                paddingRight: "40px",
              }}
            >
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ 
                  color: "#1e293b", 
                  marginBottom: "8px", 
                  fontSize: "24px",
                  fontWeight: "600"
                }}>
                  Sign in
                </h2>
                <p style={{ 
                  color: "#475569", 
                  fontSize: "14px",
                  lineHeight: "1.5"
                }}>
                  <strong>Welcome!</strong><br />
                  Sign in to your account or create a new one.
                </p>
              </div>

              {error && (
                <div style={{
                  backgroundColor: "#fee2e2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  padding: "10px 15px",
                  marginBottom: "20px",
                }}>
                  <p style={{ 
                    color: "#b91c1c", 
                    fontSize: "13px", 
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <span style={{ color: "#b91c1c" }}>⚠</span> {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      outline: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      transition: "all 0.2s",
                      backgroundColor: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0284c7";
                      e.target.style.boxShadow = "0 0 0 3px rgba(2, 132, 199, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#cbd5e1";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      paddingRight: "40px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      outline: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      transition: "all 0.2s",
                      backgroundColor: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0284c7";
                      e.target.style.boxShadow = "0 0 0 3px rgba(2, 132, 199, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#cbd5e1";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    style={{
                      position: "absolute",
                      left: "130px",
                      top: "15px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#64748b",
                      fontSize: "16px",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#0284c7";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#64748b";
                    }}
                  >
                    {showLoginPassword ? (
                      <span style={{ fontSize: "16px" }}>👁️</span>
                    ) : (
                      <span style={{ fontSize: "16px" }}>👁️‍🗨️</span>
                    )}
                  </button>
                </div>

                <div style={{ 
                  textAlign: "right", 
                  marginBottom: "25px",
                  fontSize: "13px"
                }}>
                  <a
                    href="#"
                    style={{
                      color: "#0369a1",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      fontWeight: "500"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#0284c7";
                      e.target.style.textDecoration = "underline";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#0369a1";
                      e.target.style.textDecoration = "none";
                    }}
                  >
                    Forgot your password?
                  </a>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(to right, #0369a1, #0284c7)",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "all 0.3s",
                    boxShadow: "0 4px 15px rgba(3, 105, 161, 0.2)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(3, 105, 161, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(3, 105, 161, 0.2)";
                  }}
                >
                  SIGN IN
                </button>
              </form>

              <div style={{
                textAlign: "center",
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "13px",
                color: "#475569"
              }}>
                <p style={{ margin: 0 }}>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsRegisterSlide(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0369a1",
                      cursor: "pointer",
                      fontWeight: "600",
                      padding: "0",
                      fontSize: "13px",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#0284c7";
                      e.target.style.textDecoration = "underline";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#0369a1";
                      e.target.style.textDecoration = "none";
                    }}
                  >
                    SIGN UP
                  </button>
                </p>
              </div>
            </div>

            {/* register form */}
            <div
              style={{
                width: "50%",
                paddingLeft: "40px",
              }}
            >
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ 
                  color: "#1e293b", 
                  marginBottom: "8px", 
                  fontSize: "24px",
                  fontWeight: "600"
                }}>
                  Create Account
                </h2>
                <p style={{ 
                  color: "#475569", 
                  fontSize: "14px",
                  lineHeight: "1.5"
                }}>
                  <strong>Join us!</strong><br />
                  Fill in your details to create a new account.
                </p>
              </div>

              {registerError && (
                <div style={{
                  backgroundColor: "#fee2e2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  padding: "10px 15px",
                  marginBottom: "20px",
                }}>
                  <p style={{ 
                    color: "#b91c1c", 
                    fontSize: "13px", 
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <span style={{ color: "#b91c1c" }}>⚠</span> {registerError}
                  </p>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit}>
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={registerForm.username}
                    onChange={handleRegisterChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      outline: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      transition: "all 0.2s",
                      backgroundColor: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0ea5e9";
                      e.target.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#cbd5e1";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      outline: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      transition: "all 0.2s",
                      backgroundColor: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0ea5e9";
                      e.target.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#cbd5e1";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      paddingRight: "40px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      outline: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      transition: "all 0.2s",
                      backgroundColor: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0ea5e9";
                      e.target.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#cbd5e1";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    style={{
                      position: "absolute",
                      left: "130px",
                      top: "15px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#64748b",
                      fontSize: "16px",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#0ea5e9";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#64748b";
                    }}
                  >
                    {showRegisterPassword ? (
                      <span style={{ fontSize: "16px" }}>👁️</span>
                    ) : (
                      <span style={{ fontSize: "16px" }}>👁️‍🗨️</span>
                    )}
                  </button>
                </div>

                <div style={{ marginBottom: "25px", position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password2"
                    placeholder="Confirm Password"
                    value={registerForm.password2}
                    onChange={handleRegisterChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      paddingRight: "40px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      outline: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      transition: "all 0.2s",
                      backgroundColor: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0ea5e9";
                      e.target.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#cbd5e1";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      left: "130px",
                      top: "15px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#64748b",
                      fontSize: "16px",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#0ea5e9";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#64748b";
                    }}
                  >
                    {showConfirmPassword ? (
                      <span style={{ fontSize: "16px" }}>👁️</span>
                    ) : (
                      <span style={{ fontSize: "16px" }}>👁️‍🗨️</span>
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(to right, #0ea5e9, #38bdf8)",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "all 0.3s",
                    boxShadow: "0 4px 15px rgba(14, 165, 233, 0.2)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(14, 165, 233, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(14, 165, 233, 0.2)";
                  }}
                >
                  SIGN UP
                </button>
              </form>

              <div style={{
                textAlign: "center",
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "13px",
                color: "#475569"
              }}>
                <p style={{ margin: 0 }}>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsRegisterSlide(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0369a1",
                      cursor: "pointer",
                      fontWeight: "600",
                      padding: "0",
                      fontSize: "13px",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#0284c7";
                      e.target.style.textDecoration = "underline";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#0369a1";
                      e.target.style.textDecoration = "none";
                    }}
                  >
                    SIGN IN
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;