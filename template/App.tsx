import { Appearance, StatusBar } from 'react-native'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './src/hooks/storeHooks';
import { setThemeMode } from './src/store/themeSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import CustomText from './src/components/CustomText';

const App = () => {

  const dispatch = useAppDispatch();
  const isSystemModeEnabled = useAppSelector(state => state.theme.isSystemModeEnabled)
  const COLORS = useAppSelector(state => state.theme.colors)
  const themeMode = useAppSelector(state => state.theme.themeMode)

  const styles = ScaledSheet.create({
    statusBarAndSafeAreaView: {
      flex: 1,
      backgroundColor: COLORS.statusBarAndSafeAreaView,
    }
  })

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isSystemModeEnabled) return;
      dispatch(setThemeMode(colorScheme === 'dark' ? 'systemDark' : 'systemLight'));
    });
    return () => sub.remove();
  }, [dispatch, isSystemModeEnabled]);

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.statusBarAndSafeAreaView}
        barStyle={themeMode === "dark" ? "dark-content" : "light-content"}
      />
      <SafeAreaView style={styles.statusBarAndSafeAreaView}>
        <CustomText>App</CustomText>
      </SafeAreaView>
    </>
  )
}

export default App