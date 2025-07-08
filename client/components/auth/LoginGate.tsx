import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function LoginGate() {
  const { login } = useAuth();

  const handleDemoLogin = async () => {
    await login("user", "user");
  };

  const handleAdminLogin = async () => {
    await login("admin", "admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Cybersecurity Portal</h1>
            <p className="text-muted-foreground">
              Sign in to access your security training
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Access Required</CardTitle>
            <CardDescription>
              Please sign in to access this page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Link to="/login">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or use demo access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleDemoLogin}
                className="w-full"
              >
                <User className="h-4 w-4 mr-2" />
                Demo User
              </Button>
              <Button
                variant="outline"
                onClick={handleAdminLogin}
                className="w-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Secure access to cybersecurity training and resources</p>
        </div>
      </div>
    </div>
  );
}
