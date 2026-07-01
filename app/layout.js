import "./globals.css";

export const metadata = {
  title: "A/L Student Support Desk | Department of Examinations Sri Lanka",
  description: "Official support desk of the Department of Examinations, Sri Lanka. Advanced Level (A/L) candidates can submit urgent issues regarding registrations, center allocations, and admission cards.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full flex flex-col antialiased relative overflow-x-hidden">
        {/* Decorative background glow rings */}
        <div className="bg-glow-purple top-0 left-0" />
        <div className="bg-glow-blue bottom-0 right-0" />
        
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
