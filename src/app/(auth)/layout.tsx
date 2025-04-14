// src/app/(main)/layout.tsx


// import Sidebar from "@/components/layout/Sidebar";
// import Navbar from "@/components/layout/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex">
        {/* <Sidebar /> */}
        Sidebar
        <div className="flex-1">
          {/* <Navbar /> */}
          Navbar
          <main className="p-4">{children}</main>
        </div>
      </div>
  );
}
