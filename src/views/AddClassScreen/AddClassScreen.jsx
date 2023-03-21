import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR } from '../../utils/color';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SemesterService from '../../api/semesterService';
import SubjectService from '../../api/subjectService';
import { Button } from 'react-native-paper';
import { ClassService } from '../../api/classService';

const AddClassScreen = ({ navigation }) => {
  const [selected, setSelected] = React.useState('');
  const [semesters, setSemesters] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [classData, setClassData] = React.useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AntDesign name='close' size={20} onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  const handleCreateClass = async () => {
    try {
      const res = await ClassService.createNewClass(classData);
      if (res.status === 200) {
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await SemesterService.getSemesters();
        if (res.status === 200) {
          setSemesters(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const res = await SubjectService.getSubjects();
        if (res.status === 200) {
          setSubjects(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSemesters();
    fetchSubjects();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        className='w-full flex-col'
        showsVerticalScrollIndicator={false}
      >
        <View className='flex-col gap-2 items-center mb-8'>
          <Text className='text-3xl font-bold tracking-wide'>Create Class</Text>
          <Text className='text-base font-medium text-gray-400'>
            Enter details to make a space for courses
          </Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Class name</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Semester code'
            onChangeText={(text) =>
              setClassData({ ...classData, className: text })
            }
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Semester</Text>
          <SelectList
            setSelected={(value) => {
              setClassData({ ...classData, semesterCode: value });
            }}
            data={semesters.map((s) => ({ key: s.code, value: s.code }))}
            arrowicon={
              <FontAwesome name='chevron-down' size={12} color={'black'} />
            }
            searchicon={<FontAwesome name='search' size={12} color={'black'} />}
            search={false}
            boxStyles={styles.textInput} //override default styles
            defaultOption={
              semesters.length > 0
                ? { key: semesters[0].code, value: semesters[0].code }
                : { key: '1', value: 'Semester code' }
            }
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Subject</Text>
          <SelectList
            setSelected={(key) => {
              setClassData({ ...classData, subjectId: key });
            }}
            data={subjects.map((s) => ({ key: s.id, value: s.name }))}
            arrowicon={
              <FontAwesome name='chevron-down' size={12} color={'black'} />
            }
            searchicon={<FontAwesome name='search' size={12} color={'black'} />}
            search={false}
            boxStyles={styles.textInput} //override default styles
            defaultOption={
              subjects.length > 0
                ? { key: subjects[0].id, value: subjects[0].name }
                : { key: '1', value: 'Subject code' }
            }
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Sprint duration</Text>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            placeholder='4'
            onChangeText={(text) =>
              setClassData({ ...classData, cycleDuration: text })
            }
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Enroll key</Text>
          <TextInput
            style={styles.textInput}
            placeholder='123456...'
            onChangeText={(text) =>
              setClassData({ ...classData, enrollKey: text })
            }
          />
        </View>

        <View className='items-center'>
          <TouchableOpacity
            className='bg-blue_2 px-4 py-2 rounded-lg'
            onPress={handleCreateClass}
          >
            <Text className='text-white font-semibold text-lg'>Create new</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddClassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 28,
    alignItems: 'center',
    paddingBottom: 40,
  },

  label: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 12,
  },

  formItem: {
    flexDirection: 'column',
    paddingBottom: 16,
  },

  textInput: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: COLOR.gray[2],
    borderRadius: '100%',
  },
});
