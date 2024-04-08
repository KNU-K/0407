'use client';
import { CMS_NAME } from '@/lib/constants';
import { Button } from 'antd';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { sign } from 'crypto';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from './shared/spinner';
import { Pointer } from 'lucide-react';
import { SmileOutlined } from '@ant-design/icons';


export function Intro() {
  const { data: session, status } = useSession();
  const routeHomePageHandler = (e:any)=>{
    location.href = "/"
  }


  return (
    <section className='flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12'>
      
      <h1 style={{cursor:'pointer'}} className='text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8' onClick={(e:any)=>routeHomePageHandler(e)}>
        G - Start Up
      </h1>
      <nav>
        <ul className='flex' style={{ alignItems: 'center' }}>
          <li className='mr-6'>
            <Link as={`/`} href='/' className='hover:underline'>
              홈
            </Link>
          </li>
          <li className='mr-6'>
            <Link
              as={`/business-notice`}
              href='/business-notice'
              className='hover:underline'
            >
              사업공고
            </Link>
          </li>
          <li className='mr-6'>
            <Link
              as={`/card-news`}
              href='/card-news'
              className='hover:underline'
            >
              카드뉴스
            </Link>
          </li>
          <li className='mr-6'>
            <Link as={`/space`} href='/space' className='hover:underline'>
              창업공간
            </Link>
          </li>
          <li className='mr-6'>
            <Link
              as={`/community`}
              href='/community'
              className='hover:underline'
            >
              경험공유
            </Link>
          </li>
          {status !== 'unauthenticated' ? (
            <Button
              onClick={() => {
                signOut();
              }}
              type='primary'
            >
              로그아웃
            </Button>
          ) : (
            <>
              <Link as={`/login`} href='/login' className='hover:underline'>
                <Button type='primary'>로그인</Button>
              </Link>
              <Link as={`/join`} href='/join' className='hover:underline'>
                <Button type='primary' style={{ marginLeft: '8px' }}>회원가입</Button>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </section>
  );
}
