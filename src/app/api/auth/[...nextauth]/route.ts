import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/Models/userModel';


const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      // Store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id;
      }

      return session;
    },
    async signIn({ user, account }: any) {
      const { name, email, image } = user;

      try {
        await dbConnect();

        // Check if the account provider is Google or GitHub
        if (account?.provider === 'google' || account?.provider === 'github') {
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            await User.create({ name, email, image });
          }
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
