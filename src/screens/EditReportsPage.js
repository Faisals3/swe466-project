import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';



export default function EditsReportsPage({navigation}) {
  const handleNav = (page) => {
    navigation.navigate(page)
}


  return (
    <View style={styles.container}>
            <Button mode="contained" onPress={() => handleNav('EditTasks')} style={styles.button}>
              Edit Tasks
            </Button>
            <Button mode="contained" onPress={() => handleNav('EditResources')} style={styles.button}>
              Edit Resources
            </Button>
            <Button mode="contained" onPress={() => handleNav('AssignResources')} style={styles.button}>
              Assign Resources with Tasks
            </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button : {
    margin:20,
  },
});
