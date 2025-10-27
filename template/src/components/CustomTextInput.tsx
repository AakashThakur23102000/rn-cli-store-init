import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { useAppSelector } from '../hooks/storeHooks';
import { fontSizes } from './CustomText';

const CustomTextInput: React.FC<TextInputProps> = ({
    style,
    ...rest
}) => {

    const COLORS = useAppSelector(state => state.theme.colors);
    const styles = ScaledSheet.create({
        input: {
            backgroundColor: COLORS.inputField,
            width:"100%"
        }
    })

    return (
        <TextInput
            mode="outlined"
            style={[style, styles.input]}
            textColor={COLORS.textColor}
            contentStyle={{
                fontSize: fontSizes.regular,
            }}
            theme={{
                colors: {
                    primary: COLORS.inputBorderFocused,
                    outline: COLORS.inputBorderDefault,
                    error: COLORS.inputBorderError,
                },
            }}
            placeholderTextColor={COLORS.placeholderColor}
            {...rest}
        />
    );
};
export default CustomTextInput;
