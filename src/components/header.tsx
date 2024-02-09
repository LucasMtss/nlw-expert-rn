import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

interface IHeaderProps {
    title: string;
    cartQuatityItems?: number;
}

export function Header({title, cartQuatityItems = 0}: IHeaderProps){
    return (
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
            <View className="flex-1">
                <Image className="h-6 w-32" source={require('@/assets/logo.png')} />
                <Text className="text-white text-2xl font-heading">{title}</Text>
            </View>
            {
                cartQuatityItems > 0 && (
                    <Link href='/cart' asChild>
                        <TouchableOpacity className="relative" activeOpacity={0.7}>
                            <View className="bg-lime-300 rounded-full w-4 h-4 items-center justify-center absolut top-2 z-10 -right-3.5">
                                <Text className="text-slate-800 font-bold text-xs">{cartQuatityItems}</Text>
                            </View>
                            <Feather name='shopping-bag' color={colors.white} size={24}/>
                        </TouchableOpacity>
                    </Link>
                )
            }
        </View>
    )
}