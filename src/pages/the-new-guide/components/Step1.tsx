import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

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
    <div className='flex justify-center'>
      <Radio.Group
        options={options}
        onChange={onChange}
        optionType="button"
        buttonStyle="solid"
        defaultValue={Props.isInSchool}
      />
    </div>
  )
}
