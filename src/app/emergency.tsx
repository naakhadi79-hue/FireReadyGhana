import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState } from 'react';

export default function EmergencyScreen() {
  const [locationText, setLocationText] = useState(
    'Location not available yet'
  );

  const [landmark, setLandmark] = useState('');
  const [directions, setDirections] = useState('');

  const [fireType, setFireType] = useState('');
  const [peopleTrapped, setPeopleTrapped] = useState('');

  const [familyMessage, setFamilyMessage] = useState('');
  const [showFamilyMessage, setShowFamilyMessage] = useState(false);

  async function getMyLocation() {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Please allow location permission so FireReady Ghana can help you provide your location during an emergency.'
        );

        setLocationText('Location permission was not granted.');
        return;
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      setLocationText(
        `Latitude: ${latitude.toFixed(
          6
        )}\nLongitude: ${longitude.toFixed(6)}`
      );
    } catch (error) {
      setLocationText('Unable to get your location.');
    }
  }

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

  async function alertFamily() {
    const message =
      `🔥 FIRE EMERGENCY - FireReady Ghana\n\n` +
      `I may be experiencing a fire emergency.\n\n` +
      `📍 Location:\n${locationText}\n\n` +
      `📌 Landmark:\n${
        landmark.trim() || 'Not provided'
      }\n\n` +
      `🔥 Fire type:\n${
        fireType || 'Not specified'
      }\n\n` +
      `👥 Anyone trapped:\n${
        peopleTrapped || 'Not specified'
      }\n\n` +
      `🧭 Directions:\n${
        directions.trim() || 'Not provided'
      }\n\n` +
      `📞 Ghana National Fire Service: 192`;

    setFamilyMessage(message);

    if (Platform.OS === 'web') {
      setShowFamilyMessage(true);
      return;
    }

    try {
      const smsUrl =
        `sms:?body=${encodeURIComponent(message)}`;

      const supported =
        await Linking.canOpenURL(smsUrl);

      if (supported) {
        await Linking.openURL(smsUrl);
      } else {
        Alert.alert(
          'Family Alert',
          'Your messaging application could not be opened. Please contact your family directly.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Family Alert',
        'Could not open the messaging application. Please contact your family directly.'
      );
    }
  }

  function closeFamilyMessage() {
    setShowFamilyMessage(false);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.headerIcon}>🚨</Text>

        <Text style={styles.headerTitle}>
          Emergency Mode
        </Text>

        <Text style={styles.headerText}>
          Stay calm. Get people to safety and contact
          emergency services.
        </Text>
      </View>

      {/* SAFETY WARNING */}

      <View style={styles.warningCard}>
        <Text style={styles.warningTitle}>
          ⚠️ Your Safety Comes First
        </Text>

        <Text style={styles.warningText}>
          Do not put yourself in danger trying to fight a
          fire. Evacuate if necessary and contact the Ghana
          National Fire Service.
        </Text>
      </View>

      {/* CALL FIRE SERVICE */}

      <TouchableOpacity
        style={styles.callButton}
        activeOpacity={0.8}
        onPress={callFireService}
      >
        <Text style={styles.callButtonText}>
          📞 CALL 192
        </Text>
      </TouchableOpacity>

      {/* LOCATION */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          📍 Your Location
        </Text>

        <Text style={styles.sectionDescription}>
          Get your current location so you can provide useful
          information to emergency responders or your family.
        </Text>

        <TouchableOpacity
          style={styles.locationButton}
          activeOpacity={0.8}
          onPress={getMyLocation}
        >
          <Text style={styles.locationButtonText}>
            📍 GET MY LOCATION
          </Text>
        </TouchableOpacity>

        <View style={styles.locationBox}>
          <Text style={styles.locationText}>
            {locationText}
          </Text>
        </View>
      </View>

      {/* LANDMARK */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          📌 Nearest Landmark
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Example: Near a school, church or shop"
          placeholderTextColor="#888888"
          value={landmark}
          onChangeText={setLandmark}
        />
      </View>

      {/* DIRECTIONS */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          🧭 Extra Directions
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.multilineInput,
          ]}
          placeholder="Add directions that can help people find you"
          placeholderTextColor="#888888"
          multiline
          numberOfLines={4}
          value={directions}
          onChangeText={setDirections}
        />
      </View>

      {/* FIRE TYPE */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          🔥 What type of fire is it?
        </Text>

        <Text style={styles.sectionDescription}>
          Select the option that best describes the situation.
        </Text>

        <View style={styles.optionsContainer}>
          {[
            'LPG / Gas',
            'Electrical',
            'Building',
            'Vehicle',
            'Other',
          ].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                fireType === type &&
                  styles.selectedOption,
              ]}
              activeOpacity={0.8}
              onPress={() => setFireType(type)}
            >
              <Text
                style={[
                  styles.optionText,
                  fireType === type &&
                    styles.selectedOptionText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* PEOPLE TRAPPED */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          👥 Is anyone trapped?
        </Text>

        <View style={styles.optionsContainer}>
          {['Yes', 'No', "Don't know"].map(
            (answer) => (
              <TouchableOpacity
                key={answer}
                style={[
                  styles.optionButton,
                  peopleTrapped === answer &&
                    styles.selectedOption,
                ]}
                activeOpacity={0.8}
                onPress={() =>
                  setPeopleTrapped(answer)
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    peopleTrapped === answer &&
                      styles.selectedOptionText,
                  ]}
                >
                  {answer}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      {/* FAMILY ALERT */}

      <View style={styles.familyCard}>
        <Text style={styles.familyIcon}>
          👨‍👩‍👧‍👦
        </Text>

        <Text style={styles.familyTitle}>
          Alert Your Family
        </Text>

        <Text style={styles.familyText}>
          Prepare an emergency message containing the
          information you entered above.
        </Text>

        <TouchableOpacity
          style={styles.familyButton}
          activeOpacity={0.8}
          onPress={alertFamily}
        >
          <Text style={styles.familyButtonText}>
            🚨 ALERT FAMILY
          </Text>
        </TouchableOpacity>
      </View>

      {/* FAMILY MESSAGE */}

      {showFamilyMessage && (
        <View style={styles.messageCard}>
          <Text style={styles.messageTitle}>
            📱 Family Emergency Message
          </Text>

          <Text style={styles.messageDescription}>
            Your emergency message is ready. On a computer,
            you can copy this message and send it to your
            family.
          </Text>

          <View style={styles.messageBox}>
            <Text style={styles.messageText}>
              {familyMessage}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.copyButton}
            activeOpacity={0.8}
            onPress={async () => {
              if (Platform.OS === 'web') {
                try {
                  await navigator.clipboard.writeText(
                    familyMessage
                  );

                  window.alert(
                    'Emergency message copied.'
                  );
                } catch (error) {
                  window.alert(
                    'Please select and copy the message manually.'
                  );
                }
              }
            }}
          >
            <Text style={styles.copyButtonText}>
              📋 COPY MESSAGE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={closeFamilyMessage}
          >
            <Text style={styles.closeButtonText}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WHILE WAITING */}

      <View style={styles.guidanceCard}>
        <Text style={styles.guidanceTitle}>
          🛡️ While Waiting for Help
        </Text>

        <Text style={styles.guidanceItem}>
          • Move yourself and others away from danger.
        </Text>

        <Text style={styles.guidanceItem}>
          • Follow a safe evacuation route if available.
        </Text>

        <Text style={styles.guidanceItem}>
          • Do not enter a smoke-filled area.
        </Text>

        <Text style={styles.guidanceItem}>
          • Do not approach electrical or LPG/gas fires.
        </Text>

        <Text style={styles.guidanceItem}>
          • Keep access routes clear for emergency responders.
        </Text>

        <Text style={styles.guidanceItem}>
          • If someone is trapped, tell the fire service
          exactly where they may be.
        </Text>
      </View>

      {/* FIRE SERVICE NUMBER */}

      <View style={styles.numberCard}>
        <Text style={styles.numberTitle}>
          Ghana National Fire Service
        </Text>

        <Text style={styles.number}>
          192
        </Text>

        <Text style={styles.numberText}>
          Emergency Fire Service
        </Text>
      </View>

      {/* BACK BUTTON */}

      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>
          ← BACK TO HOME
        </Text>
      </TouchableOpacity>
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
    backgroundColor: '#8b0000',
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 28,
    alignItems: 'center',
  },

  headerIcon: {
    fontSize: 45,
  },

  headerTitle: {
    marginTop: 8,
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  headerText: {
    marginTop: 8,
    color: '#ffe5e5',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },

  warningCard: {
    margin: 20,
    padding: 18,
    borderRadius: 15,
    backgroundColor: '#fff0d9',
    borderWidth: 1,
    borderColor: '#f0c36d',
  },

  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8a4b00',
  },

  warningText: {
    marginTop: 8,
    color: '#5f4300',
    fontSize: 14,
    lineHeight: 21,
  },

  callButton: {
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: '#d00000',
    alignItems: 'center',
  },

  callButtonText: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: 'bold',
  },

  section: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  sectionDescription: {
    marginTop: 7,
    color: '#555555',
    fontSize: 14,
    lineHeight: 20,
  },

  locationButton: {
    marginTop: 15,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: '#8b0000',
    alignItems: 'center',
  },

  locationButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  locationBox: {
    marginTop: 12,
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
  },

  locationText: {
    color: '#444444',
    fontSize: 14,
    lineHeight: 21,
  },

  input: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#fafafa',
    color: '#222222',
    fontSize: 14,
  },

  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  optionsContainer: {
    marginTop: 12,
  },

  optionButton: {
    marginBottom: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
  },

  selectedOption: {
    backgroundColor: '#8b0000',
    borderColor: '#8b0000',
  },

  optionText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
  },

  selectedOptionText: {
    color: '#ffffff',
  },

  familyCard: {
    margin: 20,
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#ffe8e8',
    alignItems: 'center',
  },

  familyIcon: {
    fontSize: 40,
  },

  familyTitle: {
    marginTop: 8,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  familyText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#444444',
    fontSize: 14,
    lineHeight: 21,
  },

  familyButton: {
    marginTop: 17,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#8b0000',
    alignItems: 'center',
  },

  familyButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  messageCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#8b0000',
    elevation: 4,
  },

  messageTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  messageDescription: {
    marginTop: 8,
    color: '#555555',
    fontSize: 14,
    lineHeight: 20,
  },

  messageBox: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
  },

  messageText: {
    color: '#222222',
    fontSize: 14,
    lineHeight: 21,
  },

  copyButton: {
    marginTop: 15,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#8b0000',
    alignItems: 'center',
  },

  copyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  closeButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#333333',
    fontWeight: 'bold',
  },

  guidanceCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
  },

  guidanceTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#8b0000',
    marginBottom: 10,
  },

  guidanceItem: {
    marginTop: 8,
    color: '#444444',
    fontSize: 14,
    lineHeight: 21,
  },

  numberCard: {
    margin: 20,
    padding: 22,
    borderRadius: 16,
    backgroundColor: '#8b0000',
    alignItems: 'center',
  },

  numberTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  number: {
    marginTop: 5,
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
  },

  numberText: {
    marginTop: 3,
    color: '#ffe5e5',
    fontSize: 14,
  },

  backButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#333333',
    alignItems: 'center',
  },

  backButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});