import {
  Animated,
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import CityManager from './screens/city_manager';
import Cities from './models/city';
import {fetchWeather} from './services/fetch_weather';
import Weather from './models/weather';

const Stack = createNativeStackNavigator();
const App = () => {
  const [headerTitle, setHeaderTitle] = useState('');
  const [appBarShown, setAppBarShown] = useState(true);
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
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
            headerShown: appBarShown,
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
              setAppBarShown={setAppBarShown}
              weatherData={weatherData}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          component={CityManager}
          name="City Manager"
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0.85)',
            },

            headerTintColor: '#fff',
            headerRight: () => {
              return (
                <TouchableOpacity>
                  <ManageIcon width={20} height={20} fill="#fff" />
                </TouchableOpacity>
              );
            },
          }}
        />
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
