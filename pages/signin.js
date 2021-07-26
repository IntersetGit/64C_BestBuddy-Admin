import { useState } from 'react'
import Head from "next/head"
import { message } from 'antd';
import Api from '../util/Api';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/actions/userActions';

const Signin = () => {
    const dispatch = useDispatch();
    const [modelLogin, setModelLogin] = useState({
        username: "",
        password: "",
    })

    const login = async () => {
        try {
            const { data } = await Api.post("/auth/login", modelLogin)
            console.log('data :>> ', data.items);
            const { token, refreshToken } = data.items
            dispatch(setToken(token , refreshToken))
        } catch (error) {
            message.warning("ไม่สามารถเข้าสู่ระบบได้")
        }
    }

    return (
        <>
            <Head>
                <title>เข้าสู่ระบบ</title>
            </Head>

            <div className="account-page pt-5">
                <div className="main-wrapper">
                    <div className="account-content">

                        <div className="container">
                            {/* Account Logo */}
                            <div className="account-logo">
                                <a href="index.html"><img src="/assets/img/logo.png" alt="Dreamguy's Technologies" /></a>
                            </div>
                            {/* /Account Logo */}
                            <div className="account-box">
                                <div className="account-wrapper">
                                    <h3 className="account-title">เข้าสู่ระบบ</h3>
                                    <p className="account-subtitle">ระบบหลังบ้าน บริษัท เดอะ เบสท์ บัดดี้ 19 จำกัด</p>
                                    {/* Account Form */}
                                    <form>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input className="form-control" type="text" value={modelLogin.username || ""} onChange={(e) => setModelLogin({ ...modelLogin, username: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col">
                                                    <label>Password</label>
                                                </div>
                                                <div className="col-auto">
                                                    {/* <a className="text-muted" href="forgot-password.html">
                                                        Forgot password?
                                                    </a> */}
                                                </div>
                                            </div>
                                            <input className="form-control" type="password" value={modelLogin.password || ""} onChange={(e) => setModelLogin({ ...modelLogin, password: e.target.value })} />
                                        </div>
                                        <div className="form-group text-center">
                                            <button className="btn btn-primary account-btn" type="button" onClick={login} disabled={!(modelLogin.username && modelLogin.password)}>เข้าสู่ระบบ</button>
                                        </div>
                                        <div className="account-footer">
                                            {/* <p>Don't have an account yet? <a href="register.html">Register</a></p> */}
                                        </div>
                                    </form>
                                    {/* /Account Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Signin
