import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="py-4">
      <Separator className="mb-4" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-11 text-center">
          <div className="md:space-y-4">
            <h3 className="font-bold md:text-lg">Grow As Enginner</h3>
            <p className="text-sm md:text-md">
              Providing innovative solutions since 2024
            </p>
          </div>
          <div className="md:space-y-4">
            <h3 className="font-bold md:text-lg">Contact</h3>
            <span className="flex items-center space-x-2 justify-center text-sm md:text-md">
              <Mail size={16} />
              <span>info@growasengineer.com</span>
            </span>
            <span className="flex items-center space-x-2 justify-center text-sm md:text-md">
              <Phone size={16} />
              <span>+1 (0001) 0001-0001</span>
            </span>
          </div>
          <div className="space-y-1 md:space-y-4">
            <h3 className="font-bold md:text-lg">Support</h3>
            <ul className="md:space-y-2 text-sm md:text-md">
              <li>
                <Link href="/about" className="hover:cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:cursor-pointer">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:space-y-4">
            <h3 className="font-bold md:text-lg">Follow Us</h3>
            <div className="flex md:space-x-4 justify-center">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="text-center text-sm md:text-md">
          <p>
            &copy; {new Date().getFullYear()} Grow As Engineer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
