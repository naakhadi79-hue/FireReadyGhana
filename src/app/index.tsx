import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

function callFireService() {
  if (Platform.OS === 'web') {
    Alert.alert(
      'Fire Emergency',
      'Please use your phone to call the Ghana National Fire Service on 192.'
    );
    return;
  }

  Linking.openURL('tel:192').catch(() => {
    Alert.alert(
      'Call 192',
      'Please call the Ghana National Fire Service on 192.'
    );
  });
}

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>🔥 FireReady Ghana</Text>

        <Text style={styles.tagline}>
          Stay Ready. Stay Safe.
        </Text>
      </View>

      {/* EMERGENCY CARD */}
      <View style={styles.emergencyCard}>
        <Text style={styles.emergencyIcon}>🚨</Text>

        <Text style={styles.emergencyTitle}>
          FIRE EMERGENCY
        </Text>

        <Text style={styles.emergencyText}>
          If there is a fire, get people to safety first
          and contact the Ghana National Fire Service.
        </Text>

        {/* ENTER EMERGENCY MODE */}
        <TouchableOpacity
          style={styles.emergencyModeButton}
          activeOpacity={0.8}
          onPress={() => {
            router.push('/emergency');
          }}
        >
          <Text style={styles.emergencyModeButtonText}>
            🚨 ENTER EMERGENCY MODE
          </Text>
        </TouchableOpacity>

        {/* CALL 192 */}
        <TouchableOpacity
          style={styles.emergencyButton}
          activeOpacity={0.8}
          onPress={callFireService}
        >
          <Text style={styles.emergencyButtonText}>
            📞 CALL 192
          </Text>
        </TouchableOpacity>
      </View>

      {/* STAY PREPARED */}
      <Text style={styles.sectionTitle}>
        Stay Prepared
      </Text>

      <View style={styles.cardsContainer}>

        {/* SAFETY CHECK */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => {
            router.push('/safety');
          }}
        >
          <Text style={styles.cardIcon}>🏠</Text>

          <Text style={styles.cardTitle}>
            Safety Check
          </Text>

          <Text style={styles.cardText}>
            Check common fire risks around your home.
          </Text>
        </TouchableOpacity>

        {/* FAMILY SAFETY */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert(
              'Family Safety',
              'Family safety and trusted contacts will be added here.'
            );
          }}
        >
          <Text style={styles.cardIcon}>👨‍👩‍👧</Text>

          <Text style={styles.cardTitle}>
            Family Safety
          </Text>

          <Text style={styles.cardText}>
            Prepare your family for a fire emergency.
          </Text>
        </TouchableOpacity>

        {/* FIRE SAFETY EDUCATION */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert(
              'Learn Fire Safety',
              'Fire safety education will be added here.'
            );
          }}
        >
          <Text style={styles.cardIcon}>📚</Text>

          <Text style={styles.cardTitle}>
            Learn Fire Safety
          </Text>

          <Text style={styles.cardText}>
            Learn how to prevent fires and respond safely.
          </Text>
        </TouchableOpacity>

      </View>

      {/* PREPAREDNESS CARD */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          🔥 Be Prepared
        </Text>

        <Text style={styles.infoText}>
          Know your exits, keep emergency contacts available,
          and make sure your family knows where to meet if
          you need to evacuate.
        </Text>
      </View>

      {/* QUICK SAFETY TIPS */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>
          🛡️ Quick Safety Tips
        </Text>

        <Text style={styles.tip}>
          • Keep LPG and other flammable materials safely stored.
        </Text>

        <Text style={styles.tip}>
          • Avoid overloading electrical sockets.
        </Text>

        <Text style={styles.tip}>
          • Never leave cooking unattended.
        </Text>

        <Text style={styles.tip}>
          • Know at least two ways to leave your home.
        </Text>

        <Text style={styles.tip}>
          • Keep emergency numbers easily available.
        </Text>
      </View>

      {/* FIRE SERVICE */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>
          Ghana National Fire Service
        </Text>

        <Text style={styles.footerNumber}>
          Emergency: 192
        </Text>

        <Text style={styles.footerText}>
          In an active fire emergency, prioritize getting
          yourself and others to safety.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f5',
  },

  content: {
    paddingBottom: 40,
  },

  header: {
    paddingTop: 55,
    paddingHorizontal: 24,
    paddingBottom: 25,
    backgroundColor: '#8b0000',
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  tagline: {
    marginTop: 6,
    fontSize: 16,
    color: '#ffe5e5',
  },

  emergencyCard: {
    margin: 20,
    padding: 25,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    elevation: 5,
  },

  emergencyIcon: {
    fontSize: 45,
  },

  emergencyTitle: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  emergencyText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: '#444444',
  },

  emergencyModeButton: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#8b0000',
    alignItems: 'center',
  },

  emergencyModeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  emergencyButton: {
    marginTop: 12,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#d00000',
    alignItems: 'center',
  },

  emergencyButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
  },

  cardsContainer: {
    paddingHorizontal: 20,
  },

  card: {
    marginBottom: 14,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
  },

  cardIcon: {
    fontSize: 30,
  },

  cardTitle: {
    marginTop: 8,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  cardText: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 20,
    color: '#555555',
  },

  infoCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffe8e8',
  },

  infoTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  infoText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#444444',
  },

  tipsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
  },

  tipsTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  tip: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#444444',
  },

  footer: {
    padding: 25,
    alignItems: 'center',
  },

  footerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555555',
    textAlign: 'center',
  },

  footerNumber: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  footerText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: '#666666',
    textAlign: 'center',
  },
});