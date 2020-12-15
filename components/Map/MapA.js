import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';

export default class MapA extends React.Component {


    origin = { latitude: 43.652248, longitude: -79.3834745 };
    destination = { latitude: this.props.latitudeOfRes, longitude: this.props.longitudeOfRes };
    GOOGLE_MAPS_APIKEY = 'AIzaSyApxbhOkr-i80Pw0TIwXEOSHI-1wWFTXN8';

    state = {
        latitude: null,
        longitude: null,
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }
        )
    }

    render() {
        const { latitude, longitude, coords } = this.state
        if (latitude) {
            return (
                <View style={styles.container}>
                    <MapView
                        showsUserLocation
                        style={styles.map}
                        initialRegion={{
                            longitude,
                            latitude,
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421
                        }}
                    >
                        {/* <Marker coordinate={{latitude: this.props.latitudeOfRes, longitude:this.props.longitudeOfRes}} title="Restaurant"/> */}
                        {/* <MapView.Polyline
                            strokeWidth={2}
                            strokeColor="red"
                            coordinates={this.props.latitudeOfRes, this.props.longitudeOfRes}
                        /> */}
                        <MapViewDirections
                            origin={this.origin}
                            destination={this.destination}
                            apikey={this.GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />
                        <Marker
                            coordinate={this.destination}
                            title="Restaurant"
                        />
                        <Marker
                            coordinate={this.origin}
                            title="Current Location"
                        />

                    </MapView>
                </View>
            )
        }
        return (
            <View>
                <Text>
                    We need your permissions!
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});