import {
  Animated,
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  NavigationContainer,
  NavigationHelpersContext,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/home';
import MyAppBar from './components/app_bar';
import {Text} from 'react-native-svg';
import ListIcon from './assets/list.svg';
import SettingIcon from './assets/setting.svg';
import ManageIcon from './assets/note.svg';
import CancelIcon from './assets/cancel.svg';
import BackIcon from './assets/back.svg';
import CityManager from './screens/city_manager';
import Cities from './models/city';
import {fetchWeather} from './services/fetch_weather';
import Weather from './models/weather';

const Stack = createNativeStackNavigator();
const App = () => {
  const [headerTitle, setHeaderTitle] = useState('');
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    const fetchAllWeather = async () => {
      try {
        const allWeather = await Promise.all(
          Cities.map(city => fetchWeather(city.city)),
        );
        setWeatherData(allWeather);
        console.log('Fetched weather data:', allWeather);
      } catch (error) {
        console.error('Error fetching all weather data:', error);
      }
    };

    fetchAllWeather();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={({navigation}) => ({
            headerTransparent: true,
            headerTitle: headerTitle,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 26,
              fontFamily: 'Lato-Regular',
              color: 'white',
            },

            headerRight: () => {
              return (
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('City Manager', {weatherData})
                    }>
                    <ListIcon width={24} height={24} fill="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <SettingIcon width={24} height={24} fill="#fff" />
                  </TouchableOpacity>
                </View>
              );
            },
          })}>
          {props => (
            <Home
              {...props}
              setHeaderTitle={setHeaderTitle}
              weatherData={weatherData}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="City Manager"
          options={({navigation}) => ({
            headerTitle: isDelete ? 'Choose ' : 'CityManager',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0.85)',
            },
            headerLeft: () => {
              return (
                <View>
                  {isDelete ? (
                    <TouchableOpacity
                      style={{marginRight: 12}}
                      onPress={() => setIsDelete(false)}>
                      <CancelIcon width={20} height={20} fill="#fff" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{marginRight: 12}}
                      onPress={() => navigation.popToTop()}>
                      <BackIcon width={30} height={30} fill="#fff" />
                    </TouchableOpacity>
                  )}
                </View>
              );
            },
            headerTintColor: '#fff',
            headerRight: () => {
              return (
                <View>
                  {!isDelete ? (
                    <TouchableOpacity onPress={() => setIsDelete(true)}>
                      <ManageIcon width={20} height={20} fill="#fff" />
                    </TouchableOpacity>
                  ) : (
                    <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      onChange={() => setToggleCheckBox(true)}
                      onValueChange={newValue => setToggleCheckBox(newValue)}
                      tintColors={{true: 'rgb(211,211,211)', false: '#fff'}}
                    />
                  )}
                </View>
              );
            },
          })}>
          {props => (
            <CityManager
              {...props}
              isDelete={isDelete}
              toggleCheckBox={toggleCheckBox}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 26,

    fontFamily: 'Lato-Regular',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
});
