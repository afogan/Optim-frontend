import { useState } from "react";
import { GoogleIcon } from "../Components/icons.jsx";
import Logo from "../Components/Logo.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

export default function LoginPage({ onBack }) {
  const { login, loginWithPassword, signup } = useAuth();
  const [mode, setMode] = useState(null); // null | "login" | "signup"
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    setError(null);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      if (mode === "signup") {
        await signup({
          username,
          password,
          name: formData.get("name"),
          email: formData.get("email"),
        });
      } else {
        await loginWithPassword(username, password);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-page-logo">
        <Logo />
      </div>

      <div className="login-card">
        <h1>Welcome to Optim</h1>
        <p>To get started, please sign in</p>

        <button className="google-btn" onClick={login}>
          <GoogleIcon />
          Continue with Google
        </button>

        {!mode && (
          <div className="local-auth-toggle">
            <button className="link-btn" onClick={() => setMode("login")}>
              Log in with a username instead
            </button>
            <button className="link-btn" onClick={() => setMode("signup")}>
              Create a local account
            </button>
          </div>
        )}

        {mode && (
          <form className="local-auth-form" action={handleSubmit}>
            {mode === "signup" && (
              <>
                <label>
                  Name
                  <input type="text" name="name" />
                </label>
                <label>
                  Email
                  <input type="email" name="email" />
                </label>
              </>
            )}
            <label>
              Username
              <input type="text" name="username" required />
            </label>
            <label>
              Password
              <input type="password" name="password" required minLength={8} />
            </label>
            <button type="submit" className="local-auth-submit">
              {mode === "signup" ? "Create account" : "Log in"}
            </button>
            {error && <output className="local-auth-error">{error}</output>}
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setMode(mode === "signup" ? "login" : "signup");
                setError(null);
              }}
            >
              {mode === "signup"
                ? "Already have an account? Log in"
                : "Need an account? Sign up"}
            </button>
          </form>
        )}

        <button className="login-back" onClick={onBack}>
          Back to home
        </button>
      </div>

      <div className="login-page-footer">
        <span>Support</span>
        <span>Terms</span>
        <span>Privacy</span>
      </div>
    </div>
  );
}
