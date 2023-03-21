import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  Button,
  Pressable,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Surface } from 'react-native-paper';
import { COLOR } from '../../utils/color';
import RNDraftView from 'react-native-draftjs-editor';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import * as Linking from 'expo-linking';

const ControlButton = ({ text, action, isActive }) => {
  return (
    <TouchableOpacity
      style={[
        styles.controlButtonContainer,
        isActive ? { backgroundColor: 'gold' } : {},
      ]}
      onPress={action}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const EditorToolBar = ({
  activeStyles,
  blockType,
  toggleStyle,
  toggleBlockType,
}) => {
  return (
    <View style={styles.toolbarContainer}>
      <ControlButton
        text={'B'}
        isActive={activeStyles.includes('BOLD')}
        action={() => toggleStyle('BOLD')}
      />
      <ControlButton
        text={'I'}
        isActive={activeStyles.includes('ITALIC')}
        action={() => toggleStyle('ITALIC')}
      />
      <ControlButton
        text={'H'}
        isActive={blockType === 'header-one'}
        action={() => toggleBlockType('header-one')}
      />
      <ControlButton
        text={'ul'}
        isActive={blockType === 'unordered-list-item'}
        action={() => toggleBlockType('unordered-list-item')}
      />
      <ControlButton
        text={'ol'}
        isActive={blockType === 'ordered-list-item'}
        action={() => toggleBlockType('ordered-list-item')}
      />
      <ControlButton
        text={'--'}
        isActive={activeStyles.includes('STRIKETHROUGH')}
        action={() => toggleStyle('STRIKETHROUGH')}
      />
    </View>
  );
};

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
};

const ReportDetail = ({ navigation, route }) => {
  const { report } = route.params;
  let blocks = undefined;
  if (report.content.includes('{')) {
    blocks = getRNDraftJSBlocks({
      contentState: JSON.parse(report.content),
    });
  }

  const [cycleReport, setCycleReport] = useState(report);
  const _draftRef = React.createRef();
  const [activeStyles, setActiveStyles] = useState([]);
  const [blockType, setActiveBlockType] = useState('unstyled');
  const [editorState, setEditorState] = useState(report.content);
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '95%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const defaultValue = '';

  const editorLoaded = () => {
    _draftRef.current && _draftRef.current.focus();
  };

  const toggleStyle = (style) => {
    _draftRef.current && _draftRef.current.setStyle(style);
  };

  const toggleBlockType = (blockType) => {
    _draftRef.current && _draftRef.current.setBlockType(blockType);
  };

  useEffect(() => {
    /**
     * Get the current editor state in HTML.
     * Usually keep it in the submit or next action to get output after user has typed.
     */
    setEditorState(
      _draftRef.current ? _draftRef.current.getEditorState(report.content) : ''
    );
  }, [_draftRef]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
      headerTitle: 'Report Detail',
    });
  }, [report]);

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheetModalProvider>
        {cycleReport && (
          <ScrollView style={styles.scrollView}>
            <Surface style={styles.wrapper}>
              <View style={styles.row}>
                <View style={styles.colLeft}>
                  <Text
                    className='text-base font-semibold'
                    style={styles.leftTitle}
                  >
                    Sprint
                  </Text>
                </View>
                <View style={styles.colRight}>
                  <Text style={styles.contentText}>
                    {cycleReport.cycleNumber}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colLeft}>
                  <Text
                    className='text-base font-semibold'
                    style={styles.leftTitle}
                  >
                    Report Group
                  </Text>
                </View>
                <View style={styles.colRight}>
                  <Text style={styles.contentText}>{cycleReport.groupId}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.colLeft}>
                  <Text
                    className='text-base font-semibold'
                    style={styles.leftTitle}
                  >
                    Report title
                  </Text>
                </View>
                <View style={styles.colRight}>
                  <Text style={styles.contentText}>{cycleReport.title}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.colLeft}>
                  <Text
                    className='text-base font-semibold'
                    style={styles.leftTitle}
                  >
                    Contents
                  </Text>
                </View>
                <View style={styles.colRight}>
                  {blocks ? (
                    <Pressable
                      onPress={handlePresentModalPress}
                      className='px-4 py-1 bg-blue_2 rounded-full'
                    >
                      <Text className='text-white font-medium text-base'>
                        View
                      </Text>
                    </Pressable>
                  ) : (
                    <View style={styles.colRight}>
                      <Text style={styles.contentText}>
                        {cycleReport.content}
                      </Text>
                    </View>
                  )}
                  {/* <RNDraftView
                      defaultValue={defaultValue}
                      onEditorReady={editorLoaded}
                      style={{ flex: 1, innerHeight: 100 }}
                      placeholder={'Add text here...'}
                      ref={_draftRef}
                      onStyleChanged={setActiveStyles}
                      onBlockTypeChanged={setActiveBlockType}
                      styleMap={styleMap}
                    />
                    <EditorToolBar
                      activeStyles={activeStyles}
                      blockType={blockType}
                      // toggleStyle={toggleStyle}
                      // toggleBlockType={toggleBlockType}
                    /> */}
                  {/* <Text style={styles.contentText} className='min-h-[70]'>
                    {cycleReport.content}
                  </Text> */}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.colLeft}>
                  <Text
                    className='text-base font-semibold'
                    style={styles.leftTitle}
                  >
                    Mark
                  </Text>
                </View>
                <View style={styles.colRight}>
                  <View className='px-4 py-1 rounded-full bg-green_0'>
                    <Text
                      style={styles.contentText}
                      className='text-white font-medium'
                    >
                      {cycleReport.mark !== null
                        ? cycleReport.mark
                        : 'Reviewing...'}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={styles.colLeft}>
                  <Text
                    className='text-base font-semibold'
                    style={styles.leftTitle}
                  >
                    Resource link
                  </Text>
                </View>
                <View style={styles.colRight}>
                  <Pressable
                    onPress={() =>
                      Linking.openURL(`${cycleReport.resourceLink}`)
                    }
                  >
                    <Text
                      style={styles.contentText}
                      className='underline text-blue_1'
                    >
                      {cycleReport.resourceLink}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Surface>
            {blocks && (
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
              >
                <ScrollView style={styles.contentContainer}>
                  {blocks}
                </ScrollView>
              </BottomSheetModal>
            )}
          </ScrollView>
        )}
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default ReportDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 12,
    marginTop: 24,
    backgroundColor: '#fff',
  },
  wrapper: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray[3],
  },
  colRight: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexShrink: 1,
  },

  leftTitle: {},

  colLeft: {
    width: 120,
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignSelf: 'flex-start',

    // paddingRight: 24,
    // borderRightWidth: 1,
    borderRightColor: COLOR.gray[3],
  },
  contentText: {
    fontSize: 16,
    flexShrink: 1,
  },

  containerStyle: {
    flex: 1,
    marginTop: 36,
  },
  toolbarContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  controlButtonContainer: {
    padding: 8,
    borderRadius: 2,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
});
