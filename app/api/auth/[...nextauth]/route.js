import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import connectToDB from "@/utils/db";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const existingUser = await User.findOne({ email: credentials.email });

        if (!existingUser) return null;

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!isValidPassword) return null;

        return {
          id: existingUser._id.toString(), // ✅ Use MongoDB ObjectId
          email: existingUser.email,
          name: existingUser.name,
          profile: existingUser.profile || "",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await User.findOne({ email: user.email }); // Fetch user from DB
        token.id = dbUser ? dbUser._id.toString() : user.id; // ✅ Ensure ObjectId is used
        token.email = user.email;
        token.name = user.name;
        token.profile = user.profile || "";
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        picture: token.profile,
      };
      return session;
    },

    async signIn({ account, profile }) {
      if (account.provider === "google") {
        await connectToDB();

        let user = await User.findOne({ email: profile.email });

        if (!user) {
          console.log("Creating a new Google user");
          user = await User.create({
            name: profile.name,
            email: profile.email,
            googleId: profile.sub,
            profile: profile.picture,
          });
        }

        return true;
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
