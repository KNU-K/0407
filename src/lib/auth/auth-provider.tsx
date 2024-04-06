'use client';
import Spinner from '@/app/_components/shared/spinner';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';

interface IAuthProviderProps {}

interface IAuthContext {
  initialized: boolean;
  session: Session;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result?.initialized) {
    throw new Error('Auth context must be used within a AuthProvider!');
  }
  return result;
}

const publicPageList = ['/login'];

const isPublicPage = (pathname: string) => {
  return publicPageList.includes(pathname);
};

const AuthProvider = ({ children }: PropsWithChildren<IAuthProviderProps>) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default React.memo(AuthProvider);
