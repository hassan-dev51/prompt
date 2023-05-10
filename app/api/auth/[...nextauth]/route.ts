import User from "@models/user";
import { connectDB } from "@utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({ email: session.user?.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }: any) {
      try {
        await connectDB();
        const UserExits = await User.findOne({ email: profile.email });

        if (!UserExits) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        } else {
          console.log("user already exists");
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
