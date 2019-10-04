/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import {View, Text, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import styles from '../assets/styles/styles';

const CompletedTasks = () => {

  const [screenVisible, setScreenVisible] = useState('CompletedTasks');

  useEffect(function() {

  }, []);





    return (

      <View style={styles.navBarBottom}>
      <TouchableOpacity
        onPress={() => {
          setScreenVisible('pendingTasks');
        }}
        style={styles.navButton}>
        <Text style={{color: '#FF0000', fontSize: 10}}>PENDING TASKS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setScreenVisible('completedTasks');
        }}
        style={styles.navButton}>
        <Text style={{color: '#FFFFFF', fontSize: 10}}>
          COMPLETED TASKS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setScreenVisible('newTask');
        }}
        style={styles.navButton}>
        <Text style={{color: '#FFFFFF', fontSize: 10}}>NEW TASK</Text>
      </TouchableOpacity>
    </View>
    );
};


export default CompletedTasks;
