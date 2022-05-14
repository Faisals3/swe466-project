import React, { useEffect , useState } from "react";
import { Text , View , StyleSheet } from "react-native";
import { dbRoot } from "../APIs/firebase";
import { Table, Row, Rows } from 'react-native-table-component';

export default function ViewResources() {

    const [tasks,setTasks] = useState([])
    const [resources,setResources] = useState ([])
    const [tableHead,setTableHead] = useState (['Resource ID' , 'Resource Name' , 'Type' , 'St Rate' , 'cost/Use'])
    const [tableData,setTableData] = useState ([])

    async function getDataFromFireBase() {
        let arrayOfTasks = []
        let arrayOfResources = []

         dbRoot.collection('Resources').onSnapshot( (querySnapshot) => {
         querySnapshot.forEach((doc) => {
                const taskData = doc.data();
                arrayOfTasks.push(taskData);
            });
            console.log('array of resources from firebsae : ' , arrayOfTasks);
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
        return duration

    }

    const formatData = (tasks) => {
        let tableDataObject = []

        if(tasks.length) {
            tasks?.forEach(element => {
                console.log('element of resources : ' ,element);
                let data = [element.ResourceID,
                            element.ResourceName,
                            element.Type,
                            element.CostHour,
                            element.CostUse,]
            let tempArray = tableData;
            tempArray.push(data)
            console.log('temp array' , tempArray);
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
  