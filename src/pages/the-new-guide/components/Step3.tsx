import React from 'react'
import { Collapse, Tooltip, Image } from 'antd';
import { DoubleRightOutlined, SendOutlined, DownloadOutlined } from '@ant-design/icons';
import previewImg from '../../../Assets/img/01html.png'
import saveStep1 from '../../../Assets/img/02save_step_1.png'
import saveStep2 from '../../../Assets/img/03save_step_2.png'
import 'antd/dist/antd.css';

const { Panel } = Collapse;

export function Step3() {
    return (
        <Collapse accordion ghost defaultActiveKey={['1']} className={'h-96'}>
            <Panel
                header="确保正确获取到成绩"
                key="1"
            >
                <div className={'h-64 flex flex-row'}>
                    {/* <img src={previewImg} alt="previewImg" className={'flex-shrink-0'} /> */}
                    <div className={'flex-shrink-0 self-center'}><Image src={previewImg} width={500} rootClassName={''} /></div>

                    <div className='m-6 flex flex-col justify-evenly'>
                        <p>若上一步中打开的页面如图所示，则为获取成功</p>
                        <p>可以进行保存</p>
                        <strong>否则请检查前置步骤是否正确执行</strong>
                    </div>
                </div>
            </Panel>
            <Panel
                header="Ctrl+S保存为仅html"
                key="2"
            >
                <div className={'h-64 flex flex-row justify-between'}>
                    <div className={'self-center flex flex-col'}>
                        <br />
                        <SendOutlined className={'self-center'} />
                        <p>在页面上<br />按
                            <Tooltip title="Mac为⌘+S或右键另存为" placement="topLeft">
                                <strong>Ctrl+S</strong>
                            </Tooltip>
                        </p>
                    </div>
                    {/* <img src={saveStep1} alt="previewImg" className={'self-center w-64 h-44'} /> */}
                    <div className={'self-center w-60 h-40'}> <Image src={saveStep1} /> </div>

                    <div className={'self-center flex flex-col'}>
                        <br />
                        <DoubleRightOutlined className={'self-center'} />
                        <p>保存类型<br />
                            <Tooltip title="文件后缀应为.htm(l)">
                                <strong>仅HTML</strong>
                            </Tooltip>
                        </p>
                    </div>
                    {/* <img src={saveStep2} alt="previewImg" className={'self-center w-52 h-44'} /> */}
                    <div className={'self-center w-48 h-40'}> <Image src={saveStep2} /> </div>
                    <div className={'self-center flex flex-col'}>
                        <br />
                        <DownloadOutlined className={'self-center'} />
                        <p>&nbsp;&nbsp;保存<br />到
                            <Tooltip title="或任何你方便的位置" placement="topRight">
                                <strong>桌面</strong>
                            </Tooltip>
                        </p>
                    </div>
                </div>
            </Panel>
        </Collapse>
    )
}
