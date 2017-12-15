import React, { Component } from 'react';
import Audio from './Audio';
import {songs} from 'url'
class BiddingReview extends Component {
    constructor() {
        super();
        this.state = {
            isPlay: false,
        };
    }
    // 播放按钮
    setSet(obj) {
        this.setState({
            isPlay: obj
        });
    }
    render() {
        return (
            <div>
                <Audio src={songs} id='1' setSet={this.setSet.bind(this)} isPlay={this.state.isPlay}/>
                <Audio src={songs} id='2' setSet={this.setSet.bind(this)} isPlay={this.state.isPlay}/>
                <Audio src={songs} id='3' setSet={this.setSet.bind(this)} isPlay={this.state.isPlay}/>
                <Audio src={songs} id='4' setSet={this.setSet.bind(this)} isPlay={this.state.isPlay}/>
                <Audio src={songs} id='5' setSet={this.setSet.bind(this)} isPlay={this.state.isPlay}/>

            </div>
           )
    }
}
export default BiddingReview;
