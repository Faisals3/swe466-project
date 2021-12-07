import React, { useEffect , useState } from "react";
import { Text , View , StyleSheet , TouchableOpacity } from "react-native";
import { dbRoot } from "../APIs/firebase";
import { Table, Row, Rows } from 'react-native-table-component';
import { Button , TextInput } from 'react-native-paper';


export default function EditTasks({navigation}) {

    const [tasks,setTasks] = useState([])
    const [resources,setResources] = useState ([])
    const [tableHead,setTableHead] = useState (['Task ID' , 'Task Name' , 'Duration' , 'Start\n(Date)' , 'Finish\n(Date)' , 'Actions'])
    const [tableData,setTableData] = useState ([])
    const [formVisible,setFormVisible] = useState(false)
    const [updateVisible,setUpdateVisible] = useState(false)
    const [shouldUpdate,setShouldUpdate] = useState(false)
    const [updateTaskID,setUpdateID] = useState()
    const [updateResourceID,setUpdateResourceID] = useState()
    const [updateResourceName,setUpdateResourceName] = useState()

    //add task form
    const [taskName,setTaskName] = useState("")
    const [sd,setSd] = useState(0)
    const [sm,setSm] = useState(0)
    const [sy,setSy] = useState(0)
    const [fd,setFd] = useState(0)
    const [fm,setFm] = useState(0)
    const [fy,setFy] = useState(0)
    const [idLength , setIdLength] = useState(0)

    async function getDataFromFireBase() {
        let arrayOfTasks = []
        let arrayOfResources = []

         dbRoot.collection('Tasks').onSnapshot( (querySnapshot) => {
         querySnapshot.forEach((doc) => {
                const taskData = doc.data();
                arrayOfTasks.push(taskData);
            });
            console.log('array of tasks from firebsae : ' , arrayOfTasks);
            setIdLength(arrayOfTasks.length+1)
            formatData(arrayOfTasks)
            setTasks(arrayOfTasks);
            setShouldUpdate(false)
        });

       

        dbRoot.collection('Resources').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const resourseData = doc.data();
                arrayOfResources.push(resourseData);
            });
            setResources(arrayOfResources);
        });

       


        
    }

    const handleAddTask = () => {
        const id = idLength.toString()
        const task = {
            StartD : sd,
            StartM : sm,
            StartY : sy,
            FinishD : fd,
            FinishM : fm,
            FinishY : fy,
            TaskID : id,
            TaskName : taskName,
            ResourceID : '',
            ResourceName : '',
        }
        dbRoot.collection('Tasks').doc(id).set(task).then(() => {
            console.log('task added succesfuly');
            navigation.navigate('ViewTasks')
          })
          .catch((error) => {
            console.log('task added failed error : ' , error);
          });
    }

    const handleUpdateTask = (id,rd,rn) => {
        const task = {
            StartD : sd,
            StartM : sm,
            StartY : sy,
            FinishD : fd,
            FinishM : fm,
            FinishY : fy,
            TaskID : id,
            TaskName : taskName,
            ResourceID : rd,
            ResourceName : rn,
        }
        dbRoot.collection('Tasks').doc(id).set(task).then(() => {
            console.log('task added succesfuly');
            navigation.navigate('ViewTasks')
          })
          .catch((error) => {
            console.log('task added failed error : ' , error);
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

    const cleanInputs = () => {
        setTaskName(),
        setSd(),
        setSm(),
        setSy(),
        setFd(),
        setFm(),
        setFy()
    }

    const formatData = (tasks) => {
        let tableDataObject = []

        if(tasks.length) {
            tasks?.forEach(element => {
                let data = [element.TaskID,
                            element.TaskName,
                            getDuration(element.StartD,element.StartM,element.StartY,element.FinishD,element.FinishM,element.FinishY),
                            formatDate(element.StartD,element.StartM,element.StartY),
                            formatDate(element.FinishD,element.FinishM,element.FinishY),
                            <View>
                                <TouchableOpacity onPress={() => handleDelet(element.TaskID)}><View><Text>Delete</Text></View></TouchableOpacity>
                                <View style={{borderBottomColor:'red',borderWidth:1}}></View>
                                <TouchableOpacity onPress={() => {setUpdateVisible(true),
                                    setTaskName(element.TaskName),
                                    setSd(element.StartD),
                                    setSm(element.StartM),
                                    setSy(element.StartY),
                                    setFd(element.FinishD),
                                    setFm(element.FinishM),
                                    setFy(element.FinishY),
                                    setUpdateID(element.TaskID),
                                    setUpdateResourceID(element.ResourceID),
                                    setUpdateResourceName(element.ResourceName)}}>
                                        <View><Text>Update</Text></View></TouchableOpacity>
                            </View>    
                        ]
            let tempArray = tableData;
            tempArray.push(data)
            
            data = []
    
            });
 
        }
        
        
    }

    const handleDelet = (id) => {
        dbRoot.collection('Tasks').doc(id).delete().then(() => {
            console.log("Task deleted!");
            navigation.navigate('ViewTasks')
        }).catch((error) => {
            console.error("Error removing document: ", error);
        })
    }

    useEffect(() => {
        getDataFromFireBase();
    },[shouldUpdate])

    const renderAddFourm = () => {
        if(!formVisible && !updateVisible) {
            return (
                <Button mode="contained" onPress={() => setFormVisible(!formVisible)} style={styles.button}>
        Add Task
        </Button>
            )
        }
        if(formVisible) {
            return (
                <View style={{margin:15,borderWidth:1,borderRadius:10,flex:1}}>
                    <TextInput
                    label="Task Name"
                    value={taskName}
                    onChangeText={text => setTaskName(text)}
                    // keyboardType = 'numeric'
                    />
                    <View style={{marginTop:20,flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{fontSize:15,textAlignVertical:'center'}}>Start Date :   </Text>
                    <TextInput
                    label="dd"
                    value={sd}
                    onChangeText={text => setSd(text)}
                    keyboardType = 'numeric'
                    style={{width:70}}
                    />
                    <TextInput
                    label="mm"
                    value={sm}
                    onChangeText={text => setSm(text)}
                     keyboardType = 'numeric'
                     style={{width:70}}
                    />
                    <TextInput
                    label="yy"
                    value={sy}
                    onChangeText={text => setSy(text)}
                    keyboardType = 'numeric'
                    style={{width:70}}
                    />
                    </View>
    
                    <View style={{marginTop:20,flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{fontSize:15,textAlignVertical:'center'}}>Finish Date : </Text>
                    <TextInput
                    label="dd"
                    value={fd}
                    onChangeText={text => setFd(text)}
                    keyboardType = 'numeric'
                    style={{width:70}}
                    />
                    <TextInput
                    label="mm"
                    value={fm}
                    onChangeText={text => setFm(text)}
                     keyboardType = 'numeric'
                     style={{width:70}}
                    />
                    <TextInput
                    label="yy"
                    value={fy}
                    onChangeText={text => setFy(text)}
                    keyboardType = 'numeric'
                    style={{width:70}}
                    />
                    </View>
    
                    <Button mode="contained" onPress={() => handleAddTask()} style={styles.button}>
            Add Task
            </Button>
    
            <Button mode="contained"  onPress={() => {setFormVisible(!formVisible),cleanInputs()}} style={styles.button}>
            cancel
            </Button>
    
                </View>
            )
        }
        
    }

    const rednerUpdateTask = () => {
        if(!updateVisible) {
            return null
        }
        return(
        <View style={{margin:15,borderWidth:1,borderRadius:10,flex:1}}>
                <TextInput
                label="Task Name"
                value={taskName}
                onChangeText={text => setTaskName(text)}
                // keyboardType = 'numeric'
                />
                <View style={{marginTop:20,flexDirection:'row', flexWrap:'wrap'}}>
                <Text style={{fontSize:15,textAlignVertical:'center'}}>Start Date :   </Text>
                <TextInput
                label="dd"
                value={sd}
                onChangeText={text => setSd(text)}
                keyboardType = 'numeric'
                style={{width:70}}
                />
                <TextInput
                label="mm"
                value={sm}
                onChangeText={text => setSm(text)}
                 keyboardType = 'numeric'
                 style={{width:70}}
                />
                <TextInput
                label="yy"
                value={sy}
                onChangeText={text => setSy(text)}
                keyboardType = 'numeric'
                style={{width:70}}
                />
                </View>

                <View style={{marginTop:20,flexDirection:'row', flexWrap:'wrap'}}>
                <Text style={{fontSize:15,textAlignVertical:'center'}}>Finish Date : </Text>
                <TextInput
                label="dd"
                value={fd}
                onChangeText={text => setFd(text)}
                keyboardType = 'numeric'
                style={{width:70}}
                />
                <TextInput
                label="mm"
                value={fm}
                onChangeText={text => setFm(text)}
                 keyboardType = 'numeric'
                 style={{width:70}}
                />
                <TextInput
                label="yy"
                value={fy}
                onChangeText={text => setFy(text)}
                keyboardType = 'numeric'
                style={{width:70}}
                />
                </View>

                <Button mode="contained" onPress={() => handleUpdateTask(updateTaskID,updateResourceID,updateResourceName)} style={styles.button}>
        Update Task
        </Button>

        <Button mode="contained"  onPress={() => {setUpdateVisible(!updateVisible),cleanInputs()}} style={styles.button}>
        cancel
        </Button>

            </View>
)
    }

    return (
        <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>

        {renderAddFourm()}
        {rednerUpdateTask()}
        
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 0, paddingTop: 30, backgroundColor: '#fff'
    },
    head: { height: 80, backgroundColor: '#f1f8ff' },
  text: { textAlign:'center' , fontSize:11,},
  button : {
      margin:20
  },
  buttonOption : {
      padding:2,

  }
  });
  