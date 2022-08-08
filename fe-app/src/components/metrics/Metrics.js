import React, { Component } from 'react'

import axios from 'axios';

export default class Metrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metrics: '',
            loading: true
        };

    }

    async getServerMetricsTick() {
        this.setState(state => ({
            ...state,
            loading: true
        }));
        const serverMetrics = await this.getServerMetrics();
        this.setState(state => ({
            ...state,
            metrics: serverMetrics,
            loading: false
        }));
    }

    async getServerMetrics() {
        let config = {
            headers: { 'Authorization': process.env.REACT_APP_API_AUTH_TOKEN },
        };
        const serverMetrics = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/metrics`, config);
        return serverMetrics.data;
    }

    componentDidMount() {
        this.getServerMetricsTick();

        this.serverInterval = setInterval(() => this.getServerMetricsTick(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.serverInterval);
    }

    render() {
        return (this.state.loading ? <div>loading...</div> :
            <div>
                {this.state.metrics}
            </div >
        );
    }
}