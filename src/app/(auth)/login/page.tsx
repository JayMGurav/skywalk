"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plane } from "lucide-react";
import Link from "next/link";
import { ProgressiveBlur } from "@/components/progressive-blur";

import { login } from "./actions";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex">
      {/* Left side - Image */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src="https://safer-america.com/wp-content/uploads/2024/08/1605-1024-1140x641.jpg"
          alt="Santorini"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <ProgressiveBlur
          className="pointer-events-none absolute bottom-0 left-0 h-[30%] w-full"
          blurIntensity={4}
        />
        {/* <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" /> */}
        <div className="absolute inset-0 flex items-end p-4">
          <div className="text-left space-y-4">
            <h2 className="text-4xl font-bold text-white">SkyWalk</h2>
            <p className="text-lg text-white/80">
              Your Gateway to Seamless Flight Bookings, Anytime, Anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 text-primary">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to home</span>
            </Link>
            <div className="flex items-center">
              <Plane className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">SkyWay</span>
            </div>
          </div>

          <Card className="p-8 animate-fade-up">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign in to your account</h1>
                <p className="text-muted-foreground">
                  Enter your email below to access your account
                </p>
              </div>

              <form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <Button formAction={login} className="w-full" size="lg">
                  Sign in
                </Button>
              </form>

              <div className="text-center text-sm">
                <Link href="/signup" className="text-primary hover:underline">
                  Don&apos;t have an account? Sign up
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
