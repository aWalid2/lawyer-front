import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    { name: "خدماتنا", href: "/services" },
    { name: "فريق العمل", href: "/team" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  return (
    <header className="w-full bg-[#f4efe7] border-b" dir="rtl">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo (Right side in RTL) */}
          <div className="flex items-center gap-3">
            <img
              src="/public/images/logo.webp"
              alt="logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-primary transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Left Section (Login + Mobile Menu) */}
          <div className="flex items-center gap-4">
            {/* Desktop Login Button */}
            <Button
              className={cn(
                "hidden md:inline-flex bg-[#c7a65c] hover:bg-[#b8954d] text-white rounded-lg px-6",
              )}
            >
              تسجيل الدخول
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden">
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              </SheetTrigger>
              <SheetHeader className="hidden">
                <SheetTitle>القائمة</SheetTitle>
              </SheetHeader>
              <SheetDescription className="hidden">
                قائمة التنقل الخاصة بالموقع
              </SheetDescription>

              <SheetContent side="left" className="w-72 bg-white">
                <div className="flex flex-col gap-6 mt-10 text-right">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-medium hover:text-primary transition"
                    >
                      {link.name}
                    </Link>
                  ))}

                  <Button className="mt-6 bg-[#c7a65c] hover:bg-[#b8954d] text-white rounded-lg">
                    تسجيل الدخول
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
