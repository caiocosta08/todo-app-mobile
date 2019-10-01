/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import {View, Text, Picker, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

// import { Container } from './styles';

const PendingTasks = () => {

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


export default PendingTasks;
