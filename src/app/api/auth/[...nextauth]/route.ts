import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/Models/userModel';

 const authOptions =  {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile } : any) {
      if (account?.provider === 'google') {
        const { name, email } = user;
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            await User.create({ name, email });
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

