import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PlusIcon from '../assets/plus.svg';
import CheckBox from '@react-native-community/checkbox';

const CityManager = ({navigation, route, isDelete, toggleCheckBox}) => {
  const {weatherData} = route.params;
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [checkBoxStates, setCheckBoxStates] = useState(
    Array(weatherData.length).fill(false),
  );
  const handleCheckBoxChange = (index, newValue) => {
    const updatedCheckBoxStates = [...checkBoxStates];
    updatedCheckBoxStates[index] = newValue;
    setCheckBoxStates(updatedCheckBoxStates);
  };
  useEffect(() => {
    if (isDelete) {
      setCheckBoxStates(Array(weatherData.length).fill(toggleCheckBox));
    }
  }, [toggleCheckBox, isDelete, weatherData.length]);
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={{flex: 1, width: windowWidth, height: windowHeight}}>
          {weatherData.map((city, index) => {
            return (
              <View key={index} style={styles.box}>
                <View>
                  <Text style={styles.innerText}>{city.name}</Text>
                  <Text style={styles.subText}>{city.description}</Text>
                </View>
                {!isDelete ? (
                  <View>
                    <Text style={styles.innerText}>
                      {city.kelvinToCelsius()} °
                    </Text>

                    <Text style={styles.subText}>{city.main}</Text>
                  </View>
                ) : (
                  <View key={index}>
                    <CheckBox
                      disabled={false}
                      value={checkBoxStates[index]}
                      onValueChange={newValue =>
                        handleCheckBoxChange(index, newValue)
                      }
                      tintColors={{true: 'rgb(211,211,211)', false: '#fff'}}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      {!isDelete ? (
        <TouchableOpacity style={styles.floatButton}>
          <PlusIcon width={24} height={24} fill="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={[styles.deleteButton, windowWidth]}>
          <TouchableOpacity>
            <Text style={styles.subText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CityManager;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    flex: 1,
  },
  box: {
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 20,
    height: 120,
    backgroundColor: 'rgb(0,139,139)',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 26,
  },
  subText: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    marginTop: 12,
  },
  floatButton: {
    height: 60,
    width: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
  deleteButton: {
    zIndex: 999,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
