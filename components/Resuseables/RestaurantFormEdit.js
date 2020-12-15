import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";

import { useMutation, useQuery, gql } from "@apollo/client";

const ADD_RESTO = gql`
  mutation addRestaurant(
    $name: String!
    $address: String!
    $number: String!
    $imageUrl: String
    $details: String!
    $tags: [String!]
    $latitude: Float!
    $longitude: Float!
  ) {
    addRestaurant(
      name: $name
      address: $address
      number: $number
      imageUrl: $imageUrl
      details: $details
      tags: $tags
      latitude: $latitude
      longitude: $longitude
    ) {
      name
      address
      number
      imageUrl
      details
      tags
      latitude
      longitude
    }
  }
`;
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


export default function RestaurantForm(props) {
  //  const {id} = props;
  const { navigation } = props;
  const { restaurant } = props.route.params;
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address);
  const [number, setNumber] = useState(restaurant.number);
  const [details, setDetails] = useState(restaurant.details);
  const [tags, setTags] = useState(restaurant.tags.join(" "));
  const [latitude, setLatitude] = useState(restaurant.longitude);
  const [longitude, setLongitude] = useState(restaurant.latitude);
  const [addResto] = useMutation(ADD_RESTO);
  const [deleteResto] = useMutation(DELETE_RESTO);

  const handleSubmit = () => {
    let editedRestaurant = {
      "name": name,
      "address": address,
      "number": number,
      "details": details,
      "tags": tags.split(" "),
      "latitude": parseFloat(latitude),
      "longitude": parseFloat(longitude)
    };

    addResto({variables: {
        name:editedRestaurant.name,
        address : editedRestaurant.address,
        number: editedRestaurant.number,
        imageUrl: "/something",
        details :editedRestaurant.details ,
        tags: editedRestaurant.tags,
        latitude :editedRestaurant.latitude ,
        longitude : editedRestaurant.longitude
    }})
    deleteResto({variables:{id:restaurant.id}}).then(
        navigation.navigate("Home")
      )

    // }
  };
  return (
    <View>
      <Text> Add/Edit Restaurant </Text>
      <View>
        <TextInput
          value={name}
          onChangeText={(val) => setName(val)}
          placeholder="=Name"
        />
        <TextInput
          value={address}
          textContentType={"addressCity"}
          onChangeText={(value) => setAddress(value)}
          placeholder="Address"
        />
        <TextInput
          value={number}
          keyboardType={"number-pad"}
          textContentType={"telephoneNumber"}
          onChangeText={(val) => setNumber(val)}
          placeholder="Phone Number"
        />

        <TextInput
          value={details}
          onChangeText={(val) => setDetails(val)}
          placeholder="Details"
        />
        <TextInput
          value={tags}
          onChangeText={(val) => setTags(val)}
          placeholder="Tags"
        />
        <TextInput
          value={latitude}
          keyboardType={"decimal-pad"}
          onChangeText={(val) => {
            setLatitude(val);
          }}
          placeholder="Latitude"
        />
        <TextInput
          value={longitude}
          keyboardType={"decimal-pad"}
          onChangeText={(val) => setLongitude(val)}
          placeholder="Longitude"
        />
        <Button onPress={() => handleSubmit()} title={"Submit"} />
      </View>
    </View>
  );
}