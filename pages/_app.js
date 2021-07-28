import { wrapper } from '../redux/store'
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/actions/userActions'
import { setMasterDistrict, setMasterNameTitle, setMasterProvince, setMasterRoles, setMasterSubDistrict } from '../redux/actions/masterActions'
import { useEffect, useRef } from 'react';
import { Cookies } from 'react-cookie';
import API from '../util/Api';

import 'antd/dist/antd.css';
import '../public/assets/css/style.css';
import '../public/assets/scss/main.scss'


function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const isComponentMounted = useRef(true)

  useEffect(() => {
    if (isComponentMounted.current) {
      (() => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        if (token) dispatch(setToken(token))

        genDataRoles()
        genDataProvince()
        genDataDistrict()
        genDataSubDistrict()
        getAllApiMasterData()

      })();
    }

    return () => {
      isComponentMounted.current = false
    }
  }, [])


  /* init */

  /* กลุ่มผู้ใช้ */
  const genDataRoles = async () => {
    try {
      const { data } = await API.get(`/masterData/GetSysmRoles`)
      // console.log('GetSysmRoles :>> ', data.items);
      dispatch(setMasterRoles(data.items))
    } catch (error) {

    }
  }

  /* จังหวัด */
  const genDataProvince = async () => {
    try {
      const { data } = await API.get(`/masterData/GetProvinceData`)
      // console.log('GetProvinceData :>> ', data.items);
      dispatch(setMasterProvince(data.items))
    } catch (error) {

    }
  }
  
  /* เขต */
  const genDataDistrict = async () => {
    try {
      const { data } = await API.get(`/masterData/GetDistrictData`)
      // console.log('GetDistrictData :>> ', data.items);
      dispatch(setMasterDistrict(data.items))
    } catch (error) {

    }
  }

   /* แขวง */
  const genDataSubDistrict = async () => {
    try {
      const { data } = await API.get(`/masterData/GetSubDistrictData`)
      // console.log('GetSubDistrictData :>> ', data.items);
      dispatch(setMasterSubDistrict(data.items))
    } catch (error) {

    }
  }

  const getAllApiMasterData = async () => {
    try {
      const { data } = await API.get(`/masterData/GetAllApiMasterData`)
      // console.log('GetAllApiMasterData :>> ', data.items.GetNameTitle);
      dispatch(setMasterNameTitle(data.items.GetNameTitle))
    } catch (error) {

    }
  }

  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
