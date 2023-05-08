import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Session } from "next-auth";

interface RootLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

export const metadata = {
  title: "Prompt",
  description: "Discover and share AI information through prompts.",
};

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
