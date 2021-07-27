import React from 'react'
import Layout from '../components/_App/Layout'

function Home() {
    return (
        <Layout>

            <div className="page-header">
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="page-title">Welcome Admin!</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                            <div className="dash-widget-info">
                                <h3>112</h3>
                                <span>Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                            <div className="dash-widget-info">
                                <h3>44</h3>
                                <span>Clients</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                            <div className="dash-widget-info">
                                <h3>37</h3>
                                <span>Tasks</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                            <div className="dash-widget-info">
                                <h3>218</h3>
                                <span>Employees</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Total Revenue</h3>
                                    <div id="bar-charts" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Sales Overview</h3>
                                    <div id="line-charts" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home
