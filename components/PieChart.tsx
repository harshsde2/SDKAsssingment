import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PieChart, { Slice } from 'react-native-pie-chart';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface AssetsPieChartProps {
  data: ChartData[];
}

const AssetsPieChart = ({ data }: AssetsPieChartProps) => {
  // Convert the data to the format the library expects
  const series: Slice[] = data.map(item => ({
    value: item.value,
    color: item.color,
  }));
  
  // Calculate chart size based on screen width
  const screenWidth = Dimensions.get('window').width;
  const chartSize = Math.min(screenWidth - 100, 220);
  
  return (
    <View style={styles.chartContainer}>
      <View style={styles.pieChartWrapper}>
        <PieChart
          widthAndHeight={chartSize}
          series={series}
          cover={{
            radius: 0.65,
            color: '#000000'
          }}
        />
      </View>
      
      {/* Labels positioned absolutely to match the design */}
      <View style={styles.labelsContainer}>
        {/* Solana Label - Left */}
        <View style={styles.leftLabel}>
          <Text style={styles.percentText}>{data[0].value}%</Text>
          <Text style={styles.labelText}>{data[0].label}</Text>
        </View>
        
        {/* Ethereum Label - Right */}
        <View style={styles.rightLabel}>
          <Text style={styles.percentText}>{data[1].value}%</Text>
          <Text style={styles.labelText}>{data[1].label}</Text>
        </View>
        
        {/* Bitcoin Label - Bottom */}
        <View style={styles.bottomLabel}>
          <Text style={styles.percentText}>{data[2].value}%</Text>
          <Text style={styles.labelText}>{data[2].label}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    position: 'relative',
    width: '100%',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  pieChartWrapper: {
    // The pie chart will be positioned in the center by default
  },
  labelsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  percentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  labelText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  leftLabel: {
    position: 'absolute',
    left: '30%',
    top: '30%',
  },
  rightLabel: {
    position: 'absolute',
    right: '10%',
    top: '0%',
  },
  bottomLabel: {
    position: 'absolute',
    right: '10%',
    bottom: '15%',
  },
});

export default AssetsPieChart; 