import React, { memo } from 'react'
import { Card, Image } from 'antd'
import 'antd/dist/antd.css'
import calculateStep1 from '../../../Assets/img/04calculate_step_1.png'
import calculateStep2 from '../../../Assets/img/05calculate_step_2.png'
import calculateStep3 from '../../../Assets/img/06calculate_step_3.png'

const { Meta } = Card

const Description = memo(({ text }: { text: string }) => {
  return (
    <div style={{ fontSize: '14px', lineHeight: '22px', minHeight: '22px' }}>
      {text}
    </div>
  )
})

export function Step4 () {
  return (
    <div className={'h-96 flex flex-row justify-between'}>
      <Card
        hoverable
        className='h-60 w-52 self-center'
        cover={<Image src={calculateStep1} />}
      >
        <Meta
          title='点击选择文件'
          description={<Description text='导入成绩文件' />}
        />
      </Card>
      <p className='self-center'>-&gt;</p>
      <Card
        hoverable
        className='h-60 w-52 self-center'
        cover={<Image src={calculateStep2} />}
      >
        <Meta
          title='选择刚刚下载的文件'
          description={
            <Description text='文件名:person!history CourseGrade.htm(l)' />
          }
        />
      </Card>
      <p className='self-center'>-&gt;</p>
      <Card
        hoverable
        className='h-60 w-52 self-center'
        cover={<Image src={calculateStep3} />}
      >
        <Meta
          title='点击计算成绩'
          description={<Description text='duang一下寄点就出来了' />}
        />
      </Card>
    </div>
  )
}
