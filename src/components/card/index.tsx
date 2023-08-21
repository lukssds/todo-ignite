import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type props = {
  item: string;
  remove: ()=> void;
  concluded: (isConcluded:boolean) => void;
};

function Card({ item, remove, concluded}: props) {
  const [isDone, setisDone] = useState(false);
  return (
    <View style={styles.container}>
        {isDone ? (
          <TouchableOpacity onPress={() => {setisDone(!isDone), concluded(!isDone)}}> 
            <MaterialIcons name="check-circle" color="#5E60CE"  size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity  onPress={() => {setisDone(!isDone), concluded(!isDone)}}>
            <MaterialIcons
              name="radio-button-unchecked"
              color="#4EA8DE"
              size={30}
            />
          </TouchableOpacity>
        )}
      <View style={styles.titleWraper}>
        <Text
          style={[
            styles.title,
            isDone && {
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
            },
          ]}
        >
          {item}
        </Text>
      </View>
      <TouchableOpacity onPress={remove}>
        <Icon name="trash" color="#808080" size={30} />
      </TouchableOpacity>
    </View>
  );
}
export default Card;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#262626",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    height: 64,
    alignSelf: "center",
  },
  titleWraper: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flexWrap: "wrap",
    fontSize: 16,
    color: "#F2F2F2",
  },
});
