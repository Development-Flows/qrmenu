// import "./globals.css";
import "./styles/reset.css";
import { Plus_Jakarta_Sans } from "next/font/google";
const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});
import Providers from "../Providers";

export const metadata = {
  title: "Sedir Kafe Menü",
  description: "Kafe & Fast Food",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={plus_Jakarta_Sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
