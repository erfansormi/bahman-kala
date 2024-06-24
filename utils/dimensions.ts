import { Dimensions, StatusBar } from "react-native";

export const screenHeight = Dimensions.get("screen").height;
export const windowHeight = Dimensions.get("window").height;
export const mobileBottomNavbarHeight =
  screenHeight - windowHeight - (StatusBar.currentHeight || 0);
