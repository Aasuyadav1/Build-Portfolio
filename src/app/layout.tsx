import type { Metadata } from "next";
import { Inter , Poppins} from "next/font/google";
import "./globals.css";
import SideNavbar from "@/components/SideNavbar";
import Provider from "@/components/Provider";
import { Toaster } from 'sonner'
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAnalytics from "@/components/GoogleAnalytics";
 
const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "myPortfolio",
  description: "myPortfolio enables you to effortlessly display your work to the world. It is fully responsive, customizable, and simple to set up.",
  icons: {
    icon: "https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={inter.className}>
        <Provider>
          <Toaster />
          <TooltipProvider>
        <div className="flex flex-col gap-1 md:flex-row md:gap-2">
          {/* <SideNavbar /> */}
          <div className="  w-full h-full">{children}</div>
        </div>
        </TooltipProvider>
        </Provider>
      </body>
    </html>
  );
}