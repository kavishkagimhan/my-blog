import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Export the auth configuration separately
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
      return adminEmails.includes(user.email);
    },
    async session({ session, token }) {
      const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
      session.user.isAdmin = adminEmails.includes(session.user.email);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
        token.isAdmin = adminEmails.includes(user.email);
      }
      return token;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt'
  }
};

// Create the handler using authOptions
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };