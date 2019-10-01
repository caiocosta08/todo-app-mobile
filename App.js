import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';

import {styles} from './src/assets/styles/styles';

const App = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [scopes, setScopes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState(statuses[0]);
  const [scope, setScope] = useState(scopes[0]);
  const [category, setCategory] = useState(categories[0]);
  const [dateTodo, setDateTodo] = useState(Date.now());

  const [screenVisible, setScreenVisible] = useState('newTask');

  useEffect(function() {
    const getTasks = async () => {
      let url = 'http://192.168.1.7:8000/tasks/list';
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(responseJSON => {
          return setTasks(responseJSON);
        })
        .catch(error => error);
    };

    getTasks();
    getStatuses();
    getScopes();
    getCategories();
  }, []);

  const refreshData = async () => {
    setTasks([]);
    let url = 'http://192.168.1.7:8000/tasks/list';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(responseJSON => {
        return setTasks(responseJSON);
      })
      .catch(error => error);
  };
  const getStatuses = async () => {
    setStatuses([]);
    let url = 'http://192.168.1.7:8000/statuses/list';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(responseJSON => {
        return setStatuses(responseJSON);
      })
      .catch(error => error);
  };
  const getCategories = async () => {
    setCategories([]);
    let url = 'http://192.168.1.7:8000/categories/list';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(responseJSON => {
        return setCategories(responseJSON);
      })
      .catch(error => error);
  };
  const getScopes = async () => {
    setScopes([]);
    let url = 'http://192.168.1.7:8000/scopes/list';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(responseJSON => {
        return setScopes(responseJSON);
      })
      .catch(error => error);
  };

  const validate = (taskName, taskDescription, status, scope, category) => {
    if (taskName && taskDescription && status && scope && category) {
      return true;
    } else {
      return false;
    }
  };

  const addTask = async (
    taskName,
    taskDescription,
    status,
    scope,
    category,
  ) => {
    if (validate(taskName, taskDescription, status, scope, category)) {
      try {
        let url = 'http://192.168.1.7:8000/tasks/register';
        let res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            name: taskName,
            description: taskDescription,
            scope_id: scope,
            user_id: '5d8d61bfc5a14d0017cb248f',
            status_id: status,
            category_id: category,
            date_todo: Date.now(),
          }),
          headers: {'Content-Type': 'application/json'},
        })
          .then(response => response.json())
          .then(responseJSON => responseJSON);
        if (!res.error) {
          console.log(res);
          alert('Task ' + res.task.name + ' add!');
          refreshData();
        } else {
          alert('Error: task not add. ' + res.error);
          refreshData();
        }
      } catch (error) {
        console.log(error);
        refreshData();
      }
    } else {
      alert('Preencha todos os campos.');
    }
  };

  const deleteTask = async task => {
    try {
      let url = 'http://192.168.1.7:8000/tasks/delete';
      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'},
      })
        .then(response => response.json())
        .then(responseJSON => responseJSON);
      if (res.status) {
        alert('Task ' + task.name + ' deleted!');
        refreshData();
      } else {
        alert('Error: task not deleted. ' + res.status);
        refreshData();
      }
    } catch (error) {
      console.log(error);
      refreshData();
    }
  };

  const completeTask = async task => {
    try {
      let url = 'http://192.168.1.7:8000/tasks/complete';
      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'},
      })
        .then(response => response.json())
        .then(responseJSON => responseJSON);
      if (res.status) {
        alert('Task ' + task.name + ' completed!');
        refreshData();
      } else {
        alert('Error: task not completed. ' + res.status);
        refreshData();
      }
    } catch (error) {
      console.log(error);
      refreshData();
    }
  };

  if (screenVisible == 'newTask') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          width: '100%',
          zIndex: -1,
        }}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 1,
            width: '100%',
            height: 60,
            backgroundColor: '#54DAFF',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('pendentTasks');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>PENDING TASKS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('completedTasks');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>
              COMPLETED TASKS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('newTask');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>NEW TASK</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 34,
            color: '#555555',
            margin: 10,
            borderBottomColor: '#8bffa6',
            borderBottomWidth: 1,
          }}>
          Add New Task
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Task name"
          onChangeText={taskName => setTaskName(taskName)}
          value={taskName}
        />
        <TextInput
          style={styles.input}
          placeholder="Task description"
          onChangeText={taskDescription => setTaskDescription(taskDescription)}
          value={taskDescription}
        />

        <Picker
          selectedValue={status}
          style={{height: 50, width: '70%'}}
          onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
          {statuses.map(status => {
            return (
              <Picker.Item
                key={status._id}
                label={status.name}
                value={status._id}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={scope}
          style={{height: 50, width: '70%'}}
          onValueChange={(itemValue, itemIndex) => setScope(itemValue)}>
          {scopes.map(scope => {
            return (
              <Picker.Item
                key={scope._id}
                label={scope.name}
                value={scope._id}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={category}
          style={{height: 50, width: '70%'}}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          {categories.map(category => {
            return (
              <Picker.Item
                key={category._id}
                label={category.name}
                value={category._id}
              />
            );
          })}
        </Picker>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              refreshData();
            }}
            style={{
              backgroundColor: '#8bffa6',
              alignItems: 'center',
              padding: 10,
              borderRadius: 4,
              margin: 3,
            }}>
            <Text style={{color: '#555555'}}>ATUALIZAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              addTask(taskName, taskDescription, status, scope, category);
            }}
            style={{
              backgroundColor: '#54DAFF',
              alignItems: 'center',
              padding: 10,
              borderRadius: 4,
              margin: 3,
            }}>
            <Text style={{color: '#FFFFFF'}}>ADICIONAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else if (screenVisible == 'pendentTasks') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          width: '100%',
          zIndex: -1,
        }}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 1,
            width: '100%',
            height: 60,
            backgroundColor: '#54DAFF',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('pendentTasks');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>PENDING TASKS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('completedTasks');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>
              COMPLETED TASKS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('newTask');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>NEW TASK</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{width: '90%'}}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 34,
              color: '#555555',
              margin: 10,
              borderBottomColor: '#8bffa6',
              borderBottomWidth: 1,
            }}>
            Pending Tasks
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                refreshData();
              }}
              style={{
                backgroundColor: '#8bffa6',
                alignItems: 'center',
                padding: 10,
                borderRadius: 4,
                margin: 3,
              }}>
              <Text style={{color: '#555555'}}>ATUALIZAR</Text>
            </TouchableOpacity>
          </View>
          {tasks.map(task => {
            if (task.status_id == 'Pending') {
              return (
                <View
                  key={task.name}
                  style={{
                    padding: 3,
                    margin: 5,
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      {task.name}
                    </Text>
                    <Text style={{fontSize: 12}}>{task.description}</Text>
                    <Text style={{fontSize: 10}}>
                      [{task.status_id}] - [{task.scope_id}] - [
                      {task.category_id}]
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        completeTask(task);
                      }}
                      style={{
                        backgroundColor: '#8bffa6',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 4,
                        margin: 3,
                      }}>
                      <Text style={{color: '#8ba4a6'}}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        deleteTask(task);
                      }}
                      style={{
                        backgroundColor: '#ea4c41',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 4,
                        margin: 3,
                      }}>
                      <Text style={{color: '#FFFFFF'}}> X </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    );
  } else if (screenVisible == 'completedTasks') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          width: '100%',
          zIndex: -1,
        }}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 1,
            width: '100%',
            height: 60,
            backgroundColor: '#54DAFF',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('pendentTasks');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>PENDING TASKS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('completedTasks');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>
              COMPLETED TASKS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreenVisible('newTask');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 3,
              width: '25%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 10}}>NEW TASK</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{width: '90%'}}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 34,
              color: '#555555',
              margin: 10,
              borderBottomColor: '#8bffa6',
              borderBottomWidth: 1,
            }}>
            Completed Tasks
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                refreshData();
              }}
              style={{
                backgroundColor: '#8bffa6',
                alignItems: 'center',
                padding: 10,
                borderRadius: 4,
                margin: 3,
              }}>
              <Text style={{color: '#555555'}}>ATUALIZAR</Text>
            </TouchableOpacity>
          </View>
          {tasks.map(task => {
            if (task.status_id == 'Completed') {
              return (
                <View
                  key={task.name}
                  style={{
                    padding: 3,
                    margin: 5,
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      {task.name}
                    </Text>
                    <Text style={{fontSize: 12}}>{task.description}</Text>
                    <Text style={{fontSize: 10}}>
                      [{task.status_id}] - [{task.scope_id}] - [
                      {task.category_id}]
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        completeTask(task);
                      }}
                      style={{
                        backgroundColor: '#8bffa6',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 4,
                        margin: 3,
                      }}>
                      <Text style={{color: '#8ba4a6'}}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        deleteTask(task);
                      }}
                      style={{
                        backgroundColor: '#ea4c41',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 4,
                        margin: 3,
                      }}>
                      <Text style={{color: '#FFFFFF'}}> X </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }
};

export default App;
