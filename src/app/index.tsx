import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { View, FlatList } from 'react-native';
import { CATEGORIES } from '@/utils/data/products'
import { useState } from 'react';

export default function Home() {
    const [categorySelected, setCategorySelected] = useState(CATEGORIES[0]);

    function handleCategorySelected(item: string){
        setCategorySelected(item);
    }
  return (
    <View className="py-8 px-4">
        <Header title='Faça seu pedido' cartQuatityItems={5}/>
        <FlatList 
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({item}) => (<CategoryButton title={item} isSelcted={item === categorySelected} onPress={() => handleCategorySelected(item)}/>)}
            horizontal
            className='max-h-10 mt-5'
            contentContainerStyle={{ gap: 12, paddingHorizontal: 20}}
        />
    
    </View>
  );
}
