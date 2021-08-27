import { useEffect, useState, useRef } from 'react'
import Head from "next/head"
import Layout from '../../components/_App/Layout'
import { Table, Modal, Input, Select, message, Button, Tooltip, Popconfirm, Form, DatePicker } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import API from '../../util/Api'
import { useSelector } from 'react-redux';
const { Search } = Input;

const Produc = () => {
    const { roles, name_title } = useSelector(({ master }) => master);
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(10)

    const isComponentMounted = useRef(true)



    /* table */
    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'num',
            key: 'num',
            align: "center",
            width: 100,
            render: (text, record, index) => {
                index += ((page - 1) * limit)
                return index + 1
            },
        },
        {
            title: 'วันที่',
            dataIndex: 'date',
            key: 'date',
            width: 120,
        },
        {
            title: 'เลขคำสั่งซื้อ',
            dataIndex: 'produc',
            key: 'produc',
            width: 250,

        },
        {
            title: 'รหัสผลิตภัณ',
            dataIndex: 'idproduc',
            key: 'idproduc',
            width: 180,
        },
        {
            title: 'ชื่อผลิตภัณ',
            dataIndex: 'producname',
            key: 'producname',
            width: 250,

        },
        {
            title: 'จัดการ',
            dataIndex: '',
            key: '',
            align: "center",
            width: 100,

        }
    ];

    return (
        <Layout>

            <Head>
                <title>จัดการคำสั่งซื้อ</title>
            </Head>

            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">จัดการคำสั่งซื้อ</h3>
                    </div>
                </div>
            </div>

            <div className="row filter-row pb-3">
                <div className="col-3">
                    <Search placeholder="ค้นหาทั้งหมด"
                        style={{ width: "100%" }}
                        loading={loading}
                        disabled={loading}
                    />
                </div>
                <div className="col-3">
                    <Search placeholder="ค้นหาเลขคำสั่งซื้อ"
                        style={{ width: "100%" }}
                        loading={loading}
                        disabled={loading}
                    />
                </div>
                <div className="col-3">
                    <DatePicker placeholder="ค้นหาช่วงเวลา"
                        style={{ width: "100%" }}
                        loading={loading}
                        disabled={loading}
                    />
                </div>

                <div className="col-1">
                    <Button type="default">
                        <ReloadOutlined />
                    </Button>
                </div>

                <div className="col-8" />
            </div>


            <div className="card dash-widget">
                <div className="card-body">
                    <Table columns={columns} loading={loading} />
                </div>
            </div>
            <style global>{`
               .ant-input[disabled] {
                    color: rgb(39 39 39);
                }

                .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
                    color: rgb(39 39 39);
                }

                th.ant-table-cell {
                    text-align: center !important;
                }
            `}</style>
        </Layout>
    )
}

export default Produc
