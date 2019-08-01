import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import MyPlacesScreen from "./components/MyPlacesScreen";
import MyDenunciasScreen from "./components/MyDenunciasScreen";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

const BottomNavigator = createStackNavigator(
  {
    Mapa: { screen: HomeScreen, name: "Mapa" },
    Profile: { screen: ProfileScreen, name: "Perfil" },
    MeusLocais: { screen: MyPlacesScreen, name: "Meus Locais" },
    MinhasDenuncias: { screen: MyDenunciasScreen, name: "Minhas Denuncias" }
  },
  {
    headerMode: "none"
  }
);

const AppNavigator = createDrawerNavigator({
  Mapa: BottomNavigator,
  MeusLocais: { screen: MyPlacesScreen, name: "Meus Locais" },
  MinhasDenuncias: { screen: MyDenunciasScreen, name: "Minhas Denuncias" }
});
export default AppNavigator;
