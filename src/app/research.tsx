
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';

export default function ResearchScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🔥 FireReadyGhana</Text>
      <Text style={styles.subheading}>
        Fire Safety Research & Notes
      </Text>

      <Text style={styles.intro}>
        This page summarises the fire prevention topics covered
        by the FireReadyGhana Home Fire Safety Assessment.
        It is an educational guide, not a professional fire
        inspection or a substitute for emergency services.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔥 1. LPG and Gas Safety</Text>
        <Text style={styles.body}>
          Keep an LPG cylinder upright, stable, and in a
          well-ventilated area. Keep it away from heat and
          ignition sources. Never use a flame to test for
          a gas leak. Seek help from a qualified gas technician
          if you suspect a leak or damaged equipment.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚡ 2. Electrical Safety</Text>
        <Text style={styles.body}>
          Avoid overloading sockets and extension leads.
          Stop using damaged, hot, loose, or sparking sockets
          and cables. Ask a qualified electrician to inspect
          electrical problems.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍳 3. Cooking Safety</Text>
        <Text style={styles.body}>
          Avoid leaving cooking unattended. Keep paper, cloth,
          and curtains away from the cooker. Never pour water
          on a cooking-oil fire. If it is unsafe to respond,
          evacuate and call for help.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🕯️ 4. Open Flame Safety</Text>
        <Text style={styles.body}>
          Keep candles on stable, heat-resistant surfaces away
          from curtains, bedding, paper, and other materials
          that can burn. Extinguish open flames before leaving
          the room or going to sleep.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧯 5. Fire Extinguisher Safety</Text>
        <Text style={styles.body}>
          Keep a suitable fire extinguisher accessible.
          Learn its operating instructions and ensure it is
          serviced as recommended. Never put yourself at risk
          trying to fight a fire; evacuate if there is danger.
        </Text>
      </View>

      <View style={styles.note}>
        <Text style={styles.cardTitle}>Important Note</Text>
        <Text style={styles.body}>
          The Safety Check score is based on your answers to
          the checklist. It is not a certified measurement of
          your home's actual fire risk.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>
          Back to Safety Check
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F5F8F6',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 19,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  intro: {
    fontSize: 15,
    lineHeight: 23,
    color: '#374151',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    color: '#1F2937',
  },
  note: {
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#166534',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
