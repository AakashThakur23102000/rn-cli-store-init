import { View, Text, Appearance } from 'react-native'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './src/hooks/storeHooks';
import { setThemeMode } from './src/store/themeSlice';

const App = () => {

  const dispatch = useAppDispatch();
  const isSystemModeEnabled = useAppSelector(state => state.theme.isSystemModeEnabled)

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isSystemModeEnabled) return;
      dispatch(setThemeMode(colorScheme === 'dark' ? 'systemDark' : 'systemLight'));
    });
    return () => sub.remove();
  }, [dispatch, isSystemModeEnabled]);

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App