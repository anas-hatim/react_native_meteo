import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native"
import { isSameDay } from "date-fns"
import { Colors } from "react-native/Libraries/NewAppScreen"

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`
// const image = require('../assets/fond.jpg');

export default function CurrentWeather({ data }) {
    const [CurrentWeather, setCurrentWeather] = useState(null)
console.log(data);
    useEffect(() => {
            // Filtrer les prévisions pour obtenir la prévision actuelle
            const currentW = data.list.filter(forecast => {
            // Récupérer l'heure actuelle du jour en fonction du fuseau horaire de la ville
            const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
            // Récupérer la date de la prévision en cours
            const forecastDate =  new Date(forecast.dt * 1000)
            // Vérifier si la date de la prévision correspond à la date actuelle
            return isSameDay(today, forecastDate)
        })

        // Mettre à jour l'état de la prévision actuelle
        setCurrentWeather(currentW[0])
    }, [data])

    // Afficher les informations sur la prévision actuelle
    return (
        <View style={styles.container}>
        {/* <ImageBackground source={image} resizeMode='cover' style={styles.imagefond}> */}
        <Text style={styles.city} >{data?.city?.name}</Text>
        <Text style={styles.today} >Aujourd'hui</Text>

        <Image source={{ uri:getIcon(CurrentWeather?.weather[0].icon)}}
        style={styles.image}/>

        <Text style={styles.temp}>{Math.round(CurrentWeather?.main.temp)}°C</Text>
        <Text style={styles.description}>{CurrentWeather?.weather[0].description}</Text>
        
        {/* </ImageBackground> */}
        </View>
    )
}

const COLOR = "#54565B"
const styles = StyleSheet.create({

    container:{
        marginTop:60,
        alignItems:"center",
        height:"65%",
    },

    city:{
        fontSize: 36,
        fontWeight:500,
        color: COLOR,
    },
    today: {
        fontSize: 24,
        fontWeight:300,
        color:COLOR,
    },
    image: {
        width:150,
        height:150,
        marginVertical:20,
    },
    // imagefond: {
    //     flex: 1,
    //     justifyContent: 'center',
    // },
    temp:{
        fontSize:80,
        fontWeight:"bold",
        color:COLOR,

    },
    description:{
        fontSize:24,
        fontWeight:"bold",
        color:COLOR,

    }
})
