import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { removeToken, isAuthenticated } from "../utils/auth";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      removeToken();
      navigate("/login");
      return;
    }

    // Set up token expiration check
    const checkTokenExpiry = () => {
      if (!isAuthenticated()) {
        removeToken();
        navigate("/login");
        setError("Your session has expired. Please login again.");
      }
    };

    // Check token expiry every minute
    const expiryCheckInterval = setInterval(checkTokenExpiry, 60000);

    // Fetch dashboard data
    const fetchData = async () => {
      try {
        const res = await api.get("dashboard/");
        setMessage(res.data.message);
      } catch (err) {
        // Token expired or invalid
        if (err.response && err.response.status === 401) {
          removeToken();
          navigate("/login");
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to load dashboard data.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup interval on component unmount
    return () => clearInterval(expiryCheckInterval);
  }, [navigate]);

  // Auto logout when token expires
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const timeUntilExpiry = exp - now;

        if (timeUntilExpiry > 0) {
          const timeout = setTimeout(() => {
            removeToken();
            navigate("/login");
            setError("Your session has expired. Please login again.");
          }, timeUntilExpiry);

          return () => clearTimeout(timeout);
        } else {
          // Token already expired
          removeToken();
          navigate("/login");
        }
      } catch (err) {
        console.error("Error parsing token:", err);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}>
        <div style={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            margin: "0 auto 20px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #0284c7",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ color: "#475569", fontSize: "16px" }}>Loading Dashboard...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "white",
        padding: "0 30px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: "0",
        zIndex: "100",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          height: "70px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#0284c7",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
            }}>
              
            </div>
            <h1 style={{ margin: "0", color: "#1e293b", fontSize: "22px" }}> {message} </h1>
          </div>
          
         
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "0 20px",
      }}>
        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: "#fee2e2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            padding: "15px 20px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span style={{ color: "#dc2626", fontSize: "18px" }}>⚠</span>
            <p style={{ margin: "0", color: "#b91c1c" }}>{error}</p>
          </div>
        )}

        {/* Welcome Card */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          marginBottom: "30px",
          textAlign: "center",
          borderTop: "5px solid #0284c7",
        }}>
          
          
          {message ? (
            <div style={{
              backgroundColor: "#f0f9ff",
              padding: "20px",
              borderRadius: "8px",
              margin: "20px 0",
              border: "1px solid #e0f2fe",
            }}>

              <p style={{
                margin: "0",
                color: "#0369a1",
                fontSize: "18px",
                lineHeight: "1.6"
              }}>
               <h2> Hello ! {message}, Welcome To Your Dashboard.</h2>
              </p>
            </div>
          ) : (
            <p style={{ 
              margin: "20px 0 0 0", 
              color: "#64748b", 
              fontSize: "16px",
              lineHeight: "1.6"
            }}>
              Your dashboard is ready. You're successfully authenticated and can access your data.
            </p>
          )}

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}>
           

           
          </div>
        </div>

        {/* Token Information */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          marginBottom: "30px",
        }}>
          <h3 style={{ 
            margin: "0 0 25px 0", 
            color: "#1e293b", 
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span>🔑</span> Session Information
          </h3>
          
          <div style={{
            backgroundColor: "#f8fafc",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "20px"
            }}>
              <div>
                <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "14px" }}>
                  Token Status
                </p>
                <p style={{ 
                  margin: "0", 
                  color: isAuthenticated() ? "#10b981" : "#ef4444", 
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: isAuthenticated() ? "#10b981" : "#ef4444",
                  }}></span>
                  {isAuthenticated() ? "Valid" : "Expired"}
                </p>
              </div>

              <div>
                <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "14px" }}>
                  Security
                </p>
                <p style={{ margin: "0", color: "#1e293b", fontWeight: "600" }}>
                  HTTPS Protected
                </p>
              </div>
            </div>

            <p style={{ 
              margin: "0", 
              fontSize: "13px", 
              color: "#94a3b8",
              paddingTop: "15px",
              borderTop: "1px solid #e2e8f0"
            }}>
              ⓘ Your session will automatically expire when the token is no longer valid. 
              This helps protect your account security.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        }}>
          <h3 style={{ 
            margin: "0 0 25px 0", 
            color: "#1e293b", 
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span>⚡</span> Quick Actions
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "20px",
                backgroundColor: "#f0f9ff",
                color: "#0369a1",
                border: "1px solid #e0f2fe",
                borderRadius: "8px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e0f2fe";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#f0f9ff";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#0284c7",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
              }}>
                🔄
              </div>
              <div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>Refresh Data</h4>
                <p style={{ margin: "0", fontSize: "13px", color: "#64748b" }}>
                  Reload dashboard information
                </p>
              </div>
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: "20px",
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#fee2e2";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#fef2f2";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#dc2626",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
              }}>
                🚪
              </div>
              <div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>Logout</h4>
                <p style={{ margin: "0", fontSize: "13px", color: "#dc2626" }}>
                  End your current session
                </p>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: "50px",
        padding: "20px",
        backgroundColor: "#1e293b",
        color: "#cbd5e1",
        textAlign: "center",
        fontSize: "14px",
      }}>
        
      </footer>
    </div>
  );
};

export default Dashboard;