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
const DELETE_RESTO = gql`
  mutation deleteRestaurant($id: ID!) {
    deleteRestaurant(id: $id) {
      id
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

export default function RestaurantForm(props) {
  //  const {id} = props;
  const { navigation } = props;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [addResto] = useMutation(ADD_RESTO);
  const [deleteResto] = useMutation(DELETE_RESTO);

  const handleSubmit = () => {
    let restaurant = {
      "name": name,
      "address": address,
      "number": number,
      "details": details,
      "tags": tags.split(" "),
      "latitude": parseFloat(latitude),
      "longitude": parseFloat(longitude)
    };
    // if(id!=null){
    //     deleteResto({variables:{id:id}})
    //     addResto({variables: {
    //       name:restaurant.name,
    //         address : restaurant.address,
    //          number: restaurant.number,
    //        details :restaurant.details ,
    //          tags: restaurant.tags,
    //         latitude :restaurant.latitude ,
    //        longitude : restaurant.longitude
    //     }})

    // }
    // else{
    //console.log(restaurant.address);
    console.log(address);
    addResto({variables:{
        name: restaurant.name,
        address: restaurant.address,
        number: restaurant.number,
        imageUrl: "/something",
        details: restaurant.details,
        tags: restaurant.tags,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude
      },
    }).then(navigation.navigate("Home"));

    // }
  };
  return (
    <View>
      <Text> Add/Edit Restaurant </Text>
      <View>
        <TextInput
          value={name}
          onChangeText={(val) => setName(val)}
          placeholder="Name"
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
