import React, { useEffect , useState } from "react";
import { Text , View , StyleSheet } from "react-native";
import { dbRoot } from "../APIs/firebase";
import { Table, Row, Rows } from 'react-native-table-component';
import { List } from "react-native-paper";

export default function AssignResources({navigation}) {

    const [tasks,setTasks] = useState([])
    const [resources,setResources] = useState ([])
    const [tableHead,setTableHead] = useState (['Task ID' , 'Task Name' , 'Duration' , 'Start\n(Date)' , 'Finish\n(Date) ','Resource','Change Resource'])
    const [tableData,setTableData] = useState ([])
    let arrayOfTasks = []
    let arrayOfResources = []
    async function getDataFromFireBase() {
        

        dbRoot.collection('Resources').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const resourseData = doc.data();
                arrayOfResources.push(resourseData);
            });
            console.log('array of resources from firebsae : ' , arrayOfResources);
            setResources(arrayOfResources);
        });

         dbRoot.collection('Tasks').onSnapshot( (querySnapshot) => {
         querySnapshot.forEach((doc) => {
                const taskData = doc.data();
                arrayOfTasks.push(taskData);
            });
            console.log('array of tasks from firebsae : ' , arrayOfTasks);
            formatData(arrayOfTasks)
            setTasks(arrayOfTasks);
        });
        
    }

    const formatDate = (D,M,Y) => {
        return `${D}/${M}/${Y}`
    }

    const getDuration = (SD,SM,SY,FD,FM,FY) => {
        let day = FD - SD;
        let month = FM - SM;
        let year = FY - SY;

        let duration = day + (month * 30) + (year * 360)
        return duration + ' days'

    }

    const formatData = (tasks) => {
        let tableDataObject = []

        if(tasks.length) {
            tasks?.forEach(element => {
                console.log('element of tasks : ' ,element);

                let data = [element.TaskID,
                            element.TaskName,
                            getDuration(element.StartD,element.StartM,element.StartY,element.FinishD,element.FinishM,element.FinishY),
                            formatDate(element.StartD,element.StartM,element.StartY),
                            formatDate(element.FinishD,element.FinishM,element.FinishY),
                            element.ResourceName,
                            <View>
                            <List.Accordion
                        title= {element.ResourceName}
                        style={{backgroundColor:'#FFFFFF'}}
                        titleStyle={{fontSize:7,textAlign:'center'}}
                        >
                        {console.log('resources : ' , resources)}
                        {arrayOfResources.map((resource) => 
                            <List.Item title={resource.ResourceName} titleStyle={{fontSize:6,textAlign:'center'}} onPress={() => assignResource(element,resource.ResourceID,resource.ResourceName)}/>
                            )}
                       
                    </List.Accordion>
                    </View>,    
                        ]
            let tempArray = tableData;
            tempArray.push(data)
            console.log('temp array' , tempArray);
            data = []
    
            });
 
        }
        
        
    }

    


    const assignResource = (task,ResourceID,ResourceName) => {
        const newTask = task;
        newTask.ResourceName = ResourceName;
        newTask.ResourceID = ResourceID;
        dbRoot.collection("Tasks").doc(task.TaskID).set(newTask).then(() => {
            console.log("updated task : " , newTask);
            navigation.navigate("ViewTasksWithResources")
        }).catch((error) => {
            console.log("Error happend while updating the task : " , error);
        })
    }

    useEffect(() => {
        getDataFromFireBase();
    },[])

    return (
        <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
        
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 0, paddingTop: 30, backgroundColor: '#fff'
    },
    head: { height: 80, backgroundColor: '#f1f8ff' },
  text: { textAlign:'center' , fontSize:11,}
  });
  