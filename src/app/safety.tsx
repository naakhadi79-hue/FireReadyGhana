
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

type SafetyQuestion = {
  question: string;
  recommendation: string;
};

type SafetyCategory = {
  id: number;
  title: string;
  questions: SafetyQuestion[];
};

const safetyQuestions: SafetyCategory[] = [
  {
    id: 1,
    title: '🔥 LPG / Gas Safety',
    questions: [
      {
        question: 'Is your LPG cylinder kept upright in a safe, well-ventilated area?',
        recommendation:
          'Keep the cylinder upright, stable, and in a well-ventilated place away from heat and ignition sources. Follow your supplier’s instructions.',
      },
      {
        question: 'Do you check the hose, regulator, and connections for damage or leaks?',
        recommendation:
          'Ask a qualified gas technician or your LPG supplier to check damaged parts or suspected leaks. Never test for a leak with a flame.',
      },
      {
        question: 'Do you keep the area around the gas cylinder and cooker free from flammable materials?',
        recommendation:
          'Move paper, cloth, fuel, and other combustible items away from the cylinder and cooker.',
      },
    ],
  },
  {
    id: 2,
    title: '⚡ Electrical Safety',
    questions: [
      {
        question: 'Are your electrical sockets and switches free from damage?',
        recommendation:
          'Stop using damaged, hot, sparking, or loose sockets and arrange for a qualified electrician to inspect them.',
      },
      {
        question: 'Do you avoid connecting too many appliances to one socket or extension?',
        recommendation:
          'Avoid overloading sockets and extension leads. Plug high-power appliances into suitable outlets according to the manufacturer’s instructions.',
      },
      {
        question: 'Are damaged electrical cables and plugs replaced instead of being used?',
        recommendation:
          'Stop using damaged cables or plugs. Do not touch exposed wires; have the item safely repaired or replaced by a qualified person.',
      },
    ],
  },
  {
    id: 3,
    title: '🍳 Cooking Safety',
    questions: [
      {
        question: 'Do you avoid leaving cooking unattended?',
        recommendation:
          'Stay in the kitchen while cooking. If you must leave, turn off the cooker first when safe to do so.',
      },
      {
        question: 'Are curtains, cloth, paper, and other flammable items kept away from the cooker?',
        recommendation:
          'Clear cloth, paper, curtains, and other items that could catch fire away from the cooking area.',
      },
      {
        question: 'Does everyone in your household know how to safely respond to a cooking fire?',
        recommendation:
          'Discuss how to raise the alarm and evacuate. Never pour water on a cooking-oil fire. If it is not immediately safe to control, get out and call for help.',
      },
    ],
  },
  {
    id: 4,
    title: '🕯️ Open Flame Safety',
    questions: [
      {
        question: 'Are candles and other open flames kept away from flammable materials?',
        recommendation:
          'Place candles on a stable, heat-resistant surface away from curtains, bedding, paper, and drafts.',
      },
      {
        question: 'Are candles and open flames extinguished before leaving the room?',
        recommendation:
          'Extinguish candles and other open flames before leaving the room or going to sleep. Keep them attended while lit.',
      },
    ],
  },
  {
    id: 5,
    title: '🧯 Fire Extinguisher Safety',
    questions: [
      {
        question: 'Is a fire extinguisher available and accessible in your home?',
        recommendation:
          'Place a suitable fire extinguisher in an accessible location and follow its instructions.',
      },
      {
        question: 'Do you know how to use a fire extinguisher?',
        recommendation:
          'Learn how to use a suitable fire extinguisher properly. Check its label and ensure it is serviced regularly.',
      },
    ],
  },
];

export default function SafetyScreen() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = safetyQuestions.reduce(
    (total, category) => total + category.questions.length,
    0
  );

  const answeredCount = Object.keys(answers).length;

  const yesCount = Object.values(answers).filter(Boolean).length;

  const score =
    answeredCount === totalQuestions
      ? Math.round((yesCount / totalQuestions) * 100)
      : 0;

  const recommendations = safetyQuestions.flatMap((category) =>
    category.questions
      .filter((question) => answers[question.question] === false)
      .map((question) => ({
        category: category.title,
        question: question.question,
        advice: question.recommendation,
      }))
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🔥 FireReadyGhana</Text>
      <Text style={styles.subheading}>Home Fire Safety Assessment</Text>

      <TouchableOpacity
        style={styles.researchButton}
        onPress={() => router.push('/research')}
      >
        <Text style={styles.researchButtonText}>View My Research</Text>
      </TouchableOpacity>

      {!showResults ? (
        <>
          <Text style={styles.progress}>
            Answered {answeredCount} of {totalQuestions} questions
          </Text>

          {safetyQuestions.map((category) => (
            <View key={category.id} style={styles.category}>
              <Text style={styles.categoryTitle}>{category.title}</Text>

              {category.questions.map((question, index) => (
                <View key={index} style={styles.questionBox}>
                  <Text style={styles.question}>{question.question}</Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[
                        styles.answerButton,
                        answers[question.question] === true &&
                          styles.selectedYes,
                      ]}
                      onPress={() =>
                        setAnswers((previous) => ({
                          ...previous,
                          [question.question]: true,
                        }))
                      }
                    >
                      <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.answerButton,
                        answers[question.question] === false &&
                          styles.selectedNo,
                      ]}
                      onPress={() =>
                        setAnswers((previous) => ({
                          ...previous,
                          [question.question]: false,
                        }))
                      }
                    >
                      <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={[
              styles.submitButton,
              answeredCount !== totalQuestions && styles.disabledButton,
            ]}
            disabled={answeredCount !== totalQuestions}
            onPress={() => setShowResults(true)}
          >
            <Text style={styles.submitText}>View My Results</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.resultsBox}>
          <Text style={styles.resultsTitle}>Your Safety Results</Text>
          <Text style={styles.score}>{score}%</Text>

          <Text style={styles.summary}>
            You answered Yes to {yesCount} of {totalQuestions} safety questions.
          </Text>

          <Text style={styles.categoryTitle}>Areas to Improve</Text>

          {recommendations.length === 0 ? (
            <Text style={styles.question}>
              You answered Yes to every question. Continue practising fire
              prevention and reviewing your safety measures.
            </Text>
          ) : (
            recommendations.map((item, index) => (
              <View key={index} style={styles.recommendation}>
                <Text style={styles.question}>{item.category}</Text>
                <Text style={styles.question}>{item.question}</Text>
                <Text style={styles.advice}>{item.advice}</Text>
              </View>
            ))
          )}

          <Text style={styles.disclaimer}>
            This self-assessment is for educational purposes. It is not a
            certified fire-risk inspection.
          </Text>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => setShowResults(false)}
          >
            <Text style={styles.submitText}>Review My Answers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => {
              setAnswers({});
              setShowResults(false);
            }}
          >
            <Text style={styles.buttonText}>Start Again</Text>
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: 17,
    marginBottom: 20,
    color: '#374151',
  },
  progress: {
    fontSize: 15,
    marginBottom: 16,
    color: '#374151',
  },
  category: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#14532D',
  },
  questionBox: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  question: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1F2937',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  answerButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    marginVertical: 5,
  },
  selectedYes: {
    backgroundColor: '#BBF7D0',
    borderColor: '#15803D',
  },
  selectedNo: {
    backgroundColor: '#FECACA',
    borderColor: '#B91C1C',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  submitButton: {
    backgroundColor: '#166534',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  resultsTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 12,
  },
  score: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#374151',
  },
  recommendation: {
    padding: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    marginBottom: 12,
  },
  advice: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
  disclaimer: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 12,
  },
  researchButton: {
    backgroundColor: '#166534',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  researchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
