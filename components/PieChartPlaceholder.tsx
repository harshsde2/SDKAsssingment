import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { Slice } from 'react-native-pie-chart';
import { useTheme } from '../context/ThemeContext';
interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartPlaceholderProps {
  data: ChartData[];
}

const PieChartPlaceholder = ({ data }: PieChartPlaceholderProps) => {
  const { colors } = useTheme();
  // Convert the chart data to the format the library expects
  const series: Slice[] = data.map(item => ({
    value: item.value,
    color: item.color,
  }));
  
  // Calculate chart size based on screen width
  const screenWidth = Dimensions.get('window').width;
  const chartSize = Math.min(screenWidth - 120, 180);
  
  return (
    <View style={styles.chartContainer}>
      <View style={styles.pieChartWrapper}>
        <PieChart
          widthAndHeight={chartSize}
          series={series}
          cover={0.009} // Center hole size as a percentage (0-1)
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
      
      {/* Chart Labels */}
      <View style={styles.chartLabels}>
        {data.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.chartLabel, 
              index === 0 ? {right: '5%', top: '30%'} :
              index === 1 ? {left: '5%', top: '30%'} :
              {top: '-10%', left: '30%', alignSelf: 'center'}
            ]}
          >
            <Text style={[styles.chartPercent,{color:colors.text}]}>{item.value}%</Text>
            <Text style={[styles.chartAssetName,{color:colors.text}]}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
    marginTop: 20,
  },
  pieChartWrapper: {
    // The pie chart will be centered by default
  },
  chartLabels: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  chartLabel: {
    position: 'absolute',
  },
  chartPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  chartAssetName: {
    fontSize: 12,
    color: '#fff',
  },
});

export default PieChartPlaceholder; 