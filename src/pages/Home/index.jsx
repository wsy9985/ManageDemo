import React, { Component } from 'react'
import logo from '../../img/1.webp'
import './index.css'
import {reqWeather,reqIP} from '../../request/api'
import moment from "moment";

export default class Home extends Component {

    state = {
        currentTime:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        dayPictureUrl:'', // 天气图片url
        weather:'', //天气的文本
        temperature: '',
    }

    getTime = ()=>{
        setInterval(() => {
            const currentTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            this.setState({currentTime})
        }, 1000);
    }

    getWeather = async () => {
        const key = '5f582d5aba14bbfabb74ef67b6e2fb04'
        //获取IP
        const resultIp = await reqIP({ key })
        const { status, adcode, infocode } = resultIp
        if (status === '1' && infocode === '10000') {
            //根据IP获取地区及天气信息
            const resultWeather = await reqWeather({
                key,
                city: adcode,
                extensions: 'base'
            })
            const { status, infocode, lives } = resultWeather
            if (status === '1' && infocode === '10000') {
                const { province, city, temperature, weather } = lives[0]
                this.setState({
                    city: `${province}-${city}`,
                    temperature: `${temperature}℃`,
                    weather
                })
            }
        }
    }


    componentDidMount(){
        this.getTime();
        this.getWeather();
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const {currentTime,dayPictureUrl,weather,temperature,city} = this.state
        return (
            <div className='home'>
                {/* <div className='homeHeader'> */}
                    {/* <div className="header-bottom-right">
                        <span>北京时间&nbsp;:&nbsp;{currentTime}</span>
                        {/* <img src={dayPictureUrl} alt="weather"/> */}
                        {/* <span className='time'>{city}</span> */}
                        {/* <span>{weather}{temperature}</span> */} 
                    {/* </div> */}
                {/* </div> */}
                <div className='showHome'>
                    <img src={logo} alt="logo" />
                    <h1>欢迎来到阿巴阿巴苦逼程序猿管理后台</h1>
                    <h2>在这里，您可以亲身体验当一名BOSS（或是苦逼的电商运营人员），对用户数据进行添加、删除以及查询，</h2>
                    <h2>并可以对人员的信息进行修改（仅限邮箱和手机号），权限的设置等操作暂未开启，后续还会引入电商的基本功能，可以查看小店的收入，制定最适合您的商业策略!!!</h2>
                    <h6>ps:欢迎下次光临~</h6>
                </div>
            </div>
            
        )
    }
}
