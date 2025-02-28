import "@/styles/globals.css";
import Provider from "@/components/providers";

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
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
