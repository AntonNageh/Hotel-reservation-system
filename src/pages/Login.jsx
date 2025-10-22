import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      dispatch(
        login({
          id: Date.now().toString(),
          name: email.split("@")[0],
          email,
        })
      );
      toast.success("Login successful!");
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-background flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card/70 backdrop-blur-lg shadow-xl border border-border rounded-2xl p-8">
            <header className="text-center mb-8 space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome Back !
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your credentials to access your account.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    error ? "border-destructive" : "border-input"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    error ? "border-destructive" : "border-input"
                  }`}
                />
              </div>

              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary text-primary-foreground font-medium py-2.5 transition hover:bg-primary/90 disabled:opacity-70"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
