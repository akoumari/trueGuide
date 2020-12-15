import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Icon } from "react-native";
import RestaurantInfo from "../Resuseables/RestaurantInfo";
import MapA from "../Map/MapA";
import * as Sharing from "expo-sharing";
import  {useMutation } from '@apollo/client';
import gql from "graphql-tag"

const DELETE_RESTO = gql`mutation 
deleteRestaurant($id:ID!){
  deleteRestaurant(id:$id){
    id
    address
    number
    imageUrl
    details	
    tags
    latitude
    longitude
  }
  
}`;




const DetailsContainer = (props) => {
  const {navigation} = props
  console.log(props.route.params.restaurant.longitude);
  const { restaurant } = props.route.params;
  const [Longitude, setLongitude] = useState(parseFloat(restaurant.longitude));
  const [Latitude, setLatitude] = useState(parseFloat(restaurant.latitude));
  const [deleteResto] = useMutation(DELETE_RESTO)
  console.log(Longitude);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }

  };

  const handleDelete= () =>{
    deleteResto({variables:{id:restaurant.id}}).then(
      navigation.navigate("Home")
    )
  }

 return (
    <View style={styles.container}>
      <View>
        <RestaurantInfo restaurant={restaurant}></RestaurantInfo>
      </View>

      <View>
        <View>
          <Text>{restaurant.details}</Text>

          <View style={{ flexDirection:"row", justifyContent:"space-around" }}>
          <Button  style={{flex: 1}}
            icon={<Icon name="arrow-right" size={15} color="white" />}
            title={"SHARE"}
            onPress={onShare}
          />

          <Button style={{flex: 1}}
            
            title={"Delete"}
            onPress={() => handleDelete()}
          />
          <Button style={{flex: 1}}
            
            
            title={"edit"}
            onPress={() => navigation.navigate("edit",{ restaurant: restaurant })}
          />
          </View>
        </View>
        <View>
          <MapA longitudeOfRes={Longitude} latitudeOfRes={Latitude} />
        </View>
      </View>
    </View>
  );
  
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d2d2f9",
  },
});

export default DetailsContainer;

