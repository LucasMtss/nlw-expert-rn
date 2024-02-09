import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Product } from "@/components/product";
import { IProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/data/functions/format-currency";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Feather } from '@expo/vector-icons'
import { LinkButton } from "@/components/link-button";
import { useState } from "react";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = '+5532991864842'

export default function Cart(){
    const [address, stAddress] = useState('');
    const cartStore = useCartStore();
    const navigation = useNavigation();

    const total = cartStore.products.reduce((total, product) => {
        return total + product.price * product.quantity
    }, 0);

    function handleProductRemove(product: IProductCartProps){
        Alert.alert('Rnmover', `Deseja remover ${product.title} do carrinho?`, [
            {
                text: 'Cancelar'
            },
            {
                text: 'Remover',
                onPress: () => cartStore.remove(product.id)
            },
        ])
    }

    function handleOrder(){
        if(!address.trim().length) {
            return Alert.alert('Pedido', 'Informe os dados da entrega')
        }

        const products = cartStore.products.map(product => `\n${product.quantity} ${product.title}`).join('');
        const message = `🍔 Novo pedido\n🛵 Entregar em: ${address}
            ${products}
            \n💰 Valor total: ${formatCurrency(total)}`

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
        cartStore.clear();
        navigation.goBack();
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu Carrinho"/>
            {
                cartStore.products.length ? (
                    <View>
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} extraHeight={300}>
                            <ScrollView>
                                <View className="p-5 flex-1">
                                    <View className="border-b border-slate-700">
                                        {
                                            cartStore.products.map(product => <Product key={product.id} data={product} onPress={() => handleProductRemove(product)}/>)
                                        }
                                    </View>
                                    <View className="flex-row gap-2 items-center mt-5 mb-4">
                                        <Text className="text-white text-xls font-subtitle">Total:</Text>
                                        <Text className="text-lime-400 text-2xl font-heading">{formatCurrency(total)}</Text>
                                    </View>
                                    <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemeto..." onChangeText={text => stAddress(text)} onSubmitEditing={handleOrder} blurOnSubmit/>
                                </View>
                            </ScrollView>
                        </KeyboardAwareScrollView>
                        <View className="p-5 gap-5">
                            <Button onPress={handleOrder}>
                                <Button.Text>Enviar pedido</Button.Text>
                                <Button.Icon><Feather name="arrow-right-circle" size={20}/></Button.Icon>
                            </Button>
                            <LinkButton title="Voltar ao cardápio" href="/"/>
                        </View>
                    </View>
                ) : (
                    <View className="flex-1 pb-4 justify-between">
                    <Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio!</Text>
                    <LinkButton title="Voltar ao cardápio" href="/"/>
                    </View>
                    )
            }
        </View>
    )
}