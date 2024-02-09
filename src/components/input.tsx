import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

export function Input({...rest}: TextInputProps){
    return(
        <TextInput className="text-white h-32 bg-slate-800 rounded-md px-4 py-3 font-body text-sm m-2" textAlignVertical="top" placeholderTextColor={colors.slate[400]} multiline {...rest}/>
    )
}