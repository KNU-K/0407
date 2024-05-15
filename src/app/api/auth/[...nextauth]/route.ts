import axios from "axios";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider, {
  CredentialsConfig,
} from "next-auth/providers/credentials";

interface MyJwtPayload {
  exp: number;
}

interface ExtendedSession extends Session {
  isExpired?: boolean;
}

function parseJwt(token: string): MyJwtPayload {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const credentialsProviderOption: CredentialsConfig<{}> = {
  type: "credentials",
  id: "login-credentials",
  name: "login-credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials: Record<string, unknown> | undefined) {
    const response = await axios.post(
      "https://api.g-start-up.com/api/auth/login",
      { email: credentials?.username, password: credentials?.password }
    );
    if (response.data.accessToken) {
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

const handler = NextAuth({
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verify=1",
    error: "/login",
  },
  providers: [CredentialsProvider(credentialsProviderOption)],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = (user as Session["user"]).id;
        token.login = (user as Session["user"]).login;
        token.accessToken = (user as Session["user"]).id; // accessToken 저장
        const decodedToken = parseJwt(token.accessToken as string); // 타입을 명시적으로 지정
        token.accessTokenExpires = decodedToken.exp * 1000; // 만료 시간 저장
      }
      console.log("만료시간확인", token.accessTokenExpires as number);
      const timeresult = Date.now();
      console.log("시간결과확인", timeresult);
      // 토큰 만료 검사
      if (
        token.accessTokenExpires &&
        typeof token.accessTokenExpires === "number" &&
        Date.now() > token.accessTokenExpires
      ) {
        token.isExpired = true; // 토큰 만료 표시
      }

      return token;
    },
    session({ session, token }) {
      const extSession = session as ExtendedSession;
      if (token.isExpired) {
        extSession.isExpired = true;
      }

      session.user = {
        ...session.user,
        id: token.id as string,
        login: token.login as string,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
