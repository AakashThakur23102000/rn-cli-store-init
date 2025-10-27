// components/CustomButton.tsx
import React, { forwardRef } from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { useAppSelector } from '../hooks/storeHooks';
import { ScaledSheet } from 'react-native-size-matters';


type Props = ButtonProps & {

};


const CustomButton = forwardRef<any, Props>(({ style, contentStyle, children, ...rest }, ref) => {
    const COLORS = useAppSelector(state => state.theme.colors);
    const styles = ScaledSheet.create({
        buttonInbuilt: {

        }
    })
    return (
        <Button
            ref={ref}
            style={[style, styles.buttonInbuilt]}
            mode='contained'
            dark={false}
            buttonColor={COLORS.btnColor}
            textColor={COLORS.btnText}
            elevation={5}
            theme={{
                roundness: 10,
                colors: {
                    outline: COLORS.btnColor,
                },
            }}
            {...rest}
        >
            {children}
        </Button>
    );
}
);

export default CustomButton;
