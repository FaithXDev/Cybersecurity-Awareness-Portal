import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Award, Shield, Calendar, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface CertificateGeneratorProps {
  courseTitle: string;
  courseId: string;
  completionDate?: Date;
}

export function CertificateGenerator({
  courseTitle,
  courseId,
  completionDate = new Date(),
}: CertificateGeneratorProps) {
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (certificateRef.current) {
      // Create a canvas to render the certificate
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size
      canvas.width = 1200;
      canvas.height = 800;

      if (ctx) {
        // Background
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Border
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Inner border
        ctx.strokeStyle = "#60a5fa";
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        // Header
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("CERTIFICATE OF COMPLETION", canvas.width / 2, 150);

        // Subtitle
        ctx.font = "32px Arial";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("Cybersecurity Awareness Portal", canvas.width / 2, 200);

        // Main text
        ctx.font = "28px Arial";
        ctx.fillStyle = "#f8fafc";
        ctx.fillText("This is to certify that", canvas.width / 2, 280);

        // Name
        ctx.font = "bold 56px Arial";
        ctx.fillStyle = "#3b82f6";
        const displayName =
          user?.role === "admin" ? "Administrator" : "Demo User";
        ctx.fillText(displayName, canvas.width / 2, 360);

        // Course completion text
        ctx.font = "28px Arial";
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(
          "has successfully completed the course",
          canvas.width / 2,
          420,
        );

        // Course title
        ctx.font = "bold 40px Arial";
        ctx.fillStyle = "#10b981";
        ctx.fillText(courseTitle, canvas.width / 2, 480);

        // Date
        ctx.font = "24px Arial";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(
          `Completed on ${completionDate.toLocaleDateString()}`,
          canvas.width / 2,
          560,
        );

        // Footer
        ctx.font = "20px Arial";
        ctx.fillText("Cybersecurity Awareness Portal", canvas.width / 2, 700);
        ctx.fillText(
          "Professional Cybersecurity Training Certification",
          canvas.width / 2,
          730,
        );

        // Download the certificate
        const link = document.createElement("a");
        link.download = `${courseTitle.replace(/\s+/g, "_")}_Certificate_${displayName.replace(/\s+/g, "_")}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  const displayName = user?.role === "admin" ? "Administrator" : "Demo User";

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-8">
          <div
            ref={certificateRef}
            className="certificate-container bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-lg border-4 border-primary/50 text-center space-y-6"
          >
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mr-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white">
                CERTIFICATE OF COMPLETION
              </h1>
              <p className="text-xl text-primary">
                Cybersecurity Awareness Portal
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-6 py-8">
              <p className="text-lg text-gray-300">This is to certify that</p>

              <div className="space-y-2">
                <h2 className="text-5xl font-bold text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  {displayName}
                </h2>
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <User className="h-4 w-4" />
                  <span className="text-sm">
                    {user?.role === "admin"
                      ? "System Administrator"
                      : "Certified Learner"}
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-300">
                has successfully completed the course
              </p>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-success">
                  {courseTitle}
                </h3>
                <p className="text-sm text-gray-400">
                  Professional Cybersecurity Training Program
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Completed on {completionDate.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-600 pt-6 space-y-2">
              <p className="text-sm text-gray-400">
                Cybersecurity Awareness Portal
              </p>
              <p className="text-xs text-gray-500">
                Professional Cybersecurity Training Certification
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span>
                  Certificate ID: {courseId.toUpperCase()}-{Date.now()}
                </span>
                <span>•</span>
                <span>
                  Verification Code: CS-
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      <div className="text-center">
        <Button
          onClick={handleDownload}
          size="lg"
          className="px-8 py-3 text-lg"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Certificate
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Download your personalized completion certificate
        </p>
      </div>
    </div>
  );
}
