import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView  } from "react-native";
import RestaurantInfo from "./Resuseables/RestaurantInfo";
import RatingWithStar from "./Rating/RatingWithStar";
import {
  SearchBar,
  Badge,
  ThemeProvider,
  withTheme,
  TouchableOpacity,
} from "react-native-elements";
import { matchSorter } from "match-sorter";
import { useQuery, gql } from '@apollo/client';

const GET_RESTOS = gql`query restaurants{
  restaurants{
    id
    name
    address
    number
    imageUrl
    details	
    tags
    latitude
    longitude
  }
  
}`;




export default function home({ navigation }) {
  const theme = {
    color: "#000",
  };

  const {loading, error , data, refetch} = useQuery(GET_RESTOS,{pollInterval: 500,})

  const [searchText, setSearchText] = useState("", []);
  const [tagSearch, setTagSearch] = useState("", []);

  const filterBySearchText = () =>
    matchSorter(data.restaurants, searchText, { keys: ["name", "tags"] });
  const filterByTagText = () =>
    matchSorter(data.restaurants, tagSearch, {
      threshold: matchSorter.rankings.EQUAL,
      keys: ["tags"],
    });
    if(loading){return(
      <View><Text>loading...</Text></View>
    )}
    if(error){return(
      <View><Text>error...{error.message}{console.log(error)}</Text></View>
    )}
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(value) => {
          setSearchText(value);
          setTagSearch("");
        }}
        value={searchText}
      />
<Button title={"refresh"} onPress={()=> refetch()}/>
      {searchText == "" &&
        tagSearch == "" &&
        data.restaurants.map((restaurant) => (
          <View style={{ margin: 10 }}>
            <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {restaurant.tags.map((tag) => (
                <View style={{ marginBottom: 25, marginTop: 10, marginEnd: 5 }}>
                  <Badge
                    status="primary"
                    textStyle={{ color: "black" }}
                    badgeStyle={{
                      padding: 10,
                      backgroundColor: "#d2d2f9",
                      borderColor: "blue",
                    }}
                    value={tag}
                    Component={TouchableOpacity}
                    onPress={() => {
                      setTagSearch(tag);
                    }}
                  />
                </View>
              ))}
            </View>

            <RatingWithStar />
            <Button
              color="#6495ed"
              type="raised"
              title={"See more details"}
              onPress={() =>
                navigation.navigate("Details", { restaurant: restaurant })
              }
            />
          </View>
        ))}

      {searchText != "" && tagSearch == "" && (
        <View>
          <View style={{ marginBottom: 5, marginTop: 10, marginEnd: 5 }}>
            <Badge
              status="primary"
              textStyle={{ color: "red" }}
              badgeStyle={{
                padding: 10,
                backgroundColor: "#d2d2f9",
                borderColor: "red",
              }}
              value={"Clear Search"}
              Component={TouchableOpacity}
              onPress={() => setSearchText("")}
            />
          </View>

          {filterBySearchText().map((restaurant) => (
            <View style={{ margin: 10 }}>
              <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {restaurant.tags.map((tag) => (
                  <View
                    style={{ marginBottom: 25, marginTop: 10, marginEnd: 5 }}
                  >
                    <Badge
                      status="primary"
                      textStyle={{ color: "black" }}
                      badgeStyle={{
                        padding: 10,
                        backgroundColor: "#d2d2f9",
                        borderColor: "blue",
                      }}
                      value={tag}
                      Component={TouchableOpacity}
                      onPress={() => {
                        setTagSearch(tag);
                      }}
                    />
                  </View>
                ))}
              </View>
              <RatingWithStar />
              <Button
                color="#6495ed"
                type="raised"
                title={"See more details"}
                onPress={() =>
                  navigation.navigate("Details", { restaurant: restaurant })
                }
              />
            </View>
          ))}
        </View>
      )}
      {tagSearch != "" && (
        <View>
          <View style={{ marginBottom: 0, marginTop: 10, marginEnd: 5 }}>
            <Badge
              status="primary"
              textStyle={{ color: "red" }}
              badgeStyle={{
                padding: 10,
                backgroundColor: "#d2d2f9",
                borderColor: "red",
              }}
              value={"Clear Tags"}
              Component={TouchableOpacity}
              onPress={() => setTagSearch("")}
            />
          </View>
          {filterByTagText().map((restaurant) => (
            <View style={{ margin: 10 }}>
              <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {restaurant.tags.map((tag) => (
                  <View
                    style={{ marginBottom: 25, marginTop: 10, marginEnd: 5 }}
                  >
                    <Badge
                      status="primary"
                      textStyle={{ color: "black" }}
                      badgeStyle={{
                        padding: 10,
                        backgroundColor: "#d2d2f9",
                        borderColor: "blue",
                      }}
                      value={tag}
                      Component={TouchableOpacity}
                      onPress={() => {
                        setTagSearch(tag);
                      }}
                    />
                  </View>
                ))}
              </View>
              <RatingWithStar />
              <Button
                color="#6495ed"
                type="raised"
                title={"See more details"}
                onPress={() =>
                  navigation.navigate("Details", { restaurant: restaurant })
                }
              />
            </View>
          ))}
        </View>
      )}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d2d2f9",
  },
});
