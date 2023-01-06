import React, {useState,useEffect} from "react";
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import ShoppingStore from "./photos/ShoppingStore.jpg";
import RenderClothes from "./RenderClothes";

export default class Landing extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

    };
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
          <Feather
            name="menu"
            size={30}
            color="#404040"
            style={{ paddingTop: 12, paddingLeft: "7%" }}
          />
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
              Gas Station
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

        {/* NO OF ITEMS */}
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
            Welcome!
          </Text>
        </View>


        <TouchableOpacity
            style={{
                backgroundColor: "#8B4000",
                width: "70%",
                height: 30,
                borderRadius: 7,
                paddingTop: 5,
                marginLeft: "16%"
            }}
            onPress={() =>
                this.props.navigation.navigate("Login", {
                })
            }
            >
                <Text
                    style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                >
                    Login
                </Text>
        </TouchableOpacity>
        {/* Register */}
        <TouchableOpacity
            style={{
                backgroundColor: "#8B4000",
                width: "70%",
                height: 30,
                borderRadius: 7,
                paddingTop: 5,
                marginLeft: "16%"
            }}
            onPress={() =>
                this.props.navigation.navigate("Register", {
                })
            }
            >
                <Text
                    style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                >
                    Register
                </Text>
        </TouchableOpacity>
        {/* Inventory */}
        <TouchableOpacity
            style={{
                backgroundColor: "#8B4000",
                width: "70%",
                height: 30,
                borderRadius: 7,
                paddingTop: 5,
                marginLeft: "16%"
            }}
            onPress={() =>
                this.props.navigation.navigate("ViewInventory", {
                })
            }
            >
                <Text
                    style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                >
                    View Inventory
                </Text>
        </TouchableOpacity>
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
