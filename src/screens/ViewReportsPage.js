import React from 'react';
import { StyleSheet, Text, View , Alert } from 'react-native';
import { Button } from 'react-native-paper';


export default function ViewReportsPage({navigation}) {

    const handleNav = (page) => {
        navigation.navigate(page)
    }

  return (
    <View style={styles.container}>
      
             <Button mode="contained" onPress={() => handleNav('ViewTasks')} style={styles.button}>
              View Tasks
            </Button>
            <Button mode="contained" onPress={() => handleNav('ViewResources')}  style={styles.button}>
              View Resources
            </Button>
            <Button mode="contained" onPress={() => handleNav('ViewTasksWithResources')}  style={styles.button}>
              View Tasks with Resources
            </Button>
            <Button mode="contained" onPress={() => handleNav('ViewTasksWithResourcesWithCost')} style={styles.button}>
              View Tasks with Resources with cost
            </Button>
            <Button mode="contained" onPress={() => handleNav('viewFinalReport')}  style={styles.button}>
              View final report
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
