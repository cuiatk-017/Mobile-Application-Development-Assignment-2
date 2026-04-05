import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  // State to store current input
  const [task, setTask] = useState('');

  const [taskList, setTaskList] = useState([]);

  // Function to add a new task
  const addTask = () => {
    if (task.trim() === '') {
      return; // prevent empty tasks
    }

    const newTask = {
      id: Date.now().toString(),
      text: task,
    };

    setTaskList([...taskList, newTask]);
    setTask(''); 
  };

  const deleteTask = (id) => {
    const updatedList = taskList.filter((item) => item.id !== id);
    setTaskList(updatedList);
  };

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>ToDoList App</Text>

      {/* Input + Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },

  addButton: {
    marginLeft: 10,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  taskText: {
    fontSize: 16,
  },

  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});