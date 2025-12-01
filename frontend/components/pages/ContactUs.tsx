"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/common/NavBar";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted");
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors relative overflow-hidden font-sans">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10 flex-grow flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground">
              Found a bug? Have a feature request? Or just want to say hi?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-card/50 p-8 rounded-2xl border border-border shadow-lg backdrop-blur-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-muted-foreground"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      required
                      type="text"
                      placeholder="John Doe"
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-muted-foreground"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe your issue or idea..."
                    className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/20"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center space-y-8 pl-0 lg:pl-12">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-lg">
                    Email Support
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    support@slashslashtodo.com
                  </p>
                </div>
              </div>
              {/* ... Thêm các icon khác nếu cần ... */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
