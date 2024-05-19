import React, { useState,useEffect,useRef  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView,Image,Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import  Drawer from '../shared/drawer';
import  BottomNavBar from '../shared/bottomNavbar';

const Department = () => {
    const navigation = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const flatListRef = useRef(null);


    const images = [
      require('../assets/login_background.jpg'),
      require('../assets/slider_img1.jpg'),
    ];
    useEffect(() => {
      let intervalId;
      if (isAutoSliding) {
        intervalId = setInterval(() => {
          if (currentIndex === images.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(currentIndex + 1);
          }
        }, 3000);
      }
  
      return () => clearInterval(intervalId);
    }, [currentIndex, isAutoSliding]);
  
    const handlePrev = () => {
      setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };
  
    const handleNext = () => {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };
  
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    });
  
    const renderItem = ({ item }) => (
      <Image source={item} style={styles.image} />
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  return (
    <View style={styles.container}>
    <Drawer
    isDrawerOpen={isDrawerOpen}
    setIsDrawerOpen={setIsDrawerOpen}
    isLecturer={false}/>

{!isDrawerOpen && (
<View style={styles.mainContent}>
  
<ScrollView>
  <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <Text style={styles.maintext}>Computer Engineering</Text>
      <View style={styles.secondNavBar}>
        <View style={styles.secondNavBarIcon}>
            <FontAwesome name="graduation-cap" size={20} color="white" />
            <Text style={styles.secondNavBarText}>Instructors</Text>
        </View>
        <View style={styles.secondNavBarIcon}>
            <Ionicons name="briefcase-sharp" size={20} color="white" />
            <Text style={styles.secondNavBarText}>Secretary</Text>
        </View>
        <View style={styles.secondNavBarIcon}>
           <MaterialIcons name="menu-book" size={20} color="white" />
           <Text style={styles.secondNavBarText}>Courses</Text>
        </View>
        <View style={styles.secondNavBarIcon}>
           <Entypo name="plus" size={20} color="white" />
           <Text style={styles.secondNavBarText}>Erasmus</Text>
        </View>
        <View style={styles.secondNavBarIcon}> 
           <FontAwesome5 name="id-card-alt" size={20} color="white" />
           <Text style={styles.secondNavBarText}>Internship</Text>
      </View>
      <View style={styles.secondNavBarIcon}> 
          <AntDesign name="solution1" size={20} color="white" />
          <Text style={styles.secondNavBarText}>Workplace Training</Text>
      </View>
      </View>
      <Text style={styles.heading}>Instructors</Text>
      <View style={styles.lecturerCard}> 
            <Image
                  source={require('../assets/profile-user.png')}
                  style={styles.avatar}
                    />
            <Text style={styles.lecturerText}>Prof. ilhami</Text> 
            <Text style={styles.lecturerPosition}>Head of the department</Text>  
      </View>
      <View style={styles.lecturersContainer}> 
          <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/profile-user.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerText}>Prof. ilhami</Text> 
              <Text style={styles.lecturerPosition}>Head of the department</Text>  
          </View>
          <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/profile-user.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerText}>Prof. ilhami</Text> 
              <Text style={styles.lecturerPosition}>Head of the department</Text>  
          </View>       
      </View>
      <View style={styles.lecturersContainer}> 
          <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/profile-user.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerText}>Prof. ilhami</Text> 
              <Text style={styles.lecturerPosition}>Head of the department</Text>  
          </View>
          <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/profile-user.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerText}>Prof. ilhami</Text> 
              <Text style={styles.lecturerPosition}>Head of the department</Text>  
          </View>       
      </View>
      <View style={styles.lecturersContainer}> 
          <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/profile-user.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerText}>Prof. ilhami</Text> 
              <Text style={styles.lecturerPosition}>Head of the department</Text>  
          </View>
          <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/profile-user.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerText}>Prof. ilhami</Text> 
              <Text style={styles.lecturerPosition}>Head of the department</Text>  
          </View>       
      </View>
  <View style={styles.backgroundDivider}>
       <Text style={styles.whiteHeading}>Secretary</Text>
       <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/avatar-girl.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerTextWhite}>Lexa</Text> 
              <Text style={styles.lecturerPositionWhite}>Head of the department</Text>  
          </View>    
  </View>
  <Text style={styles.heading}>Department Courses</Text>
  <View style={[styles.rectangleRed, isDropdownOpen && styles.expanded]}>
        <Text style={styles.Rectangletitle}>First Year</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={[styles.arrow, isDropdownOpen && styles.arrowUp]}>▼</Text>
        </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContent}>
          <View style={styles.smester}>
            <Text style={styles.semesterHeading}>First</Text>
             <View style={styles.ClassCardContainer}>
                <View style={styles.semsterClassCardRed}>

                </View>
             </View>
          </View>
        </View>
      )}
    </View>
    <View style={[styles.rectangleGreen, isDropdownOpen && styles.expanded]}>
        <Text style={styles.Rectangletitle}>Second Year</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={[styles.arrow, isDropdownOpen && styles.arrowUp]}>▼</Text>
        </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContent}>
          <View style={styles.smester}>
            <Text style={styles.semesterHeading}>First</Text>
             <View style={styles.ClassCardContainer}>
                <View style={styles.semsterClassCardRed}>

                </View>
             </View>
          </View>
        </View>
      )}
    </View>
    <View style={[styles.rectangleBlue, isDropdownOpen && styles.expanded]}>
        <Text style={styles.Rectangletitle}>Third Year</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={[styles.arrow, isDropdownOpen && styles.arrowUp]}>▼</Text>
        </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContent}>
          <View style={styles.smester}>
            <Text style={styles.semesterHeading}>First</Text>
             <View style={styles.ClassCardContainer}>
                <View style={styles.semsterClassCardRed}>

                </View>
             </View>
          </View>
        </View>
      )}
    </View>
    <View style={[styles.rectangleYellow, isDropdownOpen && styles.expanded]}>
        <Text style={styles.Rectangletitle}>Forth Year</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={[styles.arrow, isDropdownOpen && styles.arrowUp]}>▼</Text>
        </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContent}>
          <View style={styles.smester}>
            <Text style={styles.semesterHeading}>First</Text>
             <View style={styles.ClassCardContainer}>
                <View style={styles.semsterClassCardRed}>

                </View>
             </View>
          </View>
        </View>
      )}
    </View>
    <Text style={styles.heading}>Erasmus +</Text>
    <View style={styles.backgroundDividerBig}>
    <Text style={styles.whiteParag}>What is Erasmus+ program?</Text>
       <Text style={styles.whiteParag}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
       <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/profile-user.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerTextWhite}>Prof. ilhami</Text> 
              <Text style={styles.lecturerPositionWhite}>Head of the department</Text>  
          </View>    
  </View>
  <Text style={styles.lecturerText}>________________________________________</Text> 
  <Text style={styles.heading}>Internship</Text>   
    <Text style={styles.blueParag}>What is Internship?</Text>
       <Text style={styles.blueParag}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
       <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/avatar-girl.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerText}>Alex</Text> 
              <Text style={styles.lecturerPosition}>Internship Coordinator</Text> 
              <Text style={styles.lecturerText}>________________________________________</Text>  
          </View> 
          <Text style={styles.heading}>Workplace Training</Text>
    <View style={styles.backgroundDividerBig}>
    <Text style={styles.whiteParag}>What is Workplace Training?</Text>
       <Text style={styles.whiteParag}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
       <View style={styles.lecturerCard}> 
              <Image
                    source={require('../assets/avatar-girl.png')}
                    style={styles.avatar}
                      />
              <Text style={styles.lecturerTextWhite}>Lora</Text> 
              <Text style={styles.lecturerPositionWhite}>Workplace training Coordinator</Text>  
          </View>    
  </View>
  </ScrollView>
  </View>

)} 
{!isDrawerOpen && (
<TouchableOpacity style={styles.chatpot}>
  <Ionicons name="help-circle-sharp" size={30} color="white" />
</TouchableOpacity>
)} 


{!isDrawerOpen && (
  <BottomNavBar 
  isLecturer={false}/>
)} 
</View>
);
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    mainContent: {
      zIndex: 0,
      height: '82%',
      left:0,
      right:0
    },
    
 navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#223F76',
    paddingHorizontal: 10,
    zIndex: 100,
  },
  menuButton: {
    marginRight: 102,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF'
  },

  drawer: {
    position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: '#223F76',
  padding: 50,
  zIndex: 99,
  },
  drawerContent: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#FFFFFF',
    marginBottom:10,
    marginTop:30
  },
  button: {
    backgroundColor: '#C8272E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:148,
    borderRadius: 5,
    marginLeft:'25%',
    marginTop:74
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  
  bottomNavBar:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#223F76',
    paddingLeft:10,
    paddingRight:60,
    paddingBottom:20,
    
   },
   
   bottomNavBarContent:{
   
    textAlign: 'center',
    color: '#FFFFFF',
    marginHorizontal:'16%'
   },
   

  chatpot: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#223F76', 
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
    marginBottom:80
  },

  image: {
    width: Dimensions.get('window').width,
    height: 229,
  },
  maintext: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom:20,
    color: '#223F76'
  },
  secondNavBar: {
    flexDirection: 'row',
    flexShrink:0,
    alignItems: 'center',
    height: 50,
    backgroundColor: '#223F76',
    paddingRight:15,
    paddingLeft:7
  },
  secondNavBarIcon:{
    marginHorizontal:5,
    alignItems:'center'
  },
  secondNavBarText:{
    fontSize: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    color: '#223F76'
  },
  avatar:{
    width: 100,
    height: 100,
    marginTop:'5%',
    alignSelf:'center'
  },
  lecturerText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#223F76'
  },
  lecturerPosition: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    color: '#223F76'
  },
  lecturerTextWhite: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#ffffff'
  },
  lecturerPositionWhite: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    color: '#ffffff'
  },
  lecturerCard:{
    margin:10,
    alignItems:'center',
  },
  lecturersContainer:{
    flexDirection:'row',
    alignSelf:'center',

  },
  backgroundDivider: {
    flexDirection: 'column',
    flexShrink:0,
    height: 250,
    backgroundColor: '#223F76',
    marginVertical:20,
    paddingVertical:25,
        
  },
  whiteHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  rectangleRed: {
    backgroundColor: '#FFE6E6',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden', 
  },
  rectangleGreen: {
    backgroundColor: '#E6FFEF',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden', 
  },
  rectangleBlue: {
    backgroundColor: '#E0EBFF',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden', 
  },
  rectangleYellow: {
    backgroundColor: '#FDFFE0',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden', 
    marginBottom:'10%'
  },
  expanded: {
    paddingBottom: 100, // Adjust as needed to accommodate the dropdown content
  },
  Rectangletitle: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft:15,
    color:'#223F76'
  },
  dropdownButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  arrow: {
    fontSize: 20,
    color:'#223F76'
  },
  arrowUp: {
    transform: [{ rotate: '180deg' }],
    color:'#223F76',
  },
  dropdownContent: {
    top: 10, 
    width:'100%',
    backgroundColor: '#F5F5F5',
    padding: 10,
    zIndex: 1,
  },
  smallCardRed: {
    width: 20, 
    height: 30,
    borderRadius: 4,
    backgroundColor: '#E88287',
    padding:4,
    alignItems:'center',
    marginLeft:5,
    marginTop:7,
  }, 
  smester:{
    flexDirection:'column',
    alignItems:'flex-start'
  },
  semesterHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    color: '#223F76'
  },
 
  semsterClassCardRed:{
      width: 67, 
      height: 79,
      borderRadius: 4,
      backgroundColor: '#FFE6E6',
      shadowColor: 'rgba(0, 0, 0, 0.08)',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 4,
      marginRight:10,
      alignItems: 'center',
      padding:4,
  },
  ClassCardContainer:{
    flexDirection:'row',
    margin:10
  },
  whiteParag: {
    fontSize: 15,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom:10,
  },
  backgroundDividerBig: {
    flexDirection: 'column',
    flexShrink:0,
    height:350,
    backgroundColor: '#223F76',
    marginTop:20,
    marginBottom:50,
    paddingVertical:25,
  },
  blueParag: {
    fontSize: 15,
    textAlign: 'center',
    color: '#1F3D75',
    marginBottom:10,

  },

})

export default Department; 


