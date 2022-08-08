import { useState } from "react";
import { Button, Steps, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { Step1, Step2, Step3, Step4 } from "./components";


const { Step } = Steps;
interface OneStep {
  title: string;
  content: JSX.Element | null;
}

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

  const steps: OneStep[] = [
    {
      title: "选择环境",
      content: <Step1 isInSchool={isInSchool} setIsInSchool={setIsInSchool} />,
    },
    {
      title: "登录账号",
      content: <Step2 isInSchool={isInSchool} />,
    },
    {
      title: "下载文件",
      content: <Step3 />,
    },
    {
      title: "计算GPA",
      content: <Step4 />,
    },
  ];

  return (
    <div className="max-w-screen-lg m-auto">
      <PageHeader
        className=""
        onBack={() => {
          navigate("/");
        }}
        title="使用指北"
        subTitle="(beta)"
      />
      <div className={"mx-4"}>
        <Steps current={current}>
          {steps.map((item) => (
            <Step
              key={item.title}
              title={item.title}
            />
          ))}
        </Steps>
      </div>
      <div className={"m-4 min-h-50"}>{steps[current].content}</div>
      <div className={"flex flex-row-reverse m-8"}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            去计算
          </Button>
        )}
        {current > 0 && (
          <Button className={'mr-2'} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </div>
  );
}
