'use client'
import React, {useState} from 'react'
import {Button, Form, Input, message} from 'antd'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {setCookie} from 'cookies-next'

type FieldType = {
    username?: string
    password?: string
}

type LoginResponse = {
    status: Boolean
    error: string | null
    data: {
        email: string
        firmId: string
        isAdmin: Boolean
        name: string
        permissionList: []
        token: string
        _id: string
    }
}

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    const {push} = useRouter()

    const onFinish = async (values: any) => {
        setLoading(true)

        const {status: httpStatus, data} = await axios.post(
            'https://qr-menu-service.fly.dev/personal/login',
            {
                email: values.username,
                password: values.password,
            },
        )

        setLoading(false)

        const {status, data: LoginResponseData}: LoginResponse = data

        if (httpStatus === 400) {
            messageApi.open({
                type: 'error',
                content: 'Bir hata oluştu!',
            })
            return
        }

        if (!status) {
            messageApi.open({
                type: 'error',
                content: 'Giriş Başarısız',
            })
            return
        }

        setCookie('firmId',LoginResponseData.firmId)
        setCookie('AccessToken', LoginResponseData.token)

        push('/admin/panel')
    }

    return (
        <div style={{margin: '40vh auto'}}>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Kullanıcı Adı"
                    name="username"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Lütfen email gir!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Şifre"
                    name="password"
                    rules={[{required: true, message: 'Lütfen şifreni gir!'}]}
                >
                    <Input type="password"/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Giriş Yap
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
