import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import SettingIcon from '../assets/setting.svg'
import ListIcon from '../assets/list.svg'

const MyAppBar = (props) => {
  return (
    <View style={styles.appBarContainer}>
      <Text style={styles.title}>{props.title}</Text>
     
      <View  style={styles.iconContainer} >
      <TouchableOpacity>
        <ListIcon width={24} height={24} fill='#fff'/>
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingIcon width={24} height={24} fill='#fff'/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyAppBar

const styles = StyleSheet.create({
  appBarContainer: {
    position: 'absolute',
    top:0,
    width:'100%',
    height: getStatusBarHeight()+100,
    justifyContent: 'space-between',
    zIndex: 10, 
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20
  },
  iconContainer:{
   flexDirection:'row',
   justifyContent:'space-around',
   gap:20
  },
  title: {
    color: 'white',
    fontSize: 26,
    // fontWeight: 'bold',
    fontFamily:'Lato-Regular'
  },
})
