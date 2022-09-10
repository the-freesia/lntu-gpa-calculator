import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import Title from 'antd/lib/typography/Title';

interface Props {
  isInSchool: Boolean
  setIsInSchool: React.Dispatch<React.SetStateAction<boolean>>
}

export function Step1(Props: Props) {
  const options = [
    { label: '我在校内', value: true },
    { label: '我在校外', value: false },
  ];


  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    Props.setIsInSchool(value)
  };
  return (
    <div className={'h-96 flex flex-col justify-around'} >
      <p>
        <strong>LNTU GPA Calculator(辽工大GPA计算器)</strong>
        是基于前端的纯本地计算工具。安装到本地后可离线使用，无数据泄露之忧。操作方便快捷，计算结果精准翔实，对您的婚姻幸福、家庭和睦等大有裨益，是您居家旅行、恋爱交友的必备工具。
      </p>
      <div className='h-52 flex flex-col items-center'>
        <Title level={2}>请选择您的网络环境</Title>
        <p className={'text-center'}>
          如果您不在校内，或未连接至校园网，请选择我在校外
          <br />
          如果您在校内并连接校园网，请选择我在校内
          <br />
          *错误的网络环境可能会导致您无法获取到成绩数据
        </p>
        <div className='flex justify-center'>
          <Radio.Group
            options={options}
            onChange={onChange}
            optionType="button"
            buttonStyle="solid"
            defaultValue={Props.isInSchool}
          />
        </div>
      </div>
    </div>
  )
}
