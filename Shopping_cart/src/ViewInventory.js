import React, {useState,useEffect} from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import ShoppingStore from "./photos/ShoppingStore.jpg";
import RenderClothes from "./RenderInventory";

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
export default class ViewInventory extends React.Component {



  constructor(props) {
    super(props);
    console.log("inside constructor")
    this.state = {

      items: [
        {
          ItemKey: 1,
          ItemName: "Donut",
          ItemPrice: 2.56,
          ItemPhoto: require("./photos/shirt1.jpg"),
          ItemPoints: 2
        },
        {
          ItemKey: 2,
          ItemName: "Coffee",
          ItemPrice: 2.65,
          ItemPhoto: require("./photos/shirt2.jpg"),
          ItemPoints: 2

        },
        {
          ItemKey: 4,
          ItemName: "Sandwich",
          ItemPrice: 3.65,
          ItemPhoto: require("./photos/shirt5.jpg"),
          ItemPoints: 2
        },
        {
          ItemKey: 5,
          ItemName: "Bread",
          ItemPrice: 3.56,
          ItemPhoto: require("./photos/shirt3.jpg"),
          ItemPoints: 2

        },
        {
            ItemKey: 6,
            ItemName: "Pop",
            ItemPrice: 12.99,
            ItemPhoto: require("./photos/pop.jpg"),
            ItemPoints: 2

        },
        {
            ItemKey: 7,
            ItemName: "Standard Gas",
            ItemPrice: 2,
            ItemPhoto: require("./photos/shirt4.jpg"),
            ItemPoints: 1

        },
        {
            ItemKey: 8,
            ItemName: "Premium 1 Gas",
            ItemPrice: 2.50,
            ItemPhoto: require("./photos/premium1.jpg"),
            ItemPoints: 1

        },
        {
            ItemKey: 9,
            ItemName: "Premium 2 Gas",
            ItemPrice: 3,
            ItemPhoto: require("./photos/premium2.jpg"),
            ItemPoints: 1

        },

      ],
    };
    console.log("after set state");
  }


  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 60,
            flexDirection: "row",
            marginTop: "6.5%"
          }}
        >
          {
            <Ionicons
              name="md-arrow-back"
              size={30}
              color="#404040"
              style={{ paddingTop: 12, paddingLeft: "9%" }}
              onPress={() =>
                this.props.navigation.navigate("Landing", {
                })
              }
            />
          }
          <View
            style={{
              borderBottomWidth: 0.8,
              height: 33,
              width: "33%",
              borderTopWidth: 0.8,
              padding: 0,
              marginTop: 12,
              marginLeft: "16%"
            }}
          >
            <Text
              style={{ fontSize: 20, color: "#404040", textAlign: "center" }}
            >
              View Inventory
            </Text>
          </View>
          <AntDesign
            name="filter"
            size={30}
            color="black"
           // size={30}
            style={{ paddingTop: 12, paddingLeft: "20%" }}
          />
        </View>

        {/* BACKGROUND IMAGE */}
        <View style={{ width: "100%", height: 90, backgroundColor: "#0044cc" }}>
          <Image
            source={ShoppingStore}
            resizeMode="cover"
            style={{ width: "100%", height: 90 }}
          ></Image>
        </View>

        {/* NO OF USER POINTS */}
        <View
          style={{
            backgroundColor: "#8B4000",
            height: 30,
            alignItems: "flex-start",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              marginRight: 6,
              marginLeft: 6
            }}
          >

          </Text>
        </View>

        {/* RENDERING ITEMS USING MAP FUNCTION */}
        <ScrollView style={{ height: "70%", marginBottom: 10 }}>
          {this.state.items.map(items => {
            return (
              <RenderClothes
                key={items.ItemKey}
                ItemKey={items.ItemKey}
                ItemName={items.ItemName}
                ItemPrice={items.ItemPrice}
                ItemPhoto={items.ItemPhoto}
                ItemSale={items.ItemSale}
                ItemPoints={items.ItemPoints}
                addCart={this.addCart}
              />
            );
          })}
        </ScrollView>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  }
});
