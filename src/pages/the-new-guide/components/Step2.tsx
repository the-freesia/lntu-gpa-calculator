import { Button } from 'antd'
import { open } from '@tauri-apps/api/shell'
import React from 'react'
import Title from 'antd/lib/typography/Title'

interface Prop {
    isInSchool: Boolean
}

const url = {
    in: [
        'http://10.11.23.13/ca/login?service=http://10.21.24.119:8080/eams/homeExt.action',
        'http://202.199.224.119:8080/eams/teach/grade/course/person!historyCourseGrade.action?projectType=MAJOR'
    ],
    out: [
        'https://webvpn.lntu.edu.cn/',
        'https://webvpn.lntu.edu.cn/http-8080/77726476706e69737468656265737421a1a70fce767e3a043059d8f5/eams/teach/grade/course/person!historyCourseGrade.action?vpn-12-o1-10.21.24.119:8080&projectType=MAJOR'
    ]
}

export function Step2({ isInSchool }: Prop) {
    return (
        <div className={'h-96 flex flex-col justify-evenly'} >
            <Title level={3} className={'self-center'}>
                第一步：登录{isInSchool ? '教务在线' : 'WebVPN'}
            </Title>
            <Button
                type='primary'
                size='large'
                className={'self-center mb-10'}
                shape="round"
                onClick={async () => {
                    try {
                        await open(isInSchool ? url.in[0] : url.out[0])
                    } catch {
                        window.open(isInSchool ? url.in[0] : url.out[0], '_blank')
                    }
                }}
            >
                点击登录{isInSchool ? '教务在线' : 'WebVPN'}
            </Button>

            <Title level={3} className={'self-center'}>
                第二步：打开成绩获取页面
            </Title>
            <Button
                type='primary'
                size='large'
                className={'self-center mb-10'}
                shape="round"
                onClick={async () => {
                    try {
                        await open(isInSchool ? url.in[1] : url.out[1])
                    } catch {
                        window.open(isInSchool ? url.in[1] : url.out[1], '_blank')
                    }
                }}
            >
                点击打开成绩页面
            </Button>
        </div>
    )
}
