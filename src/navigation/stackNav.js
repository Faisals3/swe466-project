import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import myTabsNav from './myTabsNav';
import ViewTasks from '../screens/ViewTasks';
import ViewResources from '../screens/ViewResources';
import ViewTasksWithResources from '../screens/ViewTasksWithResources';
import ViewTasksWithResourcesWithCost from '../screens/ViewTaskswithResourcesWithCost';
import viewFinalReport from '../screens/ViewFinalReport'
import EditTasks from '../screens/EditTasks';
import EditResources from '../screens/EditResources';
import AssignResources from '../screens/AssignResources';


const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="myTabsNav" component={myTabsNav} options={{ headerShown: false }} />
      <Stack.Screen name="ViewTasks" component={ViewTasks} options={{ headerShown: true }}/>
      <Stack.Screen name="ViewResources" component={ViewResources} options={{ headerShown: true }}/>
      <Stack.Screen name="ViewTasksWithResources" component={ViewTasksWithResources} options={{ headerShown: true }}/>
      <Stack.Screen name="ViewTasksWithResourcesWithCost" component={ViewTasksWithResourcesWithCost} options={{ headerShown: true }}/>
      <Stack.Screen name="viewFinalReport" component={viewFinalReport} options={{ headerShown: true }}/>

      {/* report pages  */}
      <Stack.Screen name="EditTasks" component={EditTasks} options={{ headerShown: true }}/>
      <Stack.Screen name="EditResources" component={EditResources} options={{ headerShown: true }}/>
      <Stack.Screen name="AssignResources" component={AssignResources} options={{ headerShown: true }}/>
    </Stack.Navigator>
  );
}