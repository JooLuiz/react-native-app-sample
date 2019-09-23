import React, { Component } from "react";
import {NavigationActions} from 'react-navigation';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class SideMenu extends Component {

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={{ padding: 60, backgroundColor: 'black' }}>
                </View>
                <ScrollView style={{ marginTop: 10 }}>
                    <View>
                        <TouchableOpacity onPress={this.navigateToScreen('Mapa')}>
                            <Text style={styles.screens}> Mapa </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.navigateToScreen('MeusLocais')}>
                            <Text style={styles.screens} > Meus Locais </Text>
                        </TouchableOpacity>
                    </View>
                    <View>    
                        <TouchableOpacity onPress={this.navigateToScreen('MinhasDenuncias')}>
                            <Text style={styles.screens}> Minhas Denuncias </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.navigateToScreen('Login')}>
                            <Text style={styles.screens}> Login </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.version}>
                        <Text style={{ color: "white", fontStyle: 'italic' }}> versão: v0.0.1 Alpha </Text>
                    </View>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={this.navigateToScreen('Login')}>
                            <FontAwesomeIcon icon="cog" color={ 'white' } size={ 28 } />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

} 

const styles = StyleSheet.create ({
    container:{
        flex: 1,
        backgroundColor: "#363636",
        color: "white"
    },
    screens:{
        padding: 20,
        color: 'white'
    },
    footer:{
        flexDirection: 'row',
        width: '100%',
    },
    icon:{
        flex: 1,
        backgroundColor: "black",
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    version:{
        flex: 5,
        backgroundColor: "#1C1C1C",
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SideMenu;