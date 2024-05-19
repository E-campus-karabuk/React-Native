import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor:'#FFFFFF'
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    color: '#223F76'
  },
  searchBar:{
    flexDirection: 'row',
    width: 190,
    height: 19,
    borderRadius: 4,
    backgroundColor: 'rgba(210, 210, 210, 0.60)', 
    padding:2
  },
  searchText: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft:7,
    marginRight:'65%',
    marginBottom:2,
    color: '#ffffff'
  },whiteFilterButton:{
    flexDirection: 'row',
    width: 80,
    height: 19,
    borderRadius: 4,
    backgroundColor: '#ffffff', 
    padding:2,
    marginLeft:5,
    alignItems: 'center',
  },
  whiteFilterButtonText: {
    fontSize: 10,
    textAlign: 'center',
    marginLeft:10,
    marginRight:3,
    color: '#C8272E'
  },
  tableHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    width: 380,
    height: 37,
    marginLeft:7,
    paddingHorizontal:7,
    borderRadius: 4,
    backgroundColor: 'rgba(210, 210, 210, 0.50)', 
  },
   card: {
    flexDirection:'row',
    width: 360,
    height: 322,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    shadowOpacity:50,
    shadowOffset:60,
    shadowColor:'#E8E8E8',
    padding: 5,
    marginLeft: 16
  },
  smallcard: {  
     marginTop:6,
    alignSelf:'center',
    flexDirection:'row',
    width: 340,
    height: 86,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginBottom:7,
    paddingHorizontal:5,
    
 },
 ProfilePicIcon: {
  width: 70, 
  height: 70, 
  marginLeft:7,
  alignSelf: 'center', 
},
tableCardDate: {
  fontSize: 9,
  textAlign: 'left',
  marginTop:20,
  marginRight:'40%',
  color: '#1F3D75'
},
tableCardMsgPreview: {
  fontSize: 9,
  textAlign: 'left',
  marginTop:15,
  marginRight:'15%',
  marginLeft: '10%',
  color: '#1F3D75'
},
tableCardHeading: {
  fontSize: 13,
  fontWeight: 'bold',
  textAlign: 'left',
  marginLeft: '10%',
  marginTop:20,
  color: '#1F3D75'
},
whiteFilterButtonNotification:{
  flexDirection: 'row',
  width: 100,
  height: 30,
  borderRadius: 4,
  backgroundColor: '#ffffff', 
  padding:2,
  marginLeft:15,
  alignItems: 'center',
},
whiteFilterButtonTextNotification: {
  fontSize: 15,
  textAlign: 'center',
  marginLeft:20,
  marginRight:3,
  color: '#C8272E'
},
tableHeaderNotification:{
  flexDirection: 'row',
  alignItems: 'center',
  width: 400,
  height: 50,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: 'rgba(245, 245, 245, 0.32)',
  backgroundColor: 'rgba(210, 210, 210, 0.20)',
  borderWidth: 2, 
  borderColor:'#E8E8E8',
  paddingLeft:15
},
notificationTime: {
  fontSize: 9,
  textAlign: 'left',
  marginTop:20,
  marginLeft:'25%',
  color: '#1F3D75'
},

maintext: {
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: 20,
  color: '#223F76'
},
subtext: {
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: 20,
  color: '#C8272E'
},
subsubtext: {
  fontSize: 10,
  textAlign: 'left',
  color: '#223F76',

}, 
subsubredtext: {
  fontSize: 12,
  textAlign: 'center',
  color: '#C8272E',
},
subhead: {
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'left',
  marginBottom:20,
  marginLeft:'10%',
  marginTop:5,
  color: '#223F76'
},
month: {
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#595959',
  marginTop:10
},
day: {
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#C8272E',
  marginBottom:5,
  marginTop:5
},
weekday: {
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom:5,
  color: '#223F76'
},
lessons: {
  fontSize: 12,
  textAlign: 'left',
  color: '#223F76',
  marginLeft:'10%',
  fontWeight: 'bold',
  marginBottom:5
},
lessongray: {
  fontSize: 9,
  textAlign: 'left',
  marginLeft:'10%',
  marginTop:2,
  color: '#595959'
},
lessonred: {
  fontSize: 9,
  textAlign: 'left',
  marginLeft:'10%',
  marginTop:2,
  color: '#C8272E'
},
card: {
  flexDirection:'row',
  width: 360,
  height: 322,
  backgroundColor: '#E8E8E8',
  borderRadius: 4,
  shadowOpacity:50,
  shadowOffset:60,
  shadowColor:'#E8E8E8',
  padding: 5,
  marginLeft: 16
},
mainContent: {
  zIndex: 0,
  height: '82%',
  left:0,
  right:0
},
  icon: {
    marginLeft:'60%',
  },
  textInput: {
    fontSize: 12,
    marginLeft: '7%',
  },
})

export default styles; 