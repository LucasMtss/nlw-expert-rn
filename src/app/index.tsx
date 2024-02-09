import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { View, FlatList, SectionList, Text } from 'react-native';
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { useState, useRef } from 'react';
import { Product } from '@/components/product';
import { Link } from 'expo-router';
import { useCartStore } from '@/stores/cart-store';

export default function Home() {
    const [categorySelected, setCategorySelected] = useState(CATEGORIES[0]);
    const cartStore = useCartStore();
    const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

    const sectionListRef = useRef<SectionList<ProductProps>>(null);

    function handleCategorySelected(item: string){
        setCategorySelected(item);

        const sectionIndex = CATEGORIES.findIndex(category => category === item);

        if(sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }
    }

  return (
    <View className="py-8 px-4">
        <Header title='Faça seu pedido' cartQuatityItems={cartQuantityItems}/>
        <FlatList 
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({item}) => (<CategoryButton title={item} isSelcted={item === categorySelected} onPress={() => handleCategorySelected(item)}/>)}
            horizontal
            className='max-h-14 h-14 mt-5'
            contentContainerStyle={{ gap: 12, paddingHorizontal: 20}}
        />
        <SectionList 
            sections={MENU}
            keyExtractor={(item) => item.id}
            stickySectionHeadersEnabled={false}
            renderItem={({item}) => (
                <Link href={`/product/${item.id}`} asChild>
                   <Product data={item}/>
                </Link>
            )}
            renderSectionHeader={({section: {title}}) => <Text className='text-xl text-white font-heading mt-8 mb-3'>{title}</Text>}
            className='p-5'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 200}}
            ref={sectionListRef}
        />
    </View>
  );
}
