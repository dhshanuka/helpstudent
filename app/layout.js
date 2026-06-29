import "./globals.css";

export const metadata = {
  title: "A/L Student Support Desk | Department of Examinations Sri Lanka",
  description: "Official support desk of the Department of Examinations, Sri Lanka. Advanced Level (A/L) candidates can submit urgent issues regarding registrations, center allocations, and admission cards.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
