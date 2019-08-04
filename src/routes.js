import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import MyPlacesScreen from "./components/MyPlacesScreen";
import MyDenunciasScreen from "./components/MyDenunciasScreen";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: { screen: ProfileScreen, title: "Perfil" }
  },
  {
    headerMode: "none"
  }
);

const MapStackNavigator = createStackNavigator(
  {
    Map: { screen: HomeScreen, title: "Home" }
  },
  {
    headerMode: "none"
  }
);

const BottomNavigator = createStackNavigator(
  {
    Mapa: MapStackNavigator,
    Profile: ProfileStackNavigator
  },
  {
    headerMode: "none"
  }
);

const AppNavigator = createDrawerNavigator({
  Mapa: BottomNavigator,
  MeusLocais: { screen: MyPlacesScreen, title: "Meus Locais" },
  MinhasDenuncias: { screen: MyDenunciasScreen, title: "Minhas Denuncias" }
});
export default AppNavigator;
