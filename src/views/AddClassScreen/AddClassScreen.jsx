import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR } from '../../utils/color';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SemesterService from '../../api/semesterService';
import SubjectService from '../../api/subjectService';

const data = [
  { key: '1', value: 'Mobiles', disabled: true },
  { key: '2', value: 'Appliances' },
  { key: '3', value: 'Cameras' },
  { key: '4', value: 'Computers', disabled: true },
  { key: '5', value: 'Vegetables' },
  { key: '6', value: 'Diary Products' },
  { key: '7', value: 'Drinks' },
];

const AddClassScreen = ({ navigation }) => {
  const [selected, setSelected] = React.useState('');
  const [semesters, setSemesters] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AntDesign name='close' size={20} onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await SemesterService.getSemesters();
        console.log(res.data.data);
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
        console.log(res.data.data);
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
      <View className='flex-col gap-2 items-center mb-8'>
        <Text className='text-3xl font-bold tracking-wide'>Create Class</Text>
        <Text className='text-base font-medium text-gray-400'>
          Enter details to make a space for courses
        </Text>
      </View>
      <View className='w-full flex-col '>
        <View style={styles.formItem}>
          <Text style={styles.label}>Class name</Text>
          <TextInput style={styles.textInput} placeholder='Semester code' />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Semester</Text>
          <SelectList
            setSelected={setSelected}
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
            setSelected={setSelected}
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
      </View>
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
  },

  label: {
    fontWeight: '600',
    fontSize: 20,
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
