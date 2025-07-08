import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Eye, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background with professional cybersecurity image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/5475786/pexels-photo-5475786.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-primary/20 animate-pulse">
          <Shield className="h-8 w-8" />
        </div>
        <div className="absolute top-32 right-20 text-primary/20 animate-pulse delay-1000">
          <Lock className="h-6 w-6" />
        </div>
        <div className="absolute bottom-32 left-20 text-primary/20 animate-pulse delay-500">
          <Eye className="h-7 w-7" />
        </div>
        <div className="absolute bottom-20 right-10 text-warning/30 animate-pulse delay-700">
          <AlertTriangle className="h-6 w-6" />
        </div>
      </div>

      <div className="container relative px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-8">
            <Shield className="mr-2 h-4 w-4" />
            Cybersecurity Education Platform
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Cybersecurity
            </span>{" "}
            <span className="text-foreground">Awareness</span>{" "}
            <span className="text-foreground">Portal</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Learn, practice, and stay updated with the latest cybersecurity
            threats, techniques, and best practices through our comprehensive
            platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link to="/learning">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 h-auto"
              asChild
            >
              <Link to="/quiz">Take Security Quiz</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">
                Security Courses
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">
                Students Trained
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">
                Threat Monitoring
              </div>
            </div>
          </div>

          {/* Featured Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/30965500/pexels-photo-30965500.jpeg"
                alt="Cybersecurity Training"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">Security Training</h3>
                <p className="text-sm opacity-90">Expert-led courses</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/6963062/pexels-photo-6963062.jpeg"
                alt="Threat Analysis"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">Threat Analysis</h3>
                <p className="text-sm opacity-90">Real-world scenarios</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/5475786/pexels-photo-5475786.jpeg"
                alt="Cybersecurity Protection"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">Digital Protection</h3>
                <p className="text-sm opacity-90">Advanced security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
