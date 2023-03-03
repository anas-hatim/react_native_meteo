import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Fonction pour récupérer l'icône météo en fonction de l'URL fournie par l'API OpenWeatherMap
const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

export default function Weather({ forecast }) {
    return(
        // Conteneur pour afficher les informations météo
        <View style={styles.container}>
            {/* Afficher l'heure de la prévision */}
            <Text>{forecast.hour}h</Text>
            {/* Afficher l'icône météo */}
            <Image
                source={{ uri: getIcon(forecast?.icon) }}
                style={styles.image}
            />
            {/* Afficher la température */}
            <Text style={styles.temp}>{forecast.temp}°C</Text>
        </View>
    )
}

// Définir la couleur de fond du conteneur
const boutoncolor = "#FFC93C"
const styles = StyleSheet.create({
    container:{
        backgroundColor: boutoncolor, // Couleur de fond du conteneur
        height:140, // Hauteur du conteneur
        width:75, // Largeur du conteneur
        paddingVertical:6, // Ajouter du rembourrage en haut et en bas du conteneur
        justifyContent:"center", // Centrer les éléments verticalement dans le conteneur
        alignItems:"center", // Centrer les éléments horizontalement dans le conteneur
        marginRight:10, // Ajouter une marge à droite du conteneur
        borderRadius:25, // Arrondir les coins du conteneur
    },

    image:{
        width:50, // Largeur de l'icône météo
        height:50, // Hauteur de l'icône météo
    },
    temp:{
        fontSize:18, // Taille de police pour afficher la température
        fontWeight:"bold", // Police en gras pour afficher la température
    }
})
