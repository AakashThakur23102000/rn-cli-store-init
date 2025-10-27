import React from 'react';
import type { SvgProps } from 'react-native-svg';
// import Login from '../assets/svg/LoginDoor.svg'
const ICONS = {
    // login: Login,
} as const;

type IconName = keyof typeof ICONS;
type Props = SvgProps & {
    name: IconName;
};

const CustomSVG: React.FC<Props> = ({ name, ...rest }) => {
    const SvgComponent = ICONS[name];
    return <SvgComponent {...rest} />;
};

export default CustomSVG;
