import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { MaterialIcons } from "@expo/vector-icons";

export default class RenderInventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ItemQuantity: 0,
    };
  }
  render() {
    return (
      <View>
        {/* ITEM */}
        <View style={{ flexDirection: "row", height: 110 }}>
          {/* ITEM IMAGE */}
          <View style={{ width: "40%" }}>
            <Image
              source={this.props.ItemPhoto}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          {/* ITEM DESCRIPTION */}
          <View style={{ width: "60%", paddingTop: "8%" }}>
            <Text
              style={{ fontSize: 15, color: "#3d5c5c", fontWeight: "bold" }}
            >
              {this.props.ItemName}
            </Text>
            <Text
              style={{ fontSize: 12, paddingTop: "3%", fontWeight: "bold" }}
            >
              ${this.props.ItemPrice} | {this.props.ItemPoints} points
            </Text>





          </View>
        </View>

        <View style={styles.hr}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5
  }
});
