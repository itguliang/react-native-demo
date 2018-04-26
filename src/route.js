/**
 *@author IT姑凉
 */
import React, { Component } from 'react';
import { 
    StyleSheet
 } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeView from './view/HomeView';
import LiveView from './view/LiveView';
import RankView from './view/RankView';
import FindView from './view/FindView';
import MineView from './view/MineView';

// 注册tabs
const AppTabNavigator = TabNavigator({
    Home: {
        screen: HomeView,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor}) => {
              return <Entypo name="home" size={25} color={tintColor} />;
            },
        },
    },
    Live: {
        screen: LiveView,
        navigationOptions: {
            tabBarLabel: '直播',
            tabBarIcon: ({tintColor}) => {
              return <Entypo name="mic" size={25} color={tintColor} />;
            },
        }
    },
    Rank: {
        screen: RankView,
        navigationOptions: {
            tabBarLabel: '排行榜',
            tabBarIcon: ({tintColor}) => {
              return <Entypo name="bar-graph" size={25} color={tintColor} />;
            },
        }
    },
    Find: {
        screen: FindView,
        navigationOptions: {
            tabBarLabel: '发现',
            tabBarIcon: ({tintColor}) => {
              return <Entypo name="direction" size={25} color={tintColor} />;
            },
        }
    },
    Mine: {
        screen: MineView,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => {
              return <Entypo name="user" size={25} color={tintColor} />;
            },
        }
    }
}, {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#1890ff', // 文字和图片选中颜色
        inactiveTintColor: 'gray', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        }, 
        pressOpacity: 0.8,
        style: {  
                height: 46,  
                backgroundColor: '#ffffff',  
                zIndex: 0,  
                position: 'relative'  
        },  
        labelStyle: {  
                fontSize: 11,  
                paddingVertical: 0,  
                marginTop: -3,
        },  
        iconStyle: {  
                marginTop: -2  
        },  
    },
});


export const AppNavigator = StackNavigator(
    {
        Home        : { screen: AppTabNavigator, navigationOptions: { header: null }},
        Mine        : { screen: MineView, navigationOptions: { header: null }},
    },
    {
        headerMode        : 'screen',
        initialRouteName  : 'Home',
    }
);