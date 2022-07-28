import { useState } from 'react'
import { Button, Steps, PageHeader } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Step1, Step2, Step3, Step4 } from './components'

const { Step } = Steps;
interface OneStep {
  title: string;
  content: JSX.Element | null;
}

const steps: OneStep[] = [
  {
    title: '选择环境',
    content: null,
  },
  {
    title: '登录账号',
    content: <Step2 />,
  },
  {
    title: '下载文件',
    content: <Step3 />,
  },
  {
    title: '计算GPA',
    content: <Step4 />,
  },
];

export function Guide() {
  const navigate = useNavigate();

  const [isInSchool, setIsInSchool] = useState(true);

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  steps[0].content = <Step1 isInSchool={isInSchool} setIsInSchool={setIsInSchool} />;

  return (
    <div>
      <PageHeader
        className=''
        onBack={() => { navigate('/') }}
        title="使用指北"
        subTitle="(beta)"
      />
      <div>
        <div className={'mx-4'}>
          <Steps
            className={'flex-nowrap'}
            current={current}
          >
            {steps.map(item => (
              <Step
                className={'justify-center'}
                key={item.title}
                title={item.title}
              />
            ))}
          </Steps>
        </div>
        <div className={'m-4 min-h-50'}>{steps[current].content}</div>
        <div className={'flex justify-center'}>
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              上一步
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                navigate('/')
              }}>
              去计算
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}