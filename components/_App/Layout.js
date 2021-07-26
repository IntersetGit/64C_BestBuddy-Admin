import { useEffect, useRef } from 'react'
import Head from "next/head"
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ConfigProvider } from 'antd';
import "moment/locale/th";
import locale from 'antd/lib/locale/th_TH';
import { useRouter } from 'next/dist/client/router';
import { Cookies } from 'react-cookie'

function Layout({ children }) {
    const route = useRouter()
    const isComponentMounted = useRef(true)

    useEffect(() => {
        if (isComponentMounted.current) {
            (() => {
                const cookies = new Cookies();
                const token = cookies.get('token');
                if (!token) route.push("/signin")
            })();
        }

        return () => {
            isComponentMounted.current = false
        }
    })

    return (
        <ConfigProvider locale={locale}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>
            <div className="main-wrapper">
                <Navbar />
                <Sidebar />

                <div className="page-wrapper">
                    <div className="content container-fluid">
                        {children}
                    </div>
                </div>

            </div>
        </ConfigProvider>
    )
}

export default Layout
