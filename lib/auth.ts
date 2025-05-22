import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

const fakeUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: await bcrypt.hash("admin123", 10), // hashed version
  },
];

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = fakeUsers.find(u => u.email === credentials?.email);
        if (user && credentials?.password && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
