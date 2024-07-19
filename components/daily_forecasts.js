import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SunIcon from '../assets/sun.svg';
import CloudIcon from '../assets/cloudy.svg';
import RainIcon from '../assets/rain.svg';
import MoonIcon from '../assets/moon.svg';
const DailyForecast = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.forecastContainer}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={styles.innerText}>7/18</Text>
          <Text style={styles.innerText1}>Today</Text>
        </View>
        <RainIcon width={24} height={24} fill="#fff" />
        <Text style={styles.innerText}>26°/30°</Text>
      </View>
      <View style={styles.forecastContainer}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={styles.innerText}>7/19</Text>
          <Text style={styles.innerText1}>Tomorrow</Text>
        </View>
        <RainIcon width={24} height={24} fill="#fff" />
        <Text style={styles.innerText}>27°/30°</Text>
      </View>
      <View style={styles.forecastContainer}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={styles.innerText}>7/20</Text>
          <Text style={styles.innerText1}>Saturday</Text>
        </View>
        <RainIcon width={24} height={24} fill="#fff" />
        <Text style={styles.innerText}>27°/31°</Text>
      </View>
      <View style={styles.forecastContainer}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={styles.innerText}>7/21</Text>
          <Text style={styles.innerText1}>Sunday</Text>
        </View>
        <RainIcon width={24} height={24} fill="#fff" />
        <Text style={styles.innerText}>29°/32°</Text>
      </View>
      <View style={styles.forecastContainer}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={styles.innerText}>7/22</Text>
          <Text style={styles.innerText1}>Monday</Text>
        </View>
        <RainIcon width={24} height={24} fill="#fff" />
        <Text style={styles.innerText}>26°/30°</Text>
      </View>
      <View style={styles.forecastContainer}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={styles.innerText}>7/23</Text>
          <Text style={styles.innerText1}>Tuesday</Text>
        </View>
        <RainIcon width={24} height={24} fill="#fff" />
        <Text style={styles.innerText}>26°/30°</Text>
      </View>
      <View style={styles.forecastContainer}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={styles.innerText}>7/24</Text>
          <Text style={styles.innerText1}>Wednesday</Text>
        </View>
        <RainIcon width={24} height={24} fill="#fff" />
        <Text style={styles.innerText}>26°/30°</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.innerText}>
          Weather forecast for the next 15 days.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DailyForecast;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 12,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  innerText: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  },
  innerText1: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    width: 90,
    fontSize: 16,
  },
  moreButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(105,105,105)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    paddingHorizontal: 20,
    marginVertical: 12,
  },
});
