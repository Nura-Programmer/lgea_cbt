"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  KeyRound,
  UserCircle,
} from "lucide-react";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applicants", label: "Applicants", icon: Users },
  { href: "/admin/questions", label: "Questions", icon: FileText },
  { href: "/admin/tokens", label: "Tokens", icon: KeyRound },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-white shadow-md flex flex-col border-r">
      {/* Logo */}
      <Link href="/admin/dashboard" className="p-4 border-b">
        <Image
          src="/images/subebjgw.png"
          alt="SUBEB Jigawa"
          width={180}
          height={50}
          className="mx-auto"
        />
      </Link>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              pathname === href
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Profile Footer */}
      <div className="p-4 border-t mt-auto flex items-center gap-3">
        <UserCircle className="h-6 w-6 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Admin</span>
      </div>
    </aside>
  );
}
