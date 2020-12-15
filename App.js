import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState,useEffect} from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import About from "./components/About/About";
import DetailsContainer from "./components/Details/DetailsContainer";
import Home from "./components/Home";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import RestaurantForm from "./components/Resuseables/RestaurantForm";
import RestaurantFormEdit from "./components/Resuseables/RestaurantFormEdit";
import { ButtonGroup } from "react-native-elements";




const client = new ApolloClient({
  uri: `http://192.168.1.11:4000/graphql`,
  cache: new InMemoryCache()
});
	
	


export default function App() {

  const Stack = createStackNavigator();

  return (
    <ApolloProvider client={client}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "True Guide",
            headerStyle: {
              backgroundColor: "#1818b4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <View style={{ flexDirection:"row", justifyContent:"center"}}>

                <Button 
                  title="Add"
                  onPress={() => navigation.navigate("Add")}
                />
                <Button style={{flex: 1}}
                  title="About Us"
                  onPress={() => navigation.navigate("About Screen")}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="About Screen"
          component={About}
          options={{ title: "About Screen" }}
        />
        <Stack.Screen
          name="Add"
          component={RestaurantForm}
          options={{ title: "Add " }}
        />
        <Stack.Screen
          name="edit"
          component={RestaurantFormEdit}
          options={{ title: "Edit" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsContainer}
          options={{ title: "Restaurant Details" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
}
_storeData = async () => {
  try {
    await AsyncStorage.setItem("@MySuperStore:key", "I like to save it.");
  } catch (error) {
    // Error saving data
  }
};
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("TASKS");
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d2d2f9",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    color: "red",
  },
});
