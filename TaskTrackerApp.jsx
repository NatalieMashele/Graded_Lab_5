import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Keyboard,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';

const TaskTrackerApp = () => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskText.trim() === '') {
      Alert.alert('Oops!', 'Please enter a task first!');
      return;
    }
    
    const newTask = {
      id: Date.now().toString(),
      text: taskText.trim(),
      done: false
    };
    
    setTasks([...tasks, newTask]);
    setTaskText('');
    Keyboard.dismiss();
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={styles.taskContent}
        onPress={() => toggleTask(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, item.done && styles.checkedBox]}>
          {item.done && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.taskText, item.done && styles.completedTask]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.deleteText}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffd1dc" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Volunteers Task Tracker</Text>
        <Text style={styles.subtitle}>Keep track of all your tasks</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor="#c97ba5"
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No tasks pending</Text>
          <Text style={styles.emptyStateSubtext}>Add a task</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          style={styles.taskList}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made by Natalie Mashele</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffd1dc',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#ff9ebb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d64d8c',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#c97ba5',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    shadowColor: '#ff9ebb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ffc2d6',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginRight: 12,
    color: '#d64d8c',
    backgroundColor: '#fffafb',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff85a2',
    borderRadius: 25,
    paddingHorizontal: 20,
    shadowColor: '#ff4d7c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#ffc2d6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#ff85a2',
    borderRadius: 13,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffafb',
  },
  checkedBox: {
    backgroundColor: '#ff85a2',
    borderColor: '#ff85a2',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  taskText: {
    fontSize: 16,
    color: '#d64d8c',
    flex: 1,
    fontFamily: 'System',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#c97ba5',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#fff0f5',
    borderRadius: 20,
  },
  deleteText: {
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateEmoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  emptyStateText: {
    fontSize: 20,
    color: '#d64d8c',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#c97ba5',
    textAlign: 'center',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ffd1dc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#c97ba5',
  },
});

export default TaskTrackerApp;