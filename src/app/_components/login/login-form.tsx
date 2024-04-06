'use client';

import { Alert, Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Router from 'next/router';
import React, { useCallback, useState } from 'react';

interface ILoginFormValue {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [form] = useForm<ILoginFormValue>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const router = useRouter();
  const handleFinish = useCallback(async (value: ILoginFormValue) => {
    setIsLoading(true);

    try {
      console.log(value);
      const response = await signIn('login-credentials', {
        username: value.username,
        password: value.password,
      });
      console.log(response);
      alert('로그인에 성공했습니다.');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {/* {router?.query.error && router?.query.error !== 'CredentialsSignin' ? (
        <div className='mb-3'>
          <Alert
            message={`로그인 중 오류가 발생했습니다. ${router?.query.error}`}
            type='warning'
          />
        </div>
      ) : null} */}

      <Form<ILoginFormValue>
        form={form}
        layout='vertical'
        initialValues={{ username: '', password: '' }}
        onFinish={handleFinish}
      >
        <div className='mb-3'>
          {/* {router?.query.error === 'CredentialsSignin' ? (
            <>
              <Alert
                message='로그인을 실패했습니다. 아이디 또는 비밀번호를 다시 확인해주세요.'
                type='error'
              />
            </>
          ) : (
            <></>
          )} */}
        </div>
        <Form.Item
          name='username'
          rules={[{ required: true, message: '아이디를 입력해주세요' }]}
        >
          <Input size='large' placeholder='아이디' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        >
          <Input placeholder='비밀번호' type='password' size='large' />
        </Form.Item>

        <Button
          size='large'
          type='primary'
          htmlType='submit'
          className='w-full'
          loading={isLoading}
        >
          로그인
        </Button>
      </Form>
    </>
  );
};

export default React.memo(LoginForm);
