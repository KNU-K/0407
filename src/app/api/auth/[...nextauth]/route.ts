import axios from "axios";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const credentialsProviderOption: CredentialsConfig<{}> = {
  type: "credentials",
  id: "login-credentials",
  name: "login-credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials: Record<string, unknown> | undefined) {
    const response = await axios.post("https://api.g-start-up.com/api/auth/login", { email : credentials?.username, password : credentials?.password});
   if (response.data.accessToken){
    return {
        id: response.data.accessToken as string,
        login: "admin",
        name: "관리자",
        email: "",
        image: "",
      };
   }
   
    return null;
  },
};



const handler =  NextAuth({
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verify=1",
    error: "/login",
  },
  providers: [
    CredentialsProvider(credentialsProviderOption),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = (user as Session["user"]).id;
        token.login = (user as Session["user"]).login;
      }
      return token;
    },
    session({ session, token }) {
      session.user = { ...session.user, id: token.id as string, login: token.login as string };
      return session;
    },
  },
});

export { handler as GET, handler as POST}