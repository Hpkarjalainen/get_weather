import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import Weather from './Weather';

export default function Position() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [message, setMessage] = useState('Retrieving location...');
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      console.log(status)
      try {
        if (status !== 'granted') {
          setMessage("Location not granted")
        } else {
          const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          setMessage("Location retrieved")
        }

      } catch (error) {
        setMessage("Error retrieving location")
        console.log(error)
      }
      setIsloading(false)
    })()
  }, []);

  return (
    <View>
      <Text>Your location: {latitude.toFixed(2)} , {longitude.toFixed(2)}</Text>
      <Text style={styles.message}>{message}</Text>
      {isLoading === false &&
      <Weather latitude={latitude} longitude={longitude} message={message} />
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  message: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontSize:16
  },
  text: {
      marginBottom: 10,
      fontSize:16
  }
})
