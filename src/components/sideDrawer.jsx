import { View, Text, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

function DrawerComponent() {
  return (
    <Drawer.Navigator>
      <View>
        <Text>Menu</Text>
      </View>
      <Drawer.Screen name="Settings" component={settingsScreen}></Drawer.Screen>
      <Drawer.Screen name="About" component={aboutScreen}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

function settingsScreen({ navigation }) {
  return (
    <View>
      <Text>this is the settings screen</Text>
      <Button
        onPress={() => navigation.navigate("About")}
        title="go to about"
      />
    </View>
  );
}
function aboutScreen() {
  return <Text>this is the about screen</Text>;
}

export default DrawerComponent;
