import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VisibilityIcon from '../assets/visibility.svg';
import WindIcon from '../assets/wind.svg';
import HumidityIcon from '../assets/humidity.svg';
import PressureIcon from '../assets/pressure.svg';
import CloudIcon from '../assets/cloudy.svg';
import RainIcon from '../assets/rain.svg';
import ThermometerIcon from '../assets/thermometer.svg';

const MoreInformation = ({weather}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <HumidityIcon width={26} height={30} fill="#fff" />
        <Text style={styles.subText} numberOfLines={1}>
          Humidity
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.innerText}>{weather.humidity}</Text>
          <Text style={styles.unitText}> %</Text>
        </View>
      </View>
      <View style={styles.card}>
        <ThermometerIcon width={26} height={30} fill="#fff" />
        <Text style={styles.subText} numberOfLines={1}>
          Feels like
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.innerText}>
            {(weather.feels_like - 273.15).toFixed(0)} °
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <WindIcon width={26} height={30} fill="white" />
        <Text style={styles.subText} numberOfLines={1}>
          Wind speed
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.innerText}>{weather.windSpeed} </Text>
          <Text style={styles.unitText}> km/h</Text>
        </View>
      </View>
      <View style={styles.card}>
        <CloudIcon width={26} height={30} fill="#fff" />
        <Text style={styles.subText} numberOfLines={1}>
          Cloudiness
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.innerText}>{weather.cloudiness}</Text>
          <Text style={styles.unitText}> %</Text>
        </View>
      </View>
      <View style={styles.card}>
        <VisibilityIcon width={26} height={30} fill="#fff" />
        <Text style={styles.subText} numberOfLines={1}>
          Visibility
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.innerText}>{weather.visibility / 1000}</Text>
          <Text style={styles.unitText}> km</Text>
        </View>
      </View>
      <View style={styles.card}>
        <RainIcon width={26} height={30} fill="#fff" />
        <Text style={styles.subText} numberOfLines={1}>
          Rainfall
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.innerText}>{weather.visibility / 1000}</Text>
          <Text style={styles.unitText}> mm</Text>
        </View>
      </View>
    </View>
  );
};

export default MoreInformation;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 12,
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    width: 115,
    height: 120,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 12,
    gap: 4,
  },
  innerText: {
    fontSize: 24,
    fontFamily: 'Lato-Regular',
    color: 'white',
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  unitText: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: 'white',
  },
});
