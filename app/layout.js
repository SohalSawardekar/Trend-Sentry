import "@/styles/globals.css";

export const metadata = {
  title: "Trend Sentry",
  description: "",
  icons: {
    icon: "/logo/Trend_Sentry.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
