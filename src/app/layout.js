import { Outfit } from "next/font/google";
import "./globals.css";

const OutfitFont = Outfit({ variable: "--font-outfit", subsets: ["latin"]});

export const metadata = 
{
  title: "Primetrade",
  description: "Primetrade frontend assignment",
};

export default function RootLayout({ children }) 
{
  return (
    <html lang="en">
      <body className={`${OutfitFont.variable} antialiased bg-gray-200 dark:bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}
