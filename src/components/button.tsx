import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IButtonProps extends TouchableOpacityProps {
    children: ReactNode;
}

interface IButtonTextProps {
    children: ReactNode;
}

interface IButtonIconProps {
    children: ReactNode;
}

function Button({children, ...rest}: IButtonProps){
    return (
        <TouchableOpacity className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row" {...rest} activeOpacity={0.7}>{children}</TouchableOpacity>
    );
}

function ButtonText({children}: IButtonTextProps){
    return (
        <Text className="text-black font-heading text-base mx-2">{children}</Text>
    );
}

function ButtonIcon({children}: IButtonIconProps){
    return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };