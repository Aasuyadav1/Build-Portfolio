import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SideNavbar from "@/components/SideNavbar";
import Provider from "@/components/Provider";
import { Toaster } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "myPortfolio",
  description: "myPortfolio enables you to effortlessly display your work to the world. It is fully responsive, customizable, and simple to set up.",
  icons: {
    icon: "https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png",
  },
  viewport: "width=device-width, initial-scale=1",
  keywords: [
    "portfolio",
    "responsive portfolio",
    "customizable portfolio",
    "showcase",
    "web development",
    "frontend development",
    "personal website",
    "portfolio website",
    "web designer",
    "creative portfolio",
    "developer portfolio",
    "portfolio template",
    "modern portfolio",
    "digital portfolio",
    "interactive portfolio",
    "portfolio builder",
    "online portfolio",
    "professional portfolio",
  ],
  author: "Your Name",
  openGraph: {
    title: "myPortfolio",
    description: "Effortlessly display your work to the world with myPortfolio. Fully responsive and customizable.",
    url: "https://yourwebsite.com",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png",
        width: 800,
        height: 600,
        alt: "myPortfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "myPortfolio",
    description: "Effortlessly display your work to the world with myPortfolio. Fully responsive and customizable.",
    image: "https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png",
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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <link rel="icon" href={metadata.icons.icon} />
      </head>
      <body className={inter.className}>
        <Provider>
          <Toaster />
          <TooltipProvider>
            <div className="flex flex-col gap-1 md:flex-row md:gap-2">
              {/* <SideNavbar /> */}
              <main className="w-full h-full">
                {children}
              </main>
            </div>
          </TooltipProvider>
        </Provider>
      </body>
    </html>
  );
}
