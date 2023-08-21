import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { useState } from "react";
import Card from "./src/components/card";

export default function App() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantsName,setParticipantsName] = useState('')
  const [counter, setCounter] = useState(0)
  const [concludedCounter,  setConcludedCounter] = useState(0)
  const [taskIndex, setTaskIndex] = useState<number[]>([])

  function handleParticipantAdd() {
    if (participants.includes(participantsName)) {
      return Alert.alert("Ja existe um participante com esse nome")
    }
    if(participants[0] == '') {
      return Alert.alert("O participante não pode ser vazio")

    }
    setParticipants((prevState) => [...prevState, participantsName])
    setCounter(counter + 1)
    setParticipantsName('')
  }
  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "sim",
        onPress: () => {
          setParticipants(participants.filter(participant => participant !== name))
          setCounter(counter -1)
            if(taskIndex.includes(participants.indexOf(name))){
              setConcludedCounter(concludedCounter -1)
              setTaskIndex(taskIndex.filter((index)=> participants.indexOf(name)== index))
            }
       },
      },
      {
        text: "não",
        style: "cancel",
      },
    ]);
    console.log(`voce removeu o usuario ${name}`);
  }

  function handleConcludedTask(isConcluded:boolean, index:number) {

    if(isConcluded){
      setConcludedCounter(concludedCounter + 1)
      setTaskIndex((prevState)=> [...prevState, index])
    }
    else{
      setConcludedCounter(concludedCounter - 1)
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.titleContainer}>
        <Image source={require("./src/assets/Logo.png")} />
      </View>
      <View style={styles.imputContainer}>
        <TextInput style={styles.textInput}
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor={'#808080'}
          onChangeText={setParticipantsName}
          value={participantsName}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleParticipantAdd}>
         <Icon name="pluscircleo"  size={20} color='#ffff'/>
        </TouchableOpacity>
      </View>
      <View style={styles.subtitleContainer}>
        <View style={styles.viewSubtitle}> 
          <Text style={styles.subtitleCriated}>Criadas</Text>
          <Text style={styles.textZero}>{counter}</Text>
        </View>
        <View style={styles.viewSubtitle}>
          <Text style={styles.subtitleConcluded}>Concluidas</Text>
          <Text style={styles.textZero}>{concludedCounter}</Text>
        </View>
      </View>
      <View style={styles.line}></View>
     
      <View style={styles.listContainer}>
      <FlatList
        data={participants}
        keyExtractor={participants => participants}
        renderItem={({ item, index }) => (
          <Card item={item} remove={()=>handleParticipantRemove(item)} concluded={(isConcluded)=> handleConcludedTask(isConcluded, index)}/>
        )}
      />
      {/* <Image resizeMode='cover' source={require('./src/assets/Clipboard.png')}/>
      <Text style={styles.listContainerTitle}>Você ainda não tem tarefaz cadastradas</Text>
      <Text style={styles.listContainerText}>Crie tarefas e organize seus itens a fazer</Text> */}
     </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: 50,
  },
  titleTextTo: {
    color: "#4EA8DE",
    fontSize: 24,
  },
  imputContainer:{
    marginTop:100,
    width:'90%',
    flexDirection:"row",
  },
  textInput:{
    flex:1,
    backgroundColor:'#262626',
    borderRadius: 10,
    height: 54,
    alignItems:'center',
    paddingHorizontal:20,
    color:'#808080'
  },
  buttonAdd:{
    alignItems: 'center',
    justifyContent: 'center',
    width:52,
    height:52,
    borderRadius: 10,
    backgroundColor:'#1E6F9F',
  },
  subtitleContainer:{
    width:'90%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:50,
    overflow:'hidden'
  },
  viewSubtitle:{
    justifyContent:'space-between',
    flexDirection:'row',
  },
  subtitleCriated:{
    color:'#4EA8DE',
    fontSize:18,
    fontWeight:'bold',
  },
  subtitleConcluded:{
    color:'#8284FA',
    fontSize:18,
    fontWeight:'bold'
  },
  textZero:{
    backgroundColor:'#333333',
    borderRadius:50,
    color:'#D9D9D9',
    justifyContent:'center',
    alignItems: 'center',
    paddingHorizontal:10,
    paddingVertical:4,
    marginLeft:10,
    fontSize:12,
    fontWeight:'bold'
  },
  line:{
    borderColor:'#333333',
    borderWidth:1,
    width:'90%',
    marginTop:30,
  },
  listContainer:{
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },

  listContainerTitle:{
    marginTop:20,
    color:'#808080',
    fontSize:14,
    fontWeight:'bold',
  },
  listContainerText:{
    color:'#808080',
    fontSize:14,
  }
});
