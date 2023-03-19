import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import StudentService from '../../api/studentService';

const StudentListScreen = ({ navigation, route }) => {
  const { classId } = route.params;
  const [students, setStudents] = useState([]);
  const renderStudents = () => {
    const arr = students.map((student) => (
      <DataTable.Row key={student.id}>
        <DataTable.Cell style={styles.col1}>{student.name}</DataTable.Cell>
        <DataTable.Cell style={styles.col2}>{student.code}</DataTable.Cell>
        <DataTable.Cell style={styles.col3}>{student.groupId}</DataTable.Cell>
      </DataTable.Row>
    ));

    return arr;
  };
  // <View style={styles.student} key={student.id}>
  //       <Text style={styles.name}>{student.name}</Text>
  //       <Text style={styles.groupName}>{student.groupName}</Text>
  //     </View>

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await StudentService.getStudentList({ classId });
        if (res.status === 200) {
          if (res.data.code === 200) {
            setStudents(res.data.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, [classId]);

  return (
    <SafeAreaView style={styles.container}>
      <DataTable style={styles.tableWrapper}>
        <DataTable.Header>
          <DataTable.Title style={styles.col1}>
            <Text style={styles.title}>Name</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.col2}>
            <Text style={styles.title} t>
              ID
            </Text>
          </DataTable.Title>
          <DataTable.Title style={styles.col3}>
            <Text style={styles.title}>Group</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>{students.length > 0 && renderStudents()}</ScrollView>
      </DataTable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  student: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupName: {
    fontSize: 16,
    color: '#666',
  },

  col1: {
    flex: 2,
  },
  col2: {
    flex: 1,
  },
  col3: {
    flex: 0.8,
    marginLeft: 14,
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default StudentListScreen;
