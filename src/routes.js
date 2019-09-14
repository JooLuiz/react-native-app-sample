import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPlacesScreen from "./components/MyPlacesScreen";
import MyDenunciasScreen from "./components/MyDenunciasScreen";
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";

const BottomNavigator = createStackNavigator({
	Mapa: { screen: HomeScreen, title: "Home" },
    	Profile: { screen: ProfileScreen, title: "Perfil" },
  },
  {
    headerMode: "none"
  }
);

const SignScreens = createSwitchNavigator({
	Login: { screen: Login },
    Register: { screen: Register },
})

const AppNavigator = createDrawerNavigator({
  Mapa: BottomNavigator,
  MeusLocais: { screen: MyPlacesScreen, title: "Meus Locais" },
  MinhasDenuncias: { screen: MyDenunciasScreen, title: "Minhas Denuncias" },
  SignScreens
});

export default AppNavigator;
