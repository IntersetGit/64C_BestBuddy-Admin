import React from 'react'

function Navbar() {
    return (
        <div className="header">
            {/* Logo */}
            <div className="header-left">
                <a href="index.html" className="logo">
                    <img src="/assets/img/logo-main.png" width={70} alt />
                </a>
            </div>
            {/* /Logo */}
            <a id="toggle_btn" href="javascript:void(0);">
                <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                </span>
            </a>


            {/* Header Menu */}
            <ul className="nav user-menu">


                <li className="nav-item dropdown has-arrow main-drop">
                    <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                        <span>การัณย์ กะลันตะบุตร์</span>
                    </a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="login.html">ออกการระบบ</a>
                    </div>
                </li>
            </ul>
            {/* /Header Menu */}
            {/* Mobile Menu */}
            <div className="dropdown mobile-user-menu">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="login.html">ออกการระบบ</a>
                </div>
            </div>
            {/* /Mobile Menu */}
        </div>
    )
}

export default Navbar
