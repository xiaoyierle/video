import React, { Component } from 'react';
import {Button} from 'antd';
class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlay: false,
            isMuted: false,
            volume: 100,
            allTime: 0,
            currentTime: 0
        };
    }
    millisecondToDate(time) {
        const second = Math.floor(time % 60);
        let minite = Math.floor(time / 60);
        // let hour
        // if(minite > 60) {
        //   hour = minite / 60
        //   minite = minite % 60
        //   return `${Math.floor(hour)}:${Math.floor(minite)}:${Math.floor(second)}`
        // }
        return `${minite}:${second >= 10 ? second : `0${second}`}`;
    }

    controlAudio(type, value) {
        const {id, src} = this.props;
        const audio = document.getElementById(`audio${id}`);
        switch (type) {
            case 'allTime':
                this.setState({
                    allTime: audio.duration
                });
                break;
            case 'play':
                if (!this.props.isPlay) {
                    audio.play();
                    this.setState({
                        isPlay: true
                    });
                    this.props.setSet(true);
                }
                break;
            case 'pause':
                if (this.props.isPlay) {
                    audio.pause();
                    this.setState({
                        isPlay: false
                    });
                    this.props.setSet(false);
                }
                break;
            case 'muted':
                this.setState({
                    isMuted: !audio.muted
                });
                audio.muted = !audio.muted;
                break;
            case 'changeCurrentTime':
                this.setState({
                    currentTime: value
                });
                audio.currentTime = value;
                if (value == audio.duration) {
                    this.setState({
                        isPlay: false
                    });
                }
                break;
            case 'getCurrentTime':
                this.setState({
                    currentTime: audio.currentTime
                });
                if (audio.currentTime == audio.duration) {
                    this.setState({
                        isPlay: false
                    });
                }
                break;
            case 'changeVolume':
                audio.volume = value / 100;
                this.setState({
                    volume: value,
                    isMuted: !value
                });
                break;
            case 'stop':
                if (this.props.isPlay) {
                    audio.pause();
                    audio.currentTime = 0;
                    this.setState({
                        isPlay: false,
                        currentTime: 0
                    });
                    this.props.setSet(false);
                }
                break;
            case 'ended':
                this.props.setSet(false);
                break;
            default:
                break;
        }
    }
    render() {
        let {isPlay, isMuted, volume, allTime, currentTime} = this.state;
        return (
            <div className="audioBox">
                <audio
                    id={`audio${this.props.id}`}
                    src={this.props.src}
                    preload="true"
                    onCanPlay={() => this.controlAudio('allTime')}
                    onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
                    onEnded={() => this.controlAudio('ended')}
                >
                    您的浏览器不支持 audio 标签。
                </audio>
                {
                    isPlay ? <Button type='primary' size='default'  shape='circle' style={{float: 'left', marginLeft: '25%', fontSize: '14px', fontFamily: 'iconfont', textAlign: 'center'}} onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')} >&#xe672;</Button>
                        : <Button type='primary' size='default'  shape='circle' style={{float: 'left', marginLeft: '25%', fontSize: '14px', fontFamily: 'iconfont', textAlign: 'center'}} onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')} >&#xe64e;</Button>
                }
                <Button type='primary' size='default'  shape='circle' style={{float: 'right', marginRight: '25%', fontSize: '14px', fontFamily: 'iconfont', textAlign: 'center'}} onClick={() => this.controlAudio("stop")} >&#xe600;</Button>
                <i
                    className={isMuted ? 'mute' : 'nomute'}
                    onClick={() => this.controlAudio('muted')}
                />
            </div>
        );
    }
}
export default Audio;
