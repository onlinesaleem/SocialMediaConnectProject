// src/app/layout.tsx
import Providers from "./components/Providers";
import '../styles/global.css';





export const metadata = {
  title: "MySaaS",
  description: "Your SaaS application description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
