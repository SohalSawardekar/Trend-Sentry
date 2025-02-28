import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/users";
import { connectToDB } from "@/utils/db";
import bcrypt from "bcryptjs";

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

        if (!existingUser) {
          throw new Error("User not found.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }

        return {
          id: existingUser._id.toString(),
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role || "user",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      return session;
    },
    // async signIn({ account, profile }) {
    //   if (account.provider === "google") {
    //     await connectToDB();

    //     let user = await User.findOne({ email: profile.email });

    //     if (!user) {
    //       console.log("Creating a new Google user");
    //       user = await User.create({
    //         name: profile.name,
    //         email: profile.email,
    //         googleId: profile.sub, // Ensure `googleId` exists in the schema
    //         profile: profile.picture, // Store profile image
    //         dateJoined: new Date(),
    //         lastLoggedIn: new Date(),
    //       });
    //     } else {
    //       user.lastLoggedIn = new Date();
    //       await user.save();
    //     }
    //   }
    //   return true;
    // },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
