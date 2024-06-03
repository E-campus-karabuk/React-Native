import React, { useState, Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNavbar = ({setIsDrawerOpen, isLecturer}) => {
  const navigation = useNavigation();

  const handleBottomNavBar = (screenIdentifier) => {
    const screenName = isLecturer ? `${screenIdentifier}Lecturer` : screenIdentifier;
      navigation.navigate(screenName);
  };
  

  return (
    <View style={styless.container}>  
      <View style={styless.bottomNavBar}>
          <TouchableOpacity onPress={() => handleBottomNavBar('Notifications')}>
      
            <View style={styless.iconcon}>     
                <MaterialIcons name="notifications" size={24} color="white" style={styless.bottomNavBarContent}/>
                <View style={styless.badgeContainer}>
                   <Text style={styless.badgeText} >3</Text>
                </View>
            </View>
           
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBottomNavBar('Home')}>
              <MaterialCommunityIcons name="home-variant" size={24} color="white" style={styless.bottomNavBarContent}/>
          </TouchableOpacity> 
            <TouchableOpacity onPress={() => handleBottomNavBar('Profile')}>
            <FontAwesome6 name="user-large" size={20} color="white" style={styless.bottomNavBarContent}/>
            </TouchableOpacity> 
            {isLecturer}
           {!isLecturer}
        </View>
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    backgroundColor: '#223F76',
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    bottom: 0,
    height: '10%'
  },
  bottomNavBar:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: '3%',
    paddingHorizontal: 20,
   },
   
   bottomNavBarContent:{
    textAlign: 'center',
    color: '#FFFFFF',
   },
   
  iconcon: {
    position: 'relative',
    width: 30,
    height: 30,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BottomNavbar;
