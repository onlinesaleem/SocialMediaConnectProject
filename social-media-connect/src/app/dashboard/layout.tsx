// src/app/layout.tsx
import "../globals.css";
import Providers from "@/app/components/Providers"; // Adjust the import path as necessary
import Navbar from "@/app/components/Navbar"; // Adjust the import path as necessary


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
       <Navbar />
      {/* You can include a Navbar or other components specific to the dashboard here */}
      {children}
    </>
  );
}

