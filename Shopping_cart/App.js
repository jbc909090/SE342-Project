import React, { Component } from "react";
import { createAppContainer, createNavigationContainer} from "react-navigation";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/Login";
import Register from "./src/Register";
import Store from "./src/Store";
import GasInstoreStore from "./src/GasInstoreStore";
import CreateCart from "./src/CreateCart";
import ViewTransactions from "./src/ViewTransactions";
import ViewInventory from "./src/ViewInventory";
import Landing from "./src/Landing";
import Home from "./src/Home";

import { NavigationContainer } from '@react-navigation/native';
import createStackNavigator from "react-native-screens/createNativeStackNavigator";


const AppNavigator = createStackNavigator(
  {
    Landing: {
          screen: Landing,
          navigationOptions: () => ({
            header: null
          })
        },
    Login: {
          screen: Login,
          navigationOptions: () => ({
            header: null
          })
        },
    Register: {
        screen: Register,
        navigationOptions: () => ({
        header: null
        })
    },
    Home: {
          screen: Home,
          navigationOptions: () => ({
            header: null
          })
        },
    Store: {
      screen: Store,
      navigationOptions: () => ({
        header: null
      })
    },
    GasInstoreStore: {
          screen: GasInstoreStore,
          navigationOptions: () => ({
            header: null
          })
        },
    ViewInventory: {
          screen: ViewInventory,
          navigationOptions: () => ({
            header: null
          })
        },
    CreateCart: {
      screen: CreateCart,
      navigationOptions: () => ({
        header: null
      })
    },
    ViewTransactions: {
          screen: ViewTransactions,
          navigationOptions: () => ({
            header: null
          })
        }
  },
  {
    initialRouteName: "Landing"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
