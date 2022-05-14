import React, { useEffect , useState } from "react";
import { Text , View , StyleSheet } from "react-native";
import { dbRoot } from "../APIs/firebase";
import { Table, Row, Rows } from 'react-native-table-component';

export default function ViewFinalReport() {

    const [tasks,setTasks] = useState([])
    const [resources,setResources] = useState ([])
    const [tableHead,setTableHead] = useState (['Task ID' , 'Task Name' , 'Duration' , 'Start\n(Date)' , 'Finish\n(Date)' , 'Resource Name' , "Total Cost"])
    const [tableData,setTableData] = useState ([])
    const [updateTable ,setUpdateTable] = useState(false)

   
    const getDataFromFireBase =  () => {
        
        let arrayOfTasks = []
        let arrayOfResources = []

        dbRoot.collection('Tasks').onSnapshot( async (querySnapshot) => {
            querySnapshot.forEach(async(doc) => {
                   const taskData = doc.data();
                   if(taskData.ResourceID) {
                    var docRef = dbRoot.collection("Resources").doc(taskData.ResourceID);
                    await docRef.get().then((doc) => {
                         if (doc.exists) {
                             console.log("Resource function data:", doc.data());
                             const tempResource = doc.data();
                             taskData.ResourceType = tempResource.Type
                              taskData.ResourceCostHour = tempResource.CostHour
                              taskData.ResourceCostUse = tempResource.CostUse
                              console.log("taskData final : ",taskData);
                              arrayOfTasks.push(taskData);
                              
                              
                         } else {
                             // doc.data() will be undefined in this case
                             console.log("No such document!");
                         }
                     }).catch((error) => {
                         console.log("Error getting document:", error);
                     });
                     console.log('array of tasks from firebase : ' , arrayOfTasks);
                     formatData(arrayOfTasks)
                     setTasks(arrayOfTasks);
                   }
                  
                   
               });

             
                
              
               
           });

        dbRoot.collection('Resources').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const resourseData = doc.data();
                arrayOfResources.push(resourseData);
            });
            setResources(arrayOfResources);
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
        return duration

    }

    const getCost = (type,hour,use,duration) => {
        if(type == "Work") { 
            return hour * 24 * duration
        }

        if (type == "Use") {
            return use

        }

        else return ""
    }

    const formatData = (tasks) => {
        let totalcost = 0;
        console.log("assign tasks : " , tasks);
        let tempArray = [];
            tasks?.forEach(element => {
                let elementCost = getCost(element.ResourceType,element.ResourceCostHour,element.ResourceCostUse , getDuration(element.StartD,element.StartM,element.StartY,element.FinishD,element.FinishM,element.FinishY)) ;
                let data = [element.TaskID,
                            element.TaskName,
                            getDuration(element.StartD,element.StartM,element.StartY,element.FinishD,element.FinishM,element.FinishY) + ' days',
                            formatDate(element.StartD,element.StartM,element.StartY),
                            formatDate(element.FinishD,element.FinishM,element.FinishY),
                            element.ResourceName,
                            elementCost+'$'
                            ]
            totalcost += elementCost.parseInt()
            tempArray.push(data)
            data = []
            });

        let elementTotalCost = [
            "Total Cost","","","","","",totalcost+'$'
        ]
        tempArray.push(elementTotalCost)
        setTableData(tempArray)    
        console.log("Array to assign : " , tempArray);
        
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
        flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff'
    },
    head: { height: 80, backgroundColor: '#f1f8ff' },
  text: { textAlign:'center' , fontSize:11,}
  });
  