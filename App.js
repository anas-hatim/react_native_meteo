import React, { useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import * as Location from "expo-location";
import axios from 'axios';

import CurrentWeather from "./components/Currentweather";
import Forecasts from "./components//Forecasts"

// URL de l'API pour obtenir les prévisions météorologiques
const API_URL_forcast = (lat, lon) =>`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=98c09587fc266047b81636d4f688dfb9&lang=fr&units=metric`

export default function App() {
  // State hooks pour gérer l'état de chargement et les données récupérées de l'API
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Utilise useEffect pour récupérer les coordonnées de l'utilisateur lors du chargement de l'application
  useEffect(() => {
    const getCoordinates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted"){
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    };
    getCoordinates();
  }, []);

  // Fonction pour récupérer les données météorologiques à partir de l'API en utilisant les coordonnées de l'utilisateur
  const getWeather = async (location) => {
    try {
      const response = await axios.get(API_URL_forcast(location.coords.latitude, location.coords.longitude));
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Erreur dans getWeather" + error);
    }   
  };

  // Affiche un indicateur de chargement pendant que les données sont récupérées
  if(loading){
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
      </View>
    );
  }

  // Affiche les données météorologiques actuelles et les prévisions
  return (
    <View style={styles.container}>
      {data && <CurrentWeather data={data}/>}
      <Forecasts data={data}/>   
    </View>
  );
}

// Styles pour le conteneur principal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86E5FF',
    alignItems: 'center',
    justifyContent: 'center',
    ImageBackground:'./assets/fond.jpg',
    fontSize:30,
  },
});
