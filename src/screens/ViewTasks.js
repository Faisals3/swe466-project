import React, { useEffect , useState } from "react";
import { Text , View , StyleSheet } from "react-native";
import { dbRoot } from "../APIs/firebase";
import { Table, Row, Rows } from 'react-native-table-component';

export default function ViewTasks() {

    const [tasks,setTasks] = useState([])
    const [resources,setResources] = useState ([])
    const [tableHead,setTableHead] = useState (['Task ID' , 'Task Name' , 'Duration' , 'Start\n(Date)' , 'Finish\n(Date)'])
    const [tableData,setTableData] = useState ([])

    async function getDataFromFireBase() {
        let arrayOfTasks = []
        let arrayOfResources = []

         dbRoot.collection('Tasks').onSnapshot( (querySnapshot) => {
         querySnapshot.forEach((doc) => {
                const taskData = doc.data();
                arrayOfTasks.push(taskData);
            });
            console.log('array of tasks from firebsae : ' , arrayOfTasks);
            formatData(arrayOfTasks)
            setTasks(arrayOfTasks);
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
        return duration + ' days'

    }

    const formatData = (tasks) => {
        let tableDataObject = []

        if(tasks.length) {
            tasks?.forEach(element => {
                let data = [element.TaskID,
                            element.TaskName,
                            getDuration(element.StartD,element.StartM,element.StartY,element.FinishD,element.FinishM,element.FinishY),
                            formatDate(element.StartD,element.StartM,element.StartY),
                            formatDate(element.FinishD,element.FinishM,element.FinishY)]
            let tempArray = tableData;
            tempArray.push(data)
            data = []
    
            });
 
        }
        
        
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
        flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'
    },
    head: { height: 80, backgroundColor: '#f1f8ff' },
  text: { textAlign:'center' , fontSize:11,}
  });
  