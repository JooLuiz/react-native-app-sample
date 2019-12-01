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
import CameraScreen from "./components/CameraScreen";
import DenunciasRecentesScreen from "./components/DenunciasRecentesScreen";
import ProfileCameraScreen from "./components/ProfileCameraScreen";
import BackgroundCameraScreen from "./components/BackgroundCameraScreen";

const BottomNavigator = createStackNavigator(
  {
    Mapa: { screen: HomeScreen, title: "Mapa" },
    Profile: { screen: ProfileScreen, title: "Perfil" },
    TipoDenuncia: { screen: TipoDenunciaScreen, title: "Tipo de Denúncia" },
    Denuncia: { screen: DenunciaScreen, title: "Denúncia" },
    DenunciasUsuario: { screen: DenunciasUsuarioScreen, title: "Denúncia" },
    Camera: { screen: CameraScreen, title: "Camera" },
    FotoPerfil: { screen: ProfileCameraScreen, title: "Foto de Perfil" },
    PlanoFundo: { screen: BackgroundCameraScreen, title: "Plano de Fundo" },
    MeusLocais: { screen: MyPlacesScreen, title: "Meus Locais" },
    MinhasDenuncias: { screen: MyDenunciasScreen, title: "Minhas Denúncias" },
    DenunciasRecentes: {
      screen: DenunciasRecentesScreen,
      title: "Denúncias Recentes"
    },
    AddEnderecoScreen: {
      screen: AddEnderecoScreen,
      title: "Adicionar Endereco"
    },
    Login: { screen: Login, title: "Login" },
    Register: { screen: Register, title: "Register" }
  },
  {
    initialRouteName: "Mapa",
    defaultNavigationOptions: {
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Mapa: BottomNavigator
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
