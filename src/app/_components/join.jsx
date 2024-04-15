'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Space, Typography, DatePicker, Radio, Checkbox, Modal } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Signup = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: '',
    nationality: '',
    region: '',
    tel: '',
    role: '',
    interests: ''
  });
  const [visibleServiceModal, setVisibleServiceModal] = useState(false);
  const [visiblePrivacyModal, setVisiblePrivacyModal] = useState(false);
  // 비밀번호 형식을 지정하는 정규표현식
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //04/15 정규화 방식 변경 : 대문자, 소문자, 숫자 포함 8자 이상(특수문자 조건 삭제)

// 비밀번호 입력값 변경 시 처리
const handlePasswordInputChange = (e) => {
  const passwordValue = e.target.value;
  setFormData((prevFormData) => ({
    ...prevFormData,
    password: passwordValue,
  }));
};

// 비밀번호 유효성 검사 함수
const isPasswordValid = (password) => {
  return passwordRegex.test(password);
};

  const handleFormFinish = () => {
    if (step === 1) {
      handleNextButtonClick();
    } else {
      if (!formData.serviceAgreement || !formData.privacyPolicy) {
        alert('서비스 이용약관과 개인정보 수집 및 동의에 모두 동의해주세요!');
        return;
      }
      handleFormSubmit();
    }
  };

  // 전화번호 유효성 검사 함수
  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  // 전화번호 입력값 변경 시 처리
  const handleTelInputChange = (e) => {
    const telValue = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tel: telValue,
    }));
  };

  // 다음으로 버튼 클릭 이벤트 처리
// 다음으로 버튼 클릭 이벤트 처리
const handleNextButtonClick = () => {
  if (step === 1) {
    if (!isPhoneNumberValid(formData.tel)) {
      alert('올바른 전화번호 형식을 입력해주세요.');
      return;
    } else if (!isPasswordValid(formData.password)) {
      alert('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자가 최소한 하나씩 포함되어야 합니다.');
      return;
    } else {
      setStep(2);
    }
  }
};

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      await onFinish(formData);
      console.log('회원가입이 성공적으로 완료되었습니다.');
    } catch (error) {
      console.error('회원가입에 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (modal) => {
    if (modal === 'service') {
      setVisibleServiceModal(true);
    } else if (modal === 'privacy') {
      setVisiblePrivacyModal(true);
    }
  };

  const handleCancel = () => {
    setVisibleServiceModal(false);
    setVisiblePrivacyModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px', transition: 'all 0.3s' }}>
        <Title level={2} style={{ marginTop: '2px', opacity: step === 1 ? 1 : 0, transform: `translateY(${step === 1 ? 0 : -20}px)`, transition: 'opacity 0.3s, transform 0.3s' }}>
          당신이 누구인지 궁금해요!
        </Title>
        <Title level={2} style={{ opacity: step === 2 ? 1 : 0, transform: `translateY(${step === 2 ? 0 : -20}px)`, transition: 'opacity 0.3s, transform 0.3s' }}>
          당신의 생각이 궁금해요!
        </Title>
      </div>
      <Form
  name={step === 1 ? 'signup_form_step1' : 'signup_form_step2'}
  initialValues={{ remember: true }}
  onFinish={handleFormFinish}
  style={{ width: '500px', transition: 'all 0.3s' }}
>

        {step === 1 ? (
          <>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '사용자명을 입력해주세요!' }]}
              style={{ marginTop: '5px' }}
            >
              <Input
                placeholder="사용자명"
                onChange={(e) => handleInputChange('username', e.target.value)}
                style={{ height: '60px' }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: '이메일을 입력해주세요!' }]}
            >
              <Input
                type="email"
                placeholder="이메일(아이디)"
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{ height: '60px' }}
              />
            </Form.Item>
            <Form.Item
  name="password"
  rules={[
    { required: true, message: '비밀번호를 입력해주세요!' },
    { validator: (_, value) => isPasswordValid(value) ? Promise.resolve() : Promise.reject('비밀번호 형식을 확인해주세요. 비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자가 최소한 하나씩 포함되어야 합니다.') }
  ]}
>
  <Input.Password
    placeholder="비밀번호"
    onChange={handlePasswordInputChange}
    style={{ height: '60px' }}
  />
</Form.Item>

            <Form.Item
              name="birthdate"
              rules={[{ required: true, message: '생년월일을 선택해주세요!' }]}
            >
              <DatePicker
                placeholder="생년월일"
                onChange={(date, dateString) => handleInputChange('birthdate', dateString)}
                style={{ height: '60px', width: '500px' }}
                allowClear={false}
              />
            </Form.Item>

            <Form.Item
              name="nationality"
              rules={[{ required: true, message: '국적을 입력해주세요!' }]}
            >
              <Input
                placeholder="국적"
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                style={{ height: '60px' }}
              />
            </Form.Item>

            <Form.Item
              name="region"
              rules={[{ required: true, message: '지역을 입력해주세요!' }]}
            >
              <Input
                placeholder="지역"
                onChange={(e) => handleInputChange('region', e.target.value)}
                style={{ height: '60px' }}
              />
            </Form.Item>
            <Form.Item
              name="tel"
              rules={[{ required: true, message: '전화번호를 입력해주세요!' }]}
            >
              <Input
                placeholder="전화번호(000-0000-0000)"
                // onChange={(e) => handleInputChange('tel', e.target.value)}
                onChange={handleTelInputChange}
                style={{ height: '60px' }}
              />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              name="role"
              rules={[{ required: true, message: '역할을 선택해주세요!' }]}
            >
              <Radio.Group onChange={(e) => handleInputChange('role', e.target.value)}>
                <Radio.Button value="Sponsor">기업가</Radio.Button>
                <Radio.Button value="Entrepreneur">투자자</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="interests"
              rules={[{ required: true, message: '관심분야에 대해 이야기해주세요!' }]}
            >
              <Input.TextArea
                placeholder="내 관심분야 (최대 50자)"
                onChange={(e) => handleInputChange('interests', e.target.value)}
                style={{ height: '120px' }}
                maxLength={50}
              />
            </Form.Item>

<Form.Item
  name="serviceAgreement"
  valuePropName="checked"
  rules={[{ required: true, message: '서비스 이용약관에 동의해주세요!' }]}
>
  <Checkbox
    onChange={(e) => handleInputChange('serviceAgreement', e.target.checked)}
  >
    서비스 이용약관(필수) <Button type="link" onClick={() => showModal('service')}>보기</Button>
  </Checkbox>
</Form.Item>

<Form.Item
  name="privacyPolicy"
  valuePropName="checked"
  rules={[{ required: true, message: '개인정보 수집 및 동의에 동의해주세요!' }]}
>
  <Checkbox
    onChange={(e) => handleInputChange('privacyPolicy', e.target.checked)}
  >
    개인정보 수집 및 동의(필수) <Button type="link" onClick={() => showModal('privacy')}>보기</Button>
  </Checkbox>
</Form.Item>

          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Space>
            {step === 2 && (
              <Button type="default" onClick={() => setStep(1)} style={{ marginRight: '50px' }}>
                이전으로
              </Button>
            )}
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={step === 1 ? <ArrowRightOutlined /> : null}
              style={{
                transform: `translateX(${step === 1 ? 0 : '-50%'})`,
                transition: 'transform 0.3s',
                // marginBottom: '130px'
              }}
              // onClick={handleNextButtonClick} 
            >
              {step === 1 ? '다음으로' : '가입완료'}
            </Button>
          </Space>
        </div>
      </Form>

      <Modal
  title="서비스 이용약관"
  open={visibleServiceModal} // visible 대신 open을 사용합니다.
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>
      닫기
    </Button>
  ]}
>
  <p>
  제 1 장 총칙

제 1 조 (목적)
본 약관은 케어온이 운영하는 G-STARTUP 운영홈페이지(이하 "당 사이트")에서 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.

제 2 조 (약관의 효력과 변경)
① 당 사이트는 이용자가 본 약관 내용에 동의하는 것을 조건으로 이용자에게 서비스를 제공하며, 당 사이트의 서비스 제공 행위 및 이용자의 서비스 사용 행위에는 본 약관을 우선적으로 적용하겠습니다.
② 당 사이트는 본 약관을 사전 고지 없이 변경할 수 있으며, 변경된 약관은 당 사이트 내에 공지함으로써 이용자가 직접 확인하도록 할 것입니다. 이용자가 변경된 약관에 동의하지 아니하는 경우 본인의 회원등록을 취소(회원탈퇴)할 수 있으며, 계속 사용할 경우에는 약관 변경에 대한 암묵적 동의로 간주됩니다. 변경된 약관은 공지와 동시에 그 효력을 발휘합니다.

제 3 조 (약관 외 준칙)
본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 기타 관련 법령의 규정에 의합니다.

제 4 조 (용어의 정의)
① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
 1. 이용자 : 본 약관에 따라 당 사이트가 제공하는 서비스를 받는 자
 2. 가 입 : 당 사이트가 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는 행위
 3. 회 원 : 당 사이트에 필요한 개인 정보를 제공하여 회원 등록을 한 자로서, 당 사이트의 정보 및 서비스를 이용할 수 있는 자
 4. 아이디 : 이용고객의 식별과 이용자가 서비스 이용을 위하여 이용자가 정한 문자와 숫자의 조합
 5. 비밀번호 : 아이디에 대한 본인 여부를 확인하기 위하여 사용되는 문자, 숫자, 특수문자 등의 조합
 6. 탈퇴 : 서비스 또는 회원이 이용계약을 종료하는 행위
② 본 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 이용규정에서 정의합니다.

제 2 장 서비스 제공 및 이용

제 5 조 (이용 계약의 성립)
① 이용계약은 이용자가 온라인으로 당 사이트에서 제공하는 이용계약 신청서를 작성하여 가입을 완료하는 것으로 성립됩니다.
② 당 사이트는 다음 각 호에 해당하는 경우에 가입을 취소할 수 있습니다.
 1. 다른 사람의 명의를 사용하여 신청하였을 때
 2. 이용 계약 신청서의 내용을 허위로 기재하였거나 신청하였을 때
 3. 사회의 안녕 질서 혹은 미풍양속을 저해할 목적으로 신청하였을 때
 4. 다른 사람의 당 사이트 서비스 이용을 방해하거나 그 정보를 도용하는 등의 행위를 하였을 때
 5. 당 사이트를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우
 6. 기타 당 사이트가 정한 이용신청요건이 미비 되었을 때
③ 당 사이트는 다음 각 호에 해당하는 경우 그 사유가 소멸될 때까지 이용계약 성립을 유보할 수 있습니다.
 1. 서비스 관련 제반 용량이 부족한 경우
 2. 기술상 장애 사유가 있는 경우
④ 당 사이트가 제공하는 서비스는 자체 개발하거나 다른 기관과의 협의 등을 통해 제공하는 일체의 서비스를 말하는 것이며, 그 내용을 변경할 경우에는 이용자에게 공지한 후 변경하여 제공할 수 있습니다.

제 6 조 (회원정보 사용에 대한 동의)
① 회원의 개인정보는 공공기관의 개인정보보호법에 의해 보호되며 당 사이트의  개인정보처리방침이 적용됩니다.
② 당 사이트의 회원 정보는 다음과 같이 수집, 사용, 관리, 보호됩니다.
 1. 개인정보의 수집 : 당 사이트는 회원 가입시 회원이 제공하는 정보를 수집합니다.
 2. 개인정보의 사용 : 당 사이트는 서비스 제공과 관련해서 수집된 회원정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않습니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이 있거나 방송통신심의위원회의 요청이 있는 경우 또는 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우, 회원이 당 사이트에 제공한 개인정보를 스스로 공개한 경우에는 그러하지 않습니다.
 3. 개인정보의 관리 : 회원은 개인정보의 보호 및 관리를 위하여 서비스의 개인정보관리에서 수시로 회원의 개인정보를 수정/삭제할 수 있습니다. 수신되는 정보 중 불필요하다고 생각되는 부분도 변경/조정할 수 있습니다. 개인정보의 이용기간은 이용자가 가입을 완료하고 개인정보관리에서 회원가입을 탈퇴하는 시점이며 보호기간도 동일합니다.
 4. 개인정보의 보호 : 회원의 개인정보는 오직 회원만이 열람/수정/삭제 할 수 있으며, 이는 전적으로 회원의 아이디와 비밀번호에 의해 관리되고 있습니다. 따라서 타인에게 본인의 아이디와 비밀번호를 알려주어서는 아니 되며, 작업 종료 시에는 반드시 로그아웃 해주시고, 웹 브라우저의 창을 닫아주시기 바랍니다(이는 타인과 컴퓨터를 공유하는 인터넷 카페나 도서관 같은 공공장소에서 컴퓨터를 사용하는 경우에 회원의 정보의 보호를 위하여 필요한 사항입니다.)

제 7 조 (회원의 정보 보안)
① 가입 신청자가 당 사이트 서비스 가입 절차를 완료하는 순간부터 회원은 입력한 정보의 비밀을 유지할 책임이 있으며, 회원의 아이디와 비밀번호를 타인에게 제공하여 발생하는 모든 결과에 대한 책임은 회원 본인에게 있습니다.
② 아이디와 비밀번호에 관한 모든 관리의 책임은 회원에게 있으며, 회원의 아이디나 비밀번호가 부정하게 사용되었다는 사실을 발견한 경우에는 즉시 당 사이트에 신고하여야 합니다. 신고를 하지 않음으로 인한 모든 책임은 회원 본인에게 있습니다.
③ 회원은 당 사이트 서비스의 사용 종료 시마다 정확히 접속을 종료하도록 해야 하며, 정확히 종료하지 아니함으로써 제3자가 이용자 또는 회원에 관한 정보를 이용하게 되는 등의 결과로 인해 발생하는 손해 및 손실에 대하여 당 사이트는 책임을 부담하지 아니합니다.

제 8 조 (서비스 이용시간)
① 서비스 이용시간은 당 사이트의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.
② 제1항의 이용시간은 정기점검 등의 필요로 인하여 당 사이트가 정한 날 또는 시간 및 예기치 않은 사건사고로 인한 시간은 예외로 합니다.

제 9 조 (서비스의 중지 및 정보의 저장과 사용)
① 당 사이트 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 국가의 비상사태, 정전, 당 사이트의 관리 범위 외의 서비스 설비 장애 및 기타 불가항력에 의하여 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 당 사이트는 관련 책임을 부담하지 아니합니다.
② 당 사이트가 정상적인 서비스 제공의 어려움으로 인하여 일시적으로 서비스를 중지하여야 할 경우에는 서비스 중지 1주일 전의 고지 후 서비스를 중지할 수 있으며, 이 기간 동안 이용자가 고지내용을 인지하지 못한 데 대하여 당 사이트는 책임을 부담하지 아니합니다. 부득이한 사정이 있을 경우 위 사전 고지기간은 감축되거나 생략될 수 있습니다. 또한 위 서비스 중지에 의하여 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 보관되지 못하였거나 삭제․전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 대하여도 당 사이트는 책임을 부담하지 아니합니다.
③ 당 사이트의 사정으로 서비스를 영구적으로 중단하여야 할 경우 제2항에 의거합니다. 다만, 이 경우 사전 고지기간은 1개월로 합니다.
④ 당 사이트는 사전 고지 후 서비스를 일시적으로 수정, 변경 및 중단할 수 있으며, 이에 대하여 이용자 또는 제3자에게 어떠한 책임도 부담하지 아니합니다.
⑤ 당 사이트는 이용자가 본 약관의 내용에 위배되는 행동을 한 경우, 임의로 서비스 사용을 제한 및 중지할 수 있습니다. 이 경우 당 사이트는 위 이용자의 접속을 금지할 수 있습니다.
⑥ 장기간 휴면 회원인 경우 안내 메일 또는 공지사항 발표 후 1주일간의 통지 기간을 거쳐 서비스 사용을 중지할 수 있습니다.

제 10 조 (서비스의 변경 및 해지)
① 당 사이트는 이용자가 서비스를 이용하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않으며, 회원이 본 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다.
② 당 사이트는 서비스 이용과 관련하여 가입자에게 발생한 손해 중 가입자의 고의, 과실에 의한 손해에 대하여 책임을 부담하지 아니합니다.
③ 회원을 탈퇴하고자 하는 경우에는 당 사이트 로그인 후 회원탈퇴 절차에 따라 해지할 수 있습니다.

제 11 조 (정보 제공 및 홍보물 게재)
① 당 사이트는 서비스를 운영함에 있어서 각종 정보를 서비스에 게재하는 방법 등으로 회원에게 제공할 수 있습니다.
② 당 사이트는 서비스에 적절하다고 판단되거나 활용 가능성 있는 홍보물을 게재할 수 있습니다.

제 12 조 (게시물의 저작권)
① 이용자가 게시한 게시물의 내용에 대한 권리는 이용자에게 있습니다.
② 당 사이트는 게시된 내용을 사전 통지 없이 편집, 이동할 수 있는 권리를 보유하며, 다음의 경우 사전 통지 없이 삭제할 수 있습니다.
 1. 본 이용약관에 위배되거나 상용 또는 불법, 음란, 저속하다고 판단되는 게시물을 게시한 경우
 2. 다른 이용자 또는 제 3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우
 3. 공공질서 및 미풍양속에 위반되는 내용인 경우
 4. 범죄적 행위에 결부된다고 인정되는 내용일 경우
 5. 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우
 6. 기타 관계 법령에 위배되는 경우
③ 이용자의 게시물이 타인의 저작권을 침해함으로써 발생하는 민․형사상의 책임은 전적으로 이용자가 부담하여야 합니다.

제 13 조 (이용자의 행동규범 및 서비스 이용제한)
① 이용자가 제공하는 정보의 내용이 허위인 것으로 판명되거나, 그러하다고 의심할 만한 합리적인 사유가 발생할 경우 당 사이트는 이용자의 본 서비스 사용을 일부 또는 전부 중지할 수 있으며, 이로 인해 발생하는 불이익에 대해 책임을 부담하지 아니합니다.
② 이용자가 당 사이트 서비스를 통하여 게시, 전송, 입수하였거나 전자메일 기타 다른 수단에 의하여 게시, 전송 또는 입수한 모든 형태의 정보에 대하여는 이용자가 모든 책임을 부담하며 당 사이트는 어떠한 책임도 부담하지 아니합니다.
③ 당 사이트는 당 사이트가 제공한 서비스가 아닌 가입자 또는 기타 유관기관이 제공하는 서비스의 내용상의 정확성, 완전성 및 질에 대하여 보장하지 않습니다. 따라서 당 사이트는 이용자가 위 내용을 이용함으로 인하여 입게 된 모든 종류의 손실이나 손해에 대하여 책임을 부담하지 아니합니다.
④ 이용자는 본 서비스를 통하여 다음과 같은 행동을 하지 않는데 동의합니다.
 1. 타인의 아이디와 비밀번호를 도용하는 행위
 2. 저속, 음란, 모욕적, 위협적이거나 타인의 사생활을 침해할 수 있는 내용을 전송, 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위
 3. 서비스를 통하여 전송된 내용의 출처를 위장하는 행위
 4. 법률, 계약에 의하여 이용할 수 없는 내용을 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위
 5. 타인의 특허, 상표, 영업비밀, 저작권, 기타 지적재산권을 침해하는 내용을 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위
 6. 당 사이트의 승인을 받지 아니한 광고, 판촉물, 정크메일, 스팸, 행운의 편지, 피라미드 조직 기타 다른 형태의 권유를 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위
 7. 다른 이용자의 개인정보를 수집 또는 저장하는 행위
⑤ 당 사이트는 회원이 본 약관을 위배했다고 판단되면 서비스와 관련된 모든 정보를 이용자의 동의 없이 삭제할 수 있습니다.
⑥ 제1항의 규정에 의하여 서비스의 제한을 받게 된 이용자가 위 조치에 대한 이의가 
있을 경우에는 이의신청을 할 수 있으나 서비스 제한 시 삭제된 이용자의 데이터에 대해서는 책임지지 아니합니다. 
⑦ 당 사이트는 제6항의 규정에 의한 이의신청에 대하여 그 확인이 완료될 때까지 이용제한을 연기할 수 있습니다.

제 3 장 의무 및 책임

제 14 조 (당 사이트의 의무)
① 당 사이트는 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 노력할 의무가 있습니다.
② 당 사이트는 회원의 개인 신상 정보를 본인의 승낙 없이 타인에게 누설, 배포하지 않습니다. 다만, 전기통신관련법령 등 관계법령에 의하여 관계 국가기관 등의 요구가 있는 경우에는 그러하지 아니합니다.
③ 당 사이트는 이용자가 안전하게 당 사이트 서비스를 이용할 수 있도록 이용자의 개인정보 (신용정보 포함) 보호를 위한 보안시스템을 갖추어야 합니다.
④ 당 사이트는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.

제 15 조 (회원의 의무)
① 회원 가입시에 요구되는 정보는 정확하게 기입하여야 합니다. 또한 이미 제공된 회원에 대한 정보가 정확한 정보가 되도록 유지, 갱신하여야 하며, 회원은 자신의 아이디 및 비밀번호를 제3자에게 이용하게 해서는 안 됩니다.
② 회원은 당 사이트의 사전 승낙 없이 서비스를 이용하여 어떠한 영리행위도 할 수 없습니다.
③ 회원은 당 사이트 서비스를 이용하여 얻은 정보를 당 사이트의 사전승낙 없이 복사, 복제, 변경, 번역, 출판·방송 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다.
④ 이용자는 당 사이트 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안 됩니다.
 1. 다른 회원의 아이디를 부정 사용하는 행위
 2. 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위
 3. 선량한 풍속, 기타 사회질서를 해하는 행위
 4. 타인의 명예를 훼손하거나 모욕하는 행위
 5. 타인의 지적재산권 등의 권리를 침해하는 행위
 6. 해킹행위 또는 컴퓨터바이러스의 유포행위
 7. 타인의 의사에 반하여 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위
 8. 서비스의 안전적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위
 9. 당 사이트에 게시된 정보의 변경

제 4 장 기 타

제 16 조 (당 사이트의 소유권)
① 당 사이트가 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타 권리는 당 사이트에 소유권이 있습니다.
② 이용자는 당 사이트가 명시적으로 승인한 경우를 제외하고는 전항의 소정의 각 재산에 대한 전부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재라이센스, 담보권 설정 행위, 상업적 이용 행위를 할 수 없으며, 제3자로 하여금 이와 같은 행위를 하도록 허락할 수 없습니다.

제 17 조 (양도금지)
회원이 서비스의 이용권한, 기타 이용계약 상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.

제 18 조 (손해배상)
당 사이트는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 당 사이트가 고의로 행한 범죄행위를 제외하고 이에 대하여 책임을 부담하지 아니합니다.

제 19 조 (면책조항)
① 당 사이트는 서비스에 표출된 어떠한 의견이나 정보에 대해 확신이나 대표할 의무가 없으며 회원이나 제3자에 의해 표출된 의견을 승인하거나 반대하거나 수정하지 않습니다. 당 사이트는 어떠한 경우라도 회원이 서비스에 담긴 정보에 의존해 얻은 이득이나 입은 손해에 대해 책임이 없습니다.
② 당 사이트는 회원간 또는 회원과 제3자간에 서비스를 매개로 하여 물품거래 혹은 금전적 거래 등과 관련하여 어떠한 책임도 부담하지 아니하고, 회원이 서비스의 이용과 관련하여 기대하는 이익에 관하여 책임을 부담하지 않습니다.

제 20 조 (관할법원)
본 서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우 대전지방법원을 전속적 관할 법원으로 합니다.

부 칙
(시행일) 본 약관은 2018년 8월 1일부터 시행됩니다. 개정된 약관의 적용일자 이전 이용자 또는 회원은 개정된 이용약관의 적용을 받습니다.
  </p>
</Modal>

<Modal
  title="개인정보 수집 및 동의"
  open={visiblePrivacyModal} // visible 대신 open을 사용합니다.
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>
      닫기
    </Button>
  ]}
>
  <p>
  1. 개인정보의 수집항목 및 수집방법 
G-STARTUP사이트에서는 기본적인 회원 서비스 제공을 위한 필수정보로 실명인증정보와 가입정보로 구분하여 다음의 정보를 수집하고 있습니다. 필수정보를 입력해주셔야 회원 서비스 이용이 가능합니다.

  가. 수집하는 개인정보의 항목 
    * 수집하는 필수항목
      - 실명인증정보 : 이름, 휴대전화번호
      - 가입정보 : 비밀번호, 성명, 이메일, 휴대전화번호, 국적, 지역
	
	
  나. 개인정보 수집방법
      홈페이지 회원가입을 통한 수집 

2. 개인정보의 수집/이용 목적 및 보유/이용 기간
G-STARTUP에서는 정보주체의 회원 가입일로부터 서비스를 제공하는 기간 동안에 한하여 G-STARTUP 서비스를 이용하기 위한 최소한의 개인정보를 보유 및 이용 하게 됩니다. 회원가입 등을 통해 개인정보의 수집·이용, 제공 등에 대해 동의하신 내용은 언제든지 철회하실 수 있습니다. 회원 탈퇴를 요청하거나 수집/이용목적을 달성하거나 보유/이용기간이 종료한 경우, 사업 폐지 등의 사유발생시 개인 정보를 지체 없이 파기합니다.

  * 가입정보
    - 개인정보 수집항목 : 아이디, 비밀번호, 성명, 이메일, 전화번호, 휴대전환번호, 기관명
    - 개인정보의 수집·이용목적 : 홈페이지 서비스 이용 및 회원관리, 불량회원의 부정 이용방지, 민원신청 및 처리 등
    - 개인정보의 보유 및 이용기간 : 2년 또는 회원탈퇴시

정보주체는 개인정보의 수집·이용목적에 대한 동의를 거부할 수 있으며, 동의 거부시 통계청 나라통계사이트에 회원가입이 되지 않으며, 통계청 나라통계사이트에서 제공하는 서비스를 이용할 수 없습니다.

3. 수집한 개인정보 제3자 제공
G-STARTUP에서는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
  </p>
</Modal>

    </div>
  );
};

export default Signup;
