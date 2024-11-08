import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Svg, {Circle} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment'; // Import moment.js for date formatting
import Header from '../../layout/header';

const screenWidth = Dimensions.get('window').width;
const radius = 70; // Adjust based on desired circle size
const strokeWidth = 10;
const circumference = 2 * Math.PI * radius;

export function StepTracker() {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState('days'); // day, week, month
  const [currentDate, setCurrentDate] = useState(moment()); // current date

  const [stepProgress, setstepProgress] = useState({
    present: 2400, 
    goal: 5000, 
    achievement: 20, 
  });

  const lineChartData = {
    days: [2, 3, 2, 2.5, 2], // Example data for 'Day'
    weeks: [10, 12, 15, 11, 14], // Example data for 'Week'
    months: [60, 50, 70, 55, 65], // Example data for 'Month'
  };

  const handlePreviousDate = () => {
    if (selectedCard === 'days') {
      setCurrentDate(currentDate.subtract(1, 'days'));
    } else if (selectedCard === 'weeks') {
      setCurrentDate(currentDate.subtract(1, 'weeks'));
    } else {
      setCurrentDate(currentDate.subtract(1, 'months'));
    }
  };

  const handleNextDate = () => {
    if (selectedCard === 'days') {
      setCurrentDate(currentDate.add(1, 'days'));
    } else if (selectedCard === 'weeks') {
      setCurrentDate(currentDate.add(1, 'weeks'));
    } else {
      setCurrentDate(currentDate.add(1, 'months'));
    }
  };

  const renderChartHeader = () => {
    if (selectedCard === 'days') {
      return currentDate.format('DD, MMM YYYY');
    } else if (selectedCard === 'weeks') {
      return `Week ${Math.ceil(currentDate.date() / 7)} of ${currentDate.format(
        'MMMM',
      )}`;
    } else {
      return currentDate.format('MMMM, YYYY');
    }
  };

  const renderLineChart = () => {
    const labels =
      selectedCard === 'days'
        ? ['00:00', '06:00', '12:00', '18:00', '23:00'] // Hourly labels for day
        : selectedCard === 'weeks'
        ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // Weekly labels
        : ['01', '05', '10', '15', '20', '25']; // Monthly day labels

    return (
      <LineChart
        data={{
          labels: labels,
          datasets: [{data: lineChartData[selectedCard]}],
        }}
        width={screenWidth - 65} // Adjust width for padding
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f6f6f6',
          backgroundGradientTo: '#f6f6f6',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(246, 162, 26, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          fillShadowGradient: 'rgba(246, 162, 26, 0.3)', // Color for area under the line
          fillShadowGradientOpacity: 0.3,
          style: {borderRadius: 10}, // Add rounded corners
        }}
        style={{marginVertical: 8, borderRadius: 10}} // Add rounded corners
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Steps tracking'}  leftIcon={'back'} titleLeft/>
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        {/* Progress Circle and Details */}
        <View style={styles.progressContainer}>
          <View>
            <Svg width={154} height={154} viewBox="0 0 154 154">
              <Circle
                cx={77}
                cy={77}
                r={radius}
                stroke="#f6a21a"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeLinecap="round"
                transform="rotate(-90 77 77)" />
            </Svg>
            <View style={styles.innerCircle}>
              <Text style={styles.progressText}>
                {stepProgress.present} 
              </Text>
              <Text style={styles.stepText}>steps</Text>
            </View>
          </View>

          <View>
            <View style={styles.goalCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>Goal</Text>
                <Image
                  style={styles.cardHeaderIcon}
                  source={require('../../assets/images/goalicon.jpg')}
                />
              </View>
              <Text style={styles.goalText}>
                {stepProgress.goal}{' '}
                <Text style={styles.unitText}>steps</Text>
              </Text>
            </View>
            <View style={[styles.achievementCard, {marginTop: 20}]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>Achievement</Text>
                <Image
                  style={styles.cardHeaderIcon}
                  source={require('../../assets/images/star.png')}
                />
              </View>
              <Text style={styles.achievementText}>
                {stepProgress.achievement}{' '}
                <Text style={styles.daysText}>days</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons: Days, Weeks, Months */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedCard === 'days' && styles.activeButton,
            ]}
            onPress={() => setSelectedCard('days')}>
            <Text
              style={[
                styles.tabButtonText,
                selectedCard === 'days' && styles.activeTabText,
              ]}>
              Day
            </Text>
            {selectedCard === 'days' && (
              <View style={[styles.activeTabIndicator, {left: '50%'}]} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedCard === 'weeks' && styles.activeButton,
            ]}
            onPress={() => setSelectedCard('weeks')}>
            <Text
              style={[
                styles.tabButtonText,
                selectedCard === 'weeks' && styles.activeTabText,
              ]}>
              Week
            </Text>
            {selectedCard === 'weeks' && (
              <View style={[styles.activeTabIndicator, {left: '50%'}]} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedCard === 'months' && styles.activeButton,
            ]}
            onPress={() => setSelectedCard('months')}>
            <Text
              style={[
                styles.tabButtonText,
                selectedCard === 'months' && styles.activeTabText,
              ]}>
              Month
            </Text>
            {selectedCard === 'months' && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
        </View>

        {/* Card with Line Chart and Date */}
        <View style={styles.cardContainer}>
          <View style={styles.dateNavigationContainer}>
            <TouchableOpacity onPress={handlePreviousDate}>
              <FontAwesome name="chevron-left" size={16} color="#1F2587" />
            </TouchableOpacity>
            <Text style={styles.dateText}>{renderChartHeader()}</Text>
            <TouchableOpacity onPress={handleNextDate}>
              <FontAwesome name="chevron-right" size={16} color="#1F2587" />
            </TouchableOpacity>
          </View>

          {/* Line Chart */}
          <View style={styles.chartContainer}>{renderLineChart()}</View>
        </View>

        {/* Bottom Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.2</Text>
            <Text style={styles.statLabel}>Average</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.4</Text>
            <Text style={styles.statLabel}>Max</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.8</Text>
            <Text style={styles.statLabel}>Min</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  innerCircle: {
    position: 'absolute',
    top: 55,
    left: 55,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2587',
  },
  stepText: {
    fontSize: 12,
    color: '#1F2587',
  },
  goalCard: {
    borderRadius: 4,
    width: 120,
    height: 60,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    marginTop: 10,
  },
  cardHeaderText: {
    fontSize: 12,
    color: '#1F2587',
  },
  goalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2587',
  },
  unitText: {
    fontSize: 14,

    fontWeight: 'normal',
    color: '#1F2587',
  },
  achievementCard: {
    borderRadius: 4,
    width: 120,
    height: 60,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    marginTop: 10,
  },
  achievementText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2587',
  },
  daysText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#1F2587',
  },
  cardHeaderIcon: {
    position: 'absolute',
    top: 10,
    right: 12,
    backgroundColor: '#fff',
    marginTop: -10,
    height: 15,
    width: 15,
  },
  buttonContainer: {
    flexDirection: 'row',

    marginHorizontal: 54,
    marginBottom: 20,
    marginTop: 20, // Add marginTop here
  },
  tabButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: '#D9D9D9',
    position: 'relative',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderColor: '#1F2587',
  },
  tabButtonText: {
    color: '#666666',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    textAlign: 'center',
    width: 50,
  },
  activeTabText: {
    color: '#1F2587',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '50%',
    transform: [{translateX: 10}],
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1F2587',
    alignSelf: 'center',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 5, // Add marginTop here
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2587',
    textAlign: 'center',
    width: 200,
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#fffff',

    paddingRight: 10,
  },
  statsContainer: {
    flexDirection: 'row', // Layout the stats in a row
    justifyContent: 'space-around', // Spread them across the screen
    marginTop: 35,
    backgroundColor: '#B4B4B4',
    borderRadius: 6,
    height: 60,
    width: screenWidth - 30,
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2587',
  },
  statLabel: {
    fontSize: 12,
    color: '#1F2587',
  },
});

export default StepTracker;