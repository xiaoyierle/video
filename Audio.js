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
        const { id, src } = this.props;
        const audio = document.getElementById(`audio${id}`);
        switch(type) {
            case 'allTime':
                this.setState({
                    allTime: audio.duration
                });
                break;
            case 'play':
                audio.play();
                this.setState({
                    isPlay: true
                });
                break;
            case 'pause':
                audio.pause();
                this.setState({
                    isPlay: false
                });
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
                if(value == audio.duration) {
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
                >
                    您的浏览器不支持 audio 标签。
                </audio>
                {
                    isPlay ? <Button type='primary' size='default'  shape='circle' style={{float: 'left', marginLeft: '30%', fontSize: '14px', fontFamily: 'iconfont', textAlign: 'center'}} onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')} >&#xe672;</Button>
                        : <Button type='primary' size='default'  shape='circle' style={{float: 'left', marginLeft: '30%', fontSize: '14px', fontFamily: 'iconfont', textAlign: 'center'}} onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')} >&#xe64e;</Button>
                }
                <Button type='primary' size='default'  shape='circle' style={{float: 'right', marginRight: '30%', fontSize: '14px', fontFamily: 'iconfont', textAlign: 'center'}} onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')} >&#xe600;</Button>
                <span className="current">
                    {this.millisecondToDate(currentTime) + '/' + this.millisecondToDate(allTime)}
                </span>
                <input
                    type="range"
                    className="time"
                    step="0.01"
                    max={allTime}
                    value={currentTime}
                    // onChange={(value) => this.controlAudio('changeCurrentTime', value)}
                    onChange={(value) => console.log(value)}
                />
                <i
                    className={isMuted ? 'mute' : 'nomute'}
                    onClick={() => this.controlAudio('muted')}
                />
                <input
                    type="range"
                    className="volume"
                    onChange={(value) => this.controlAudio('changeVolume', value)}
                    value={isMuted ? 0 : volume}
                />
            </div>
        );
    }
}
export default Audio;
