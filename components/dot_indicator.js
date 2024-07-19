import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React from 'react'
const { width: windowWidth } = Dimensions.get('window');

const MyDotIndicator = ({cities,scrollX}) => {
   
  return (
    <View style={styles.container}>
      {
       cities.map((city,index)=>{
        const width = scrollX.interpolate(
          {
            inputRange: [
                windowWidth *(index-1),
                windowWidth *index,
                windowWidth *(index+1)
            ],
            outputRange:[
                5,12,5
            ],
            extrapolate:'clamp'
          }
        )
            return(
                <View style={[styles.indicator,{width}]} key={index}></View>
            )
        })
      }
    </View>
  )
}

export default MyDotIndicator

const styles = StyleSheet.create({
    container:{
     position:'absolute',
     top:160,
     left:20,
     flexDirection:'row',
     justifyContent:'center',
     alignContent:'center'
    },
    indicator:{
        height:5,
        width:5,
        borderRadius:4,
        marginHorizontal:3,
        backgroundColor:'#fff'
    }
})