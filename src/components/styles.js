import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "blue",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: '100%',
      padding: 20,
      minWidth: 500
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    logoutButton: {
      color: '#fff',
      alignSelf: "center"
    },
    callButton: {
      elevation: 8,
      backgroundColor: "blue",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 300,
      padding: 20,
      color: "white"
    },
    formsButton: {
      elevation: 8,
      backgroundColor: "blue",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 300,
      padding: 20,
      color: "white"
    },
    card: {
      borderRadius: 6,
      elevation: 3,
      backgroundColor: '#fff',
      shadowOffset: {width: 1, height: 1},
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 6,
      color: '#000',
      textAlign: "center",
      marginLeft: 15,
      marginRight: 15,
      flex: 1,
  },
  blackText: {
      color: '#000',
  },
  whiteText: {
    color: "white"
  },
  container: {
    marginTop: 50,
  },
  callContainer: {
    marginTop: 50,
    backgroundColor: "lightgrey",
    maxWidth: 500
  },
  dialogStyle: {
    alignSelf: "center",
    maxHeight: 500,
  },
  dialogContainer: {
    alignSelf: "center",
    maxHeight: 700,
  },
  avatarContainer: {
    backgroundColor : "crimson"
  }
});