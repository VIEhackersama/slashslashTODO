import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SlashSlashTODO. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};
