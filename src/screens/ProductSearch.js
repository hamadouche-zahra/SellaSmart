import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import productData from '../utils/products.json';
import CartHeader from './CartHeader';
import { useNavigation } from '@react-navigation/native';

const ProductSearch = () => {
  const navigation=useNavigation()
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
 
  const searchProduct = () => {
    const foundProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(foundProducts);
  };

  return (
    <View style={styles.container}>
      <CartHeader 
       title="Product Search"
       onBackPress={() => navigation.goBack()} 
      />
      <TextInput
        placeholder="Enter product name"
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={styles.input}
      />
     <TouchableOpacity
               onPress={searchProduct}
               style={styles.button}
          >
          <Text  style={styles.buttonText}>Search</Text>
             
      </TouchableOpacity>
       
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Product: {item.name}</Text>
            <Text style={styles.resultText}>Aisle: {item.aisle}</Text>
            <Text style={styles.resultText}>Position: {item.position}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    margin: 20,
  },
  button:{
    backgroundColor: '#4A90E2',
    borderRadius: 10, 
    alignItems: 'center',
    padding: 10,             
    marginHorizontal:20,
    marginBottom:20
  },
  buttonText: {
    color: '#fff',
    fontWeight:'bold',
    textAlign: 'center' ,
    fontSize:16
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    marginHorizontal:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderColor: '#4A90E2', 
    width: '100%',
    position: 'relative',
  },
  resultText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
});

export default ProductSearch;
