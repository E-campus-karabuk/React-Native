import  Drawer from '../shared/drawer';
import  BottomNavbar from '../shared/bottomNavbar';

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeLecturer from '../screens/Lecturer/homeLecturer'; 

const MyLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <View style={styles.container}>
            
          
        <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        isLecturer={false}/>


      {/* Main Layout */}
      {!isDrawerOpen && (
      <View style={styles.mainContent}>

      {/* <HomeLecturer/> */}
     
      </View>
       )} 

               
        <BottomNavBar 
        isLecturer={false}/>
         

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainContent: {
    height: '80%',
    backgroundColor: 'red'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyLayout;