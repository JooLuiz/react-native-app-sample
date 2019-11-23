import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPlacesScreen from "./components/MyPlacesScreen";
import MyDenunciasScreen from "./components/MyDenunciasScreen";
import TipoDenunciaScreen from "./components/TipoDenunciaScreen";
import DenunciaScreen from "./components/DenunciaScreen";
import DenunciasUsuarioScreen from "./components/DenunciasUsuarioScreen";
import AddEnderecoScreen from "./components/AddEnderecoScreen";
import SideMenu from "./components/SideMenu";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const BottomNavigator = createStackNavigator(
  {
    Mapa: { screen: HomeScreen, title: "Home" },
    Profile: { screen: ProfileScreen, title: "Perfil" },
    TipoDenuncia: { screen: TipoDenunciaScreen, title: "TipoDenuncia" },
    Denuncia: { screen: DenunciaScreen, title: "Denuncia" },
    DenunciasUsuario: { screen: DenunciasUsuarioScreen, title: "Denuncia" },
    AddEnderecoScreen: {
      screen: AddEnderecoScreen,
      title: "Adicionar Endereco"
    },
    Login: { screen: Login, title: "Login" },
    Register: { screen: Register, title: "Register" }
  },
  {
    headerMode: "none"
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Mapa: BottomNavigator,
    MeusLocais: { screen: MyPlacesScreen, title: "Meus Locais" },
    MinhasDenuncias: { screen: MyDenunciasScreen, title: "Minhas Denuncias" }
  },
  {
    contentComponent: SideMenu
  }
);

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Mapa: { screen: HomeScreen, title: "Home" },
    Profile: { screen: ProfileScreen, title: "Perfil" }
  },
  {
    initialRouteName: "Mapa",
    activeColor: "white"
  }
);

export default AppNavigator;
