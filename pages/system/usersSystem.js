import { useEffect, useState, useRef } from 'react'
import Head from "next/head"
import Layout from '../../components/_App/Layout'
import { Table, Modal, Input, Select, message, Button, Tooltip, Popconfirm, Form } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import API from '../../util/Api'
import { useSelector } from 'react-redux';
const { Search } = Input;

const usersSystem = () => {
    const { roles, name_title } = useSelector(({ master }) => master);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(10)
    const [search, setSearch] = useState("")
    const [mode, setMode] = useState("add") // add = เพิ่ม edit = แก้ไข view = ดูข้อมูล

    const [listUsers, setListUsers] = useState([])

    const isComponentMounted = useRef(true)

    const initialStateModelSave = {
        id: null,
        username: null, // add
        password: null, // add
        c_password: null, // add
        mas_title_name_id: null, // add
        email: null, // add
        gender: null, // add
        first_name_th: null, // add
        last_name_th: null, // add
        roles_id: null, // add
        tel: null, // add
        id_card: null, // add
    }

    useEffect(() => {
        if (isComponentMounted.current) {
            (async () => {
                try {
                    // await userGroupDataList();
                    await usersDataList({
                        _page: page,
                        _search: search,
                    });

                } catch (error) {
                    message.error('มีบางอย่างผิดพลาด !!');
                }
            })();
        }

        return () => {
            isComponentMounted.current = false
        }
    }, [])

    const usersDataList = async ({ _limit = 10, _page = 1, _search = "" }) => {
        try {
            setLoading(true)
            const { data } = await API.get(`/system/getAllUsers?limit=${_limit}&pasge=${_page}&search=${_search}`)
            const { result, itemcount } = data.items
            // console.log('data :>> ', data);
            setTotal(itemcount)
            setListUsers(result)
            setLoading(false)
        } catch (error) {
            console.log('error :>> ', error);
            message.error('มีบางอย่างผิดพลาด !!');
            setLoading(false)
        }
    }

    /* ค่าเริ่มต้น */
    const reset = async () => {
        const _page = 1, _search = "";
        setPage(_page)
        setSearch(_search)
        await usersDataList({ _page, _search })
    }

    /* table */
    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'num',
            key: 'num',
            align: "center",
            render: (text, record, index) => {
                index += ((page - 1) * limit)
                return index + 1
            },
        },
        {
            title: 'ชื่อเข้าใช้ระบบ',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'ชื่อ - นามสกุล',
            dataIndex: 'name',
            key: 'name',
            render: (a, b) => `${b.title_name ?? " "}${b.first_name_th ?? "-"} ${b.last_name_th ?? " "}`,
            sorter: (a, b) => a.user_name.localeCompare(`${b.title_name ?? " "}${b.first_name_th ?? " "} ${b.last_name_th ?? " "}`),
        },
        {
            title: 'อีเมล',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'กลุ่มผู้ใช้งาน',
            dataIndex: 'role',
            key: 'role',
            render: (a, b) => `${a ?? "-"}`,
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'จัดการ',
            dataIndex: '',
            key: '',
            align: "center",
            render: (item, obj, index) => (
                <>
                    <div className="dropdown dropdown-action">
                        <button href="#" className="btn action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_holiday" onClick={() => addEditViewModal("view", item.id)}><i className="fa fa-eye m-r-5" /> ดูข้อมูล</a>
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_holiday" onClick={() => addEditViewModal("edit", item.id)}><i className="fa fa-pencil m-r-5" /> แก้ไขข้มูล</a>
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_holiday" onClick={() => delUser(item.id)}><i className="fa fa-trash-o m-r-5" /> ลบข้อมูล</a>
                        </div>
                    </div>

                </>
            )
        }
    ];
    // delUser/:id

    const delUser = async (id) => {
        try {
            await API.get(`/system/delUser/${id}`)
            usersDataList({ _page: page, _search: search });
        } catch (error) {
            message.error('มีบางอย่างผิดพลาด !!');
        }
    }
    /* Modal */

    const [password, setPassword] = useState(null)
    const [c_password, setCpassword] = useState(null)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [idEdit, setIsIdEdit] = useState(null);
    const [form] = Form.useForm();

    const addEditViewModal = async (_mode, id) => {
        console.clear()
        // console.log('id :>> ', id);
        try {
            let err = false
            await setMode(_mode)
            if (id) {
                const { data } = await API.get(`/system/getByid/${id}`)
                const _model = data.items;
                // console.log('_model :>> ', _model);
                form.setFieldsValue(_model)
                setIsIdEdit(id)
            }
            if (!err) await setIsModalVisible(true);
        } catch (error) {
            message.error('มีบางอย่างผิดพลาด !!');
        }
    };


    const handleOk = () => {
        form.submit()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsIdEdit(null)
        setPassword(null)
        setCpassword(null)
        form.setFieldsValue(initialStateModelSave);
    };

    const onFinish = async (value) => {
        try {
            console.log('value :>> ', value);

            const model = {
                username: value.username ?? null,
                email: value.email ?? null,
                roles_id: value.role_id ?? null,
                first_name_th: value.first_name_th ?? null,
                last_name_th: value.last_name_th ?? null,
                mas_title_name_id: value.mas_title_name_id ?? null,
                tel: value.tel ?? null,
                id_card: value.id_card ?? null,
            }

            if (mode == "add") {
                model.password = value.password ?? null
                model.c_password = value.c_password ?? null
                if (model.password != model.c_password) {
                    message.warning('รหัสผ่านไม่ตรงกัน !!');
                    form.setFieldsValue({ ...model, password: null, c_password: null });
                }
            } else model.id = idEdit

            await API.post(`/system/mangeUsers`, model)
            message.success("บันทึกข้อมูลสำเร็จ");
            callback()


            function callback() {
                handleCancel()
                usersDataList({ _page: page, _search: search });
            }
        } catch (error) {
            message.error('มีบางอย่างผิดพลาด ไม่สามารถบันทึกได้ !!');
        }
    }

    const onFinishFailed = (error) => {
        message.warning('กรอกข้อมูลไม่ครบถ้วน กรุณากรอกข้อมูลให้ครบ !!');
    }

    return (
        <Layout>

            <Head>
                <title>จัดการผู้ใช้ระบบ</title>
            </Head>

            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">จัดการผู้ใช้ระบบ</h3>
                    </div>
                    <div className="col-auto float-right ml-auto">
                        <a href="#" className="btn add-btn" onClick={() => addEditViewModal("add", null)}><i className="fa fa-plus" /> เพิ่ม ผู้ใช้ระบบ</a>
                    </div>
                </div>
            </div>

            <div className="row filter-row pb-3">
                <div className="col-3">
                    <Search placeholder="ค้นหา"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={async (e) => {
                            await usersDataList({
                                _page: page,
                                _search: e,
                            });
                        }}
                        style={{ width: "100%" }}
                        loading={loading}
                        disabled={loading}
                    />


                </div>

                <div className="col-1">
                    <Button type="default" onClick={reset}>
                        <ReloadOutlined />
                    </Button>
                </div>

                <div className="col-8" />
            </div>


            <div className="card dash-widget">
                <div className="card-body">
                    <Table dataSource={listUsers} columns={columns} rowKey={(row) => row.id} loading={loading} pagination={{
                        current: page,
                        total,
                        pageSize: limit,
                        showTotal: (total, range) => `ข้อมูล ${range[0]} - ${range[1]} ทั้งหมด ${total} รายการ`,
                        onChange: async (e) => {
                            setPage(e)
                            await usersDataList({
                                _page: e,
                                _search: search,
                            });
                        }
                    }} />
                </div>
            </div>

            <Modal maskClosable={false} title={`${mode == "view" ? "ดูข้อมูล" : mode == "edit" ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}ผู้ใช้งาน`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ disabled: mode == "view" }}>
                <Form

                    form={form}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        type="text"
                        label=" ชื่อผู้ใช้"
                        rules={[
                            {
                                required: true, message: "กรุณาใส่ชื่อผู้ใช้ของคุณ!"
                            },
                            {
                                pattern: /^[a-zA-Z0-9]|(_(?!(\.|_))|\.(?!(_|\.))[a-zA-Z0-9]){6,18}$/,
                                message: 'Please only English',
                            }
                        ]}
                    >
                        <Input disabled={mode != "add"} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="อีเมล์"
                        rules={[{ type: "email", required: true, message: "กรุณาใส่อีเมล์ของคุณ" },
                        {
                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Please only English',
                        }]}
                    >
                        <Input disabled={mode != "add"} />
                    </Form.Item>

                    {mode == "add" ? (
                        <>
                            <Form.Item
                                name="password"
                                type="password"
                                label="รหัสผ่าน"
                                onChange={(e) => setPassword(e.target.value)}
                                rules={[
                                    {
                                        required: ((mode == "add") || (password || c_password)),
                                        message: "กรุณาใส่รหัสผ่านของคุณ"
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="c_password"
                                type="c_password"
                                label="ยืนยันรหัสผ่าน"
                                onChange={(e) => setCpassword(e.target.value)}
                                rules={[
                                    {
                                        required: ((mode == "add") || (password || c_password)),
                                        message: "กรุณายืนยันรหัสผ่าน"
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </>
                    ) : null}

                    <Form.Item name="role_id" label="กลุ่มผู้ใช้งาน" >
                        <Select
                            showSearch
                            placeholder="เลือกข้อมูล"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={mode == "view"}
                            rules={[
                                {
                                    required: true,
                                    message: "กรุณาเลือกข้อมูล"
                                },
                            ]}
                        >
                            {roles.map((e, index) => (
                                <Select.Option value={e.id} key={index}>
                                    {e.roles_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="mas_title_name_id" label="คำนำหน้า" rules={[
                        {
                            required: true,
                            message: "กรุณาเลือกคำนำหน้า"
                        },
                    ]}>
                        <Select
                            showSearch
                            placeholder="เลือกข้อมูล"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={mode == "view"}
                        >
                            {name_title.map((e, index) => (
                                <Select.Option value={e.id} key={index}>
                                    {e.title_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="first_name_th" label="ชื่อจริง" rules={[
                        {
                            required: true,
                            message: "กรุณากรอกข้อมูล"
                        },
                    ]}>
                        <Input disabled={mode == "view"} />
                    </Form.Item>

                    <Form.Item name="last_name_th" label="นามสกุล" rules={[
                        {
                            required: true,
                            message: "กรุณากรอกข้อมูล"
                        },
                    ]}>
                        <Input disabled={mode == "view"} />
                    </Form.Item>

                    <Form.Item name="tel" label="เบอร์ติดต่อ">
                        <Input disabled={mode == "view"} />
                    </Form.Item>

                    <Form.Item name="id_card" label="เลขบัตรประชาชน" rules={[
                        {
                            pattern: ('[0-9]{13}'),
                            message: "Please fill in your ID card number to complete 13 digits!",
                        },
                    ]}>
                        <Input disabled={mode == "view"} />
                    </Form.Item>

                </Form>
            </Modal>

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

export default usersSystem
