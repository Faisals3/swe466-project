import React, { useEffect , useState } from "react";
import { Text , View , StyleSheet , TouchableOpacity } from "react-native";
import { dbRoot } from "../APIs/firebase";
import { Table, Row, Rows } from 'react-native-table-component';
import { Button , TextInput ,List} from 'react-native-paper';


export default function EditResources({navigation}) {

    const [tasks,setTasks] = useState([])
    const [resources,setResources] = useState ([])
    const [tableHead,setTableHead] = useState (['Resource ID' , 'Resource Name' , 'Type' , 'Cost/Hour' , 'Cost/Use' , 'Actions'])
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

    const [resourceName,setResourceName] = useState("")
    const [Type,setType] = useState("Type")
    const [costH , setCostH] = useState("")
    const [CostU,setCostU] = useState("")

    async function getDataFromFireBase() {
        let arrayOfTasks = []
        let arrayOfResources = []

         dbRoot.collection('Resources').onSnapshot( (querySnapshot) => {
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

    const handleAddResource = () => {
        const id = idLength.toString()
        const resource = {           
            ResourceID : id,
            ResourceName : resourceName,
            CostHour : costH,
            CostUse : CostU,
            Type: Type,
        }
        dbRoot.collection('Resources').doc(id).set(resource).then(() => {
            console.log('task added succesfuly');
            navigation.navigate('ViewResources')
          })
          .catch((error) => {
            console.log('task added failed error : ' , error);
          });
    }

    const handleUpdateResource = () => {
        const resource = {
            ResourceID : updateResourceID,
            ResourceName : resourceName,
            CostHour : costH,
            CostUse : CostU,
            Type: Type,
        }
        dbRoot.collection('Resources').doc(updateResourceID).set(resource).then(() => {
            console.log('task added succesfuly');
            navigation.navigate('ViewResources')
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
                let data = [element.ResourceID,
                            element.ResourceName,
                            element.Type,
                            element.CostHour,
                            element.CostUse,
                            <View>
                                <TouchableOpacity onPress={() => handleDelet(element.ResourceID)}><View><Text>Delete</Text></View></TouchableOpacity>
                                <View style={{borderBottomColor:'red',borderWidth:1}}></View>
                                <TouchableOpacity onPress={() => {setUpdateVisible(true),
                                    setResourceName(element.ResourceName),
                                    setCostH(element.CostHour),
                                    setCostU(element.CostUse),
                                    setType(element.Type),
                                    setUpdateResourceID(element.ResourceID)}}>
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
        dbRoot.collection('Resources').doc(id).delete().then(() => {
            console.log("Task deleted!");
            navigation.navigate('ViewResources')
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
        Add Resource
        </Button>
            )
        }
        if(formVisible) {
            return (
                <View style={{margin:15,borderWidth:1,borderRadius:10,}}>
                    <TextInput
                    label="Resource Name"
                    value={resourceName}
                    onChangeText={text => setResourceName(text)}
                    // keyboardType = 'numeric'
                    />
  
                    <TextInput
                    label="Cost/Hour"
                    value={costH}
                    onChangeText={text => setCostH(text)}
                    keyboardType = 'numeric'
                    />
                    <TextInput
                    label="Cost/Use"
                    value={CostU}
                    onChangeText={text => setCostU(text)}
                    keyboardType = 'numeric'
                    />

                    <List.Accordion
                        title= {Type}
                        style={{backgroundColor:'#E7E7E7'}}
                        >
                        <List.Item title="Work" onPress={() => setType("Work")}/>
                        <List.Item title="Use" onPress={() => setType("Use")}/>
                    </List.Accordion>
                    
    
                    <Button mode="contained" onPress={() => handleAddResource()} style={styles.button}>
                    Add Resource
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
            return (
                null
            )
        }
        if(updateVisible) {
            return (
                <View style={{margin:15,borderWidth:1,borderRadius:10,}}>
                    <TextInput
                    label="Resource Name"
                    value={resourceName}
                    onChangeText={text => setResourceName(text)}
                    // keyboardType = 'numeric'
                    />
  
                    <TextInput
                    label="Cost/Hour"
                    value={costH}
                    onChangeText={text => setCostH(text)}
                    keyboardType = 'numeric'
                    />
                    <TextInput
                    label="Cost/Use"
                    value={CostU}
                    onChangeText={text => setCostU(text)}
                    keyboardType = 'numeric'
                    />

                    <List.Accordion
                        title= {Type}
                        style={{backgroundColor:'#E7E7E7'}}
                        >
                        <List.Item title="Work" onPress={() => setType("Work")}/>
                        <List.Item title="Use" onPress={() => setType("Use")}/>
                    </List.Accordion>
                    
    
                    <Button mode="contained" onPress={() => handleUpdateResource()} style={styles.button}>
                    Update Resource
            </Button>
    
            <Button mode="contained"  onPress={() => {setFormVisible(false),cleanInputs(),setUpdateVisible(false)}} style={styles.button}>
            cancel
            </Button>
    
                </View>
            )
        }
        
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
  