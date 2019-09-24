import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPlacesScreen from "./components/MyPlacesScreen";
import MyDenunciasScreen from "./components/MyDenunciasScreen";
import TipoDenunciaScreen from "./components/TipoDenunciaScreen";
import DenunciaScreen from "./components/DenunciaScreen";
import DenunciasUsuarioScreen from "./components/DenunciasUsuarioScreen";
import SideMenu from "./components/SideMenu";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

const BottomNavigator = createStackNavigator(
  {
    Mapa: { screen: HomeScreen, title: "Home" },
    Profile: { screen: ProfileScreen, title: "Perfil" },
    TipoDenuncia: { screen: TipoDenunciaScreen, title: "TipoDenuncia" },
    Denuncia: { screen: DenunciaScreen, title: "Denuncia" },
    DenunciasUsuario: { screen: DenunciasUsuarioScreen, title: "Denuncia" },
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

export default AppNavigator;
