/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {Platform,StyleSheet,
    View,
    StatusBar,
    Text,
    Button,
    TouchableHighlight,} from 'react-native';


export default class HeaderBar extends Component {

    constructor(propos) {
        super(propos);
        this.state = {
            title: '',
            popEnabled: true
        };
    }

    leftView() {
        console.log('leftView');
    }

    rightView() {
        console.log('rightView');
    }


    render() {
        return (
            <View style={Platform.OS === "ios" ? styles.containeriOS : styles.containerAndroid}>
                <View style={styles.navBar}>
                    {this.leftView()}
                    <View style={styles.titleLayout}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                    {this.rightView()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containeriOS: {
        backgroundColor: '#108ee9',
        height: 64,
        paddingTop: 20,
    },
    containerAndroid: {
        backgroundColor: '#108ee9',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
    },
    titleLayout: {
        flex: 1, alignItems: 'center'
    },
    title: {
        fontSize: 18, color: '#FFFFFF', fontWeight: '400',
    },
    button: {
        width: 50, alignItems: 'center'
    },
})