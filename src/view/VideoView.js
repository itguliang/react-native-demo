/**
 *@author IT姑凉
 */
import React , { Component } from 'react';

// Dimensions 用于获取设备屏幕的宽高。
import {ActivityIndicator,Image,Text,View,StyleSheet,Slider,TouchableOpacity,Dimensions} from 'react-native';

import HeaderBar from '../components/HeaderBar';
import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;

function formatTime(second) {
  let h = 0, i = 0, s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function (v) {
    return (v >> 0) < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");
}

export default class VideoView extends Component {

  static navigationOptions = {
    title: 'video demo'
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      videoWidth: screenWidth,
      videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
      showVideoControl: false, // 是否显示视频控制组件
      isPlaying: true,        // 视频是否正在播放
      isEnd:false,            // 视频是否播放结束
      isPlayingOnDrag: true,// 拖拽时是否在播放
      currentTime: 0,        // 视频当前播放的时间
      duration: 0,           // 视频的总时长
      isFullScreen: false,     // 当前是否全屏显示
      isTimerStarted: false, // 计时器是否开始
    };
    this.totalTime=0;
    this.countTime=0;
    this.countTimer=null;
    this.timer=null;
  }

  timerStart() {
    console.log('开始计时');
    this.countTimer=setInterval(()=>{
      this.countTime+=500; 
      console.log('this.countTime:'+this.countTime);
    },500);
    this.timer=setInterval(()=>{
      this.totalTime+=3000;
      this.countTime=0;
      console.log('模拟间隔保存---每隔3秒自动保存数据');
    },3000);
    this.setState({
      isTimerStarted: true,
    });
  }
  timerStop() {
    this.totalTime+=this.countTime;
    console.log('停止计时-当前总时长：'+this.totalTime);
    this.countTime=0;
    this.setState({
      isTimerStarted: false,
    });
    this.timerClear();
  }
  timerClear() {  
    this.countTimer && clearInterval(this.countTimer);  
    this.timer && clearInterval(this.timer);  
  }
  // 在unmount组件时清除（clearTimeout/clearInterval）所有用到的定时器
  componentWillUnmount() {  
    this.timerClear(); 
  }
  
  onLoadStart() {
    console.log('视频开始加载');
  }
  onBuffering() {
    console.log('视频缓冲中...');
    if (this.state.isPlaying||this.state.isPlayingOnDrag) {
      this.setState({
        isLoading: true,
      });
    }
    if(this.state.isTimerStarted){
      this.timerStop();
    }
  }
  onLoaded(data) {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    });
  }
  onProgressChanged(data) {
    //console.log('视频进度更新:'+data.currentTime);
    this.setState({
        isLoading: false,
    });
    if (this.state.isPlaying) {
      this.setState({
        currentTime: data.currentTime,
      });
      if(!this.state.isTimerStarted){
        this.timerStart();
      }
    }
  }

  onPlayEnd() {
    this.setState({
      isPlaying: false,
      isPlayingOnDrag: false,
      isEnd: true,
    });
    this.timerStop();
    alert('视频播放结束,有效播放时间：'+this.totalTime+'ms');
  }

  onPlayError() {
    console.log('视频播放失败');
    this.setState({
      isPlaying: false,
      isLoading:false,
      isPlayingOnDrag: false,
    });
    this.timerStop();
  }

  onPressPlayButton() {
    let isPlay = !this.state.isPlaying;
    if(this.state.isEnd){
      this.totalTime=0;
      this.player.seek(0);
    }
    this.setState({
      isEnd:false,
      isPlaying: isPlay,
      isLoading: isPlay,
      isPlayingOnDrag: isPlay,
    });
    if(!isPlay){
      this.timerStop();
    }
  }
  
  onControlPlayPress() {
    this.onPressPlayButton();
  }

  // 用户拖动滑块 暂停播放
  onSliderValueChanged(currentTime) {
    //console.log('onSliderValueChanged');
    if(this.state.isTimerStarted){
      this.timerStop();
    }
    this.setState({
      isPlaying: false,
      isEnd:false,
      currentTime: currentTime
    });
  }
  // 用户结束滑动 如果原来是播放的继续播放
  onSlidingComplete(currentTime) {
    //console.log('onSlidingComplete');
    this.player.seek(currentTime);
    this.setState({
      isPlaying: this.state.isPlayingOnDrag,
    });
  }
  // 切换全屏
  switchFullScreen() {
    console.log('切换全屏');
    this.player.presentFullscreenPlayer();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: this.state.videoWidth, height: this.state.videoHeight }}>
          {this.state.isLoading ? (
                     <ActivityIndicator style={[styles.loading,{ width: this.state.videoWidth, height: this.state.videoHeight }]} size="large"/>
                 ) : null}
          <Video
             ref={(ref) => this.player = ref}
             source={require('../video.mp4')}
             // source={require('./music.mp3')} // 可以播放音频

             // uri to an image to display until the video plays
             poster=""
             
             rate={this.state.isPlaying?1:0}                     // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
             volume={1.0}                   // 声音的放声音的放大倍数大倍数，0 为静音  ，1 为正常音量 ，更大的数字表示放大的倍数
             muted={false}                  // true代表静音，默认为false.
             paused={!this.state.isPlaying}                 // true代表暂停，默认为false
             resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
             repeat={false} 
             playInBackground={false}       // 当app转到后台运行的时候，播放是否暂停
             playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
             progressUpdateInterval={500.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
             onLoadStart={this.onLoadStart()}   // 当视频开始加载时的回调函数
             onLoad={(data) => { this.onLoaded(data) }}    // 当视频加载完毕时的回调函数
             onProgress={(data) => { this.onProgressChanged(data) }}     //  进度控制，每250ms调用一次，以获取视频播放的进度
             onEnd={() => { this.onPlayEnd() }}            // 当视频播放完毕后的回调函数
             onError={() => { this.onPlayError() }}      // 当视频不能加载，或出错后的回调函数
             onBuffer={() => { this.onBuffering() }}                // Callback when remote video is buffering
             onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
             style={styles.backgroundVideo}
          />
        </View>

        <View style={[styles.control,{ width: this.state.videoWidth}]}>
          <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
            <Image
              style={styles.playControl}
              source={this.state.isPlaying ? require('../images/icon_control_pause.png') : require('../images/icon_control_play.png')}
            />
          </TouchableOpacity>
          <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
          <Slider
            style={{flex: 1}}
            maximumTrackTintColor={'#999999'}
            minimumTrackTintColor={'#00c06d'}
            thumbImage={require('../images/icon_control_slider.png')}
            value={this.state.currentTime}
            minimumValue={0}
            maximumValue={this.state.duration}
            onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
            onSlidingComplete={(currentTime) => { this.onSlidingComplete(currentTime) }}
          />
          <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
          <TouchableOpacity activeOpacity={0.3} onPress={() => { this.switchFullScreen() }}>
            <Image
              style={styles.shrinkControl}
              source={this.state.isFullScreen ? require('../images/icon_control_shrink_screen.png') : require('../images/icon_control_full_screen.png')}
            />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loading:{
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex:1,
  },
  control: {
    flexDirection: 'row',
    width:150,
    height: 44,
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  playButton: {
    width: 50,
    height: 50,
  },
  playControl: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  shrinkControl: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  time: {
    fontSize: 12,
    color: 'white',
    marginLeft: 10,
    marginRight: 10
  },
});
