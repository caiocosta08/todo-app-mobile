/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import {View, Text, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

// import { Container } from './styles';

const CompletedTasks = () => {

  const [tasks, setTasks] = useState([]);

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

  }, []);


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

 if (tasks)
  {
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

              );}
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
  else {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }
};


export default CompletedTasks;
