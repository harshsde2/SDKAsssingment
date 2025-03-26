import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Asset {
  symbol: string;
  name: string;
  quantity: string;
  value: string;
  image: ImageSourcePropType;
}

interface AssetsListProps {
  assets: Asset[];
}

const AssetsList = ({ assets }: AssetsListProps) => {
  const { colors, theme } = useTheme();
  return (
    <View style={[styles.assetsList, {backgroundColor: theme === 'dark' ? '#222' : '#E0E0E0'}]}>
      <Text style={[styles.assetsListTitle, {color: colors.text}]}>Assets Allocation</Text>
      
      {assets.map((asset, index) => (
        <View key={index} style={styles.assetItem}>
          <View style={styles.assetIconAndName}>
            <View style={[styles.assetIconContainer,{backgroundColor:index !== 2 ?  colors.text : 'orange' }]}>
              <Image source={asset.image} style={{width: 24, height: 24}} resizeMode="contain" /> 
            </View>
            <View>
              <Text style={[styles.assetName, {color: colors.text}]}>{asset.symbol}</Text>
              <Text style={[styles.assetSubtitle, {color: theme === 'dark' ? '#AAA' : '#777'}]}>{asset.name}</Text>
            </View>
          </View>
          <View style={styles.assetValues}>
            <Text style={[styles.assetQuantity, {color: colors.text}]}>{asset.quantity}</Text>
            <Text style={[styles.assetValue, {color: theme === 'dark' ? '#AAA' : '#777'}]}>{asset.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  assetsList: {
    borderRadius: 12,
    padding: 16,
  },
  assetsListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  assetIconAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  assetIcon: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  assetName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  assetSubtitle: {
    fontSize: 12,
  },
  assetValues: {
    alignItems: 'flex-end',
  },
  assetQuantity: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  assetValue: {
    fontSize: 12,
  },
});

export default AssetsList; 