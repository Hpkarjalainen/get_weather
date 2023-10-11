import React, { useEffect, useState, Image } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
}

export default function Weather(props) {
    const [temp, setTemp] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const url = api.url +
            'lat=' + props.latitude +
            '&lon=' + props.longitude +
            '&units=metric' +
            '&appid=' + api.key
        fetch(url)
            .then(res => res.json())
            .then((json) => {
                setDescription(json.weather[0].description)
                setTemp(json.main.temp)
                setIcon(api.icons + json.weather[0].icon + '@2x.png')
            })
            .catch((error) => {
                console.log(error)
                setDescription('Error retrieving weather information')
            })
    }, [])

    return (
        <View>
            
            <Text>Temperature: {temp} &#x2103;</Text>
           {/*  {icon &&
            <Image source={{uri: icon}} style={{width: 100, height: 100}} /> 
            } */}
            <Text>{description}</Text>
        </View>
    )
}

