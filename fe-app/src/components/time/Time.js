import React, { Component } from 'react'

import axios from 'axios';
import moment from 'moment';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverTime: 0,
            clientTime: 0,
            loading: true
        };

    }

    async serverTimeTick() {
        this.setState(state => ({
            ...state,
            loading: true
        }));
        const serverTime = await this.getServerTime();
        this.setState(state => ({
            ...state,
            serverTime: serverTime,
            loading: false
        }));
    }

    async getServerTime() {
        let config = {
            headers: { 'Authorization': process.env.REACT_APP_API_AUTH_TOKEN },
        };
        const serverTime = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/time`, config);
        return serverTime.data.epoch;
    }

    clientTimeTick() {
        const clientTime = Math.floor(new Date().getTime() / 1000);
        this.setState(state => ({
            ...state,
            clientTime: clientTime,
        }));
    }

    componentDidMount() {
        this.serverTimeTick();
        this.clientTimeTick();

        this.serverInterval = setInterval(() => this.serverTimeTick(), 30000);
        this.clientInterval = setInterval(() => this.clientTimeTick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.serverInterval);
        clearInterval(this.clientInterval);
    }

    render() {
        return (this.state.loading ? <div>loading...</div> :
            <div>
                <p>serverTime: {this.state.serverTime}</p >
                <p>clientTime: {this.state.clientTime}</p>
                <p>difference: {moment.utc(moment.duration(this.state.clientTime - this.state.serverTime, 'seconds').asMilliseconds()).format('HH:mm:ss')}</p>
            </div >
        );
    }
}