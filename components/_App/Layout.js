import React from 'react'
import Head from "next/head"
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import { ConfigProvider } from 'antd';
import "moment/locale/th";
import locale from 'antd/lib/locale/th_TH';

function Layout({ children }) {

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
