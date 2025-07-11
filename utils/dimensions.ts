import { Dimensions, StatusBar } from "react-native";

export const screenHeight = Dimensions.get("screen").height;
export const windowHeight = Dimensions.get("window").height;
export const windowWidth = Dimensions.get("window").width;
export const mobileBottomNavbarHeight =
  screenHeight - windowHeight - (StatusBar.currentHeight || 0);
