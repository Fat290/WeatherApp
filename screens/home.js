import {
  Animated,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Cities from '../models/city';
import {fetchWeather} from '../services/fetch_weather';
import Weather from '../models/weather';
import MyDotIndicator from '../components/dot_indicator';
import MyAppBar from '../components/app_bar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import SunIcon from '../assets/sun.svg';
import CloudIcon from '../assets/cloudy.svg';
import RainIcon from '../assets/rain.svg';
import MoonIcon from '../assets/moon.svg';
import MoreInformation from '../components/more_information';
import DailyForecast from '../components/daily_forecasts';

const Home = ({setHeaderTitle, weatherData}) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  const getBackgroundImage = weather => {
    const isDay = weather.isDaytime();

    switch (weather.main) {
      case 'Clear':
        return isDay
          ? require('../assets/sunny.jpg')
          : require('../assets/night.jpg');
      case 'Rain':
        return isDay
          ? require('../assets/rainy.jpg')
          : require('../assets/rainy_night.jpg');
      case 'Clouds':
        return isDay
          ? require('../assets/cloudy.jpg')
          : require('../assets/cloudy_night.jpg');
      default:
        return require('../assets/clear.jpg');
    }
  };
  const getIconWeather = weather => {
    const isDay = weather.isDaytime();

    switch (weather.main) {
      case 'Clear':
        return isDay ? (
          <SunIcon width={34} height={34} fill="#fff" />
        ) : (
          <MoonIcon width={34} height={34} fill={34} />
        );
      case 'Rain':
        return <RainIcon width={34} height={34} fill="#fff" />;
      case 'Clouds':
        return <CloudIcon width={34} height={34} fill="#fff" />;
      default:
        return <CloudIcon width={34} height={34} fill="#fff" />;
    }
  };

  const handleScrollEnd = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / windowWidth);
    console.log('Content Offset X:', contentOffsetX);
    console.log('Current Index:', currentIndex);
    console.log(windowWidth);
    if (weatherData[currentIndex]) {
      setHeaderTitle(weatherData[currentIndex].name);
    }
  };
  const hideAppBar = () => {
    setAppBarShown(false);
  };
  const showAppBar = () => {
    setAppBarShown(true);
  };
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView
        onMomentumScrollEnd={handleScrollEnd}
        horizontal={true}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={1}>
        {weatherData.map((city, index) => {
          return (
            <ScrollView
              key={index}
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  width: windowWidth,
                  height: windowHeight + getStatusBarHeight() + 200,
                }}
                key={index}>
                <ImageBackground
                  source={getBackgroundImage(city)}
                  style={{flex: 1}}>
                  <View style={styles.container}>
                    <View style={styles.dataContainer}>
                      <Text style={styles.title}>
                        {city.kelvinToCelsius()}°
                      </Text>
                      <View style={styles.desContainer}>
                        <Text style={styles.desTitle}>
                          {city.main} / {city.description}{' '}
                        </Text>
                        {getIconWeather(city)}
                      </View>

                      <MoreInformation weather={city} />
                      <DailyForecast />
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </ScrollView>
          );
        })}
      </ScrollView>
      <View style={styles.indicator_container}>
        {weatherData.map((city, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [5, 12, 5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={[styles.indicator, {width}]}
              key={index}></Animated.View>
          );
        })}
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  dataContainer: {
    position: 'absolute',
    top: getStatusBarHeight() + 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desContainer: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 12,
  },
  title: {
    fontSize: 72,
    color: 'white',
    fontFamily: 'Lato-Bold',
  },
  desTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Lato-Light',
  },
  indicator_container: {
    position: 'absolute',
    top: 90,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  indicator: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: '#fff',
  },
});
