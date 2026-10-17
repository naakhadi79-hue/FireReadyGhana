import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { useState } from 'react';

const safetyQuestions = [
  {
    id: 1,
    title: '🔥 LPG / Gas Safety',
    questions: [
      'Is your LPG cylinder kept upright in a safe, well-ventilated area?',
      'Do you check the hose, regulator, and connections for damage or leaks?',
      'Do you keep the area around the gas cylinder and cooker free from flammable materials?',
    ],
  },
  {
    id: 2,
    title: '⚡ Electrical Safety',
    questions: [
      'Are your electrical sockets and switches free from damage?',
      'Do you avoid connecting too many appliances to one socket or extension?',
      'Are damaged electrical cables and plugs replaced instead of being used?',
    ],
  },
  {
    id: 3,
    title: '🍳 Cooking Safety',
    questions: [
      'Do you avoid leaving cooking unattended?',
      'Are curtains, cloth, paper, and other flammable items kept away from the cooker?',
      'Does everyone in your household know how to safely respond to a cooking fire?',
    ],
  },
  {
    id: 4,
    title: '🕯️ Open Flame Safety',
    questions: [
      'Are candles and other open flames kept away from flammable materials?',
      'Are candles and open flames extinguished before leaving the room?',
      'Are children kept away from matches, lighters, candles, and other open flames?',
    ],
  },
  {
    id: 5,
    title: '🚪 Evacuation & Family Safety',
    questions: [
      'Does your household know at least two safe ways to leave the home?',
      'Does everyone know where to meet outside after evacuating?',
      'Can everyone in the household quickly find the emergency exit, especially at night?',
    ],
  },
];

export default function SafetyScreen() {
  const [answers, setAnswers] = useState<
    Record<number, Record<number, string>>
  >({});
  const [result, setResult] = useState<{
    title: string;
    message: string;
  } | null>(null);

  function chooseAnswer(
    categoryId: number,
    questionIndex: number,
    answer: string
  ) {
    setAnswers((previous) => ({
      ...previous,
      [categoryId]: {
        ...previous[categoryId],
        [questionIndex]: answer,
      },
    }));
  }

  function checkSafety() {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let yesAnswers = 0;

    safetyQuestions.forEach((category) => {
      category.questions.forEach((_, index) => {
        totalQuestions++;

        const answer = answers[category.id]?.[index];

        if (answer) {
          answeredQuestions++;
        }

        if (answer === 'Yes') {
          yesAnswers++;
        }
      });
    });

    if (answeredQuestions < totalQuestions) {
      setResult({
        title: 'Safety Check',
        message: `Please answer all ${totalQuestions} questions before checking your results. You have answered ${answeredQuestions} of ${totalQuestions}.`,
      });
      return;
    }

    let resultTitle = '';
    let resultMessage = '';

    if (yesAnswers === totalQuestions) {
      resultTitle = 'Excellent Safety';
      resultMessage =
        'You answered Yes to every safety question. Keep maintaining these good safety habits and review your home regularly.';
    } else if (yesAnswers >= 10) {
      resultTitle = 'Good Start';
      resultMessage =
        'You have several good safety practices in place. Review the questions where you answered No and work on improving them.';
    } else if (yesAnswers >= 5) {
      resultTitle = 'Needs Improvement';
      resultMessage =
        'Some important fire-safety areas need attention. Review your No answers and make improvements where possible.';
    } else {
      resultTitle = 'High Risk Areas Identified';
      resultMessage =
        'Several areas of your fire safety need attention. Start with LPG/gas, electrical, cooking and evacuation safety.';
    }

    setResult({
      title: resultTitle,
      message: `${resultMessage}\n\nSafety score: ${yesAnswers}/${totalQuestions}`,
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🏠</Text>

        <Text style={styles.headerTitle}>
          Home Safety Check
        </Text>

        <Text style={styles.headerText}>
          Check common fire risks around your home and identify
          areas that may need attention.
        </Text>
      </View>

      {/* INTRODUCTION */}
      <View style={styles.introCard}>
        <Text style={styles.introTitle}>
          🛡️ How This Works
        </Text>

        <Text style={styles.introText}>
          Answer each question with Yes or No. At the end,
          FireReady Ghana will give you a simple safety score
          and help you identify areas that may need improvement.
        </Text>

        <Text style={styles.noteText}>
          This safety check is for preparedness and education.
          It does not replace a professional fire-safety
          inspection.
        </Text>
      </View>

      {/* SAFETY QUESTIONS */}
      {safetyQuestions.map((category) => (
        <View
          key={category.id}
          style={styles.categoryCard}
        >
          <Text style={styles.categoryTitle}>
            {category.title}
          </Text>

          {category.questions.map(
            (question, index) => {
              const selectedAnswer =
                answers[category.id]?.[index];

              return (
                <View
                  key={index}
                  style={styles.questionContainer}
                >
                  <Text style={styles.question}>
                    {question}
                  </Text>

                  <View style={styles.answerRow}>
                    {/* YES */}
                    <TouchableOpacity
                      style={[
                        styles.answerButton,
                        selectedAnswer === 'Yes' &&
                          styles.yesSelected,
                      ]}
                      activeOpacity={0.8}
                      onPress={() =>
                        chooseAnswer(
                          category.id,
                          index,
                          'Yes'
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.answerText,
                          selectedAnswer === 'Yes' &&
                            styles.selectedAnswerText,
                        ]}
                      >
                        ✓ Yes
                      </Text>
                    </TouchableOpacity>

                    {/* NO */}
                    <TouchableOpacity
                      style={[
                        styles.answerButton,
                        selectedAnswer === 'No' &&
                          styles.noSelected,
                      ]}
                      activeOpacity={0.8}
                      onPress={() =>
                        chooseAnswer(
                          category.id,
                          index,
                          'No'
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.answerText,
                          selectedAnswer === 'No' &&
                            styles.selectedAnswerText,
                        ]}
                      >
                        ✕ No
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          )}
        </View>
      ))}

      {/* CHECK SAFETY BUTTON */}
      <TouchableOpacity
        style={styles.resultsButton}
        activeOpacity={0.8}
        onPress={checkSafety}
      >
        <Text style={styles.resultsButtonText}>
          📊 CHECK MY SAFETY
        </Text>
      </TouchableOpacity>

      {/* SAFETY CHECK RESULTS */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>{result.title}</Text>
          <Text style={styles.resultMessage}>{result.message}</Text>
        </View>
      )}

      {/* EMERGENCY WARNING */}
      <View style={styles.emergencyCard}>
        <Text style={styles.emergencyTitle}>
          🚨 Active Fire?
        </Text>

        <Text style={styles.emergencyText}>
          If there is an active fire, do not spend time
          completing this safety check. Get yourself and
          others to safety and contact the Ghana National
          Fire Service on 192.
        </Text>

        <TouchableOpacity
          style={styles.emergencyButton}
          activeOpacity={0.8}
          onPress={() => router.push('/emergency')}
        >
          <Text style={styles.emergencyButtonText}>
            🚨 ENTER EMERGENCY MODE
          </Text>
        </TouchableOpacity>
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
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 28,
    backgroundColor: '#8b0000',
    alignItems: 'center',
  },

  headerIcon: {
    fontSize: 45,
  },

  headerTitle: {
    marginTop: 8,
    color: '#ffffff',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  headerText: {
    marginTop: 8,
    color: '#ffe5e5',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },

  introCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
  },

  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  introText: {
    marginTop: 8,
    color: '#555555',
    fontSize: 14,
    lineHeight: 21,
  },

  noteText: {
    marginTop: 12,
    color: '#777777',
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },

  categoryCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
  },

  categoryTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#8b0000',
    marginBottom: 15,
  },

  questionContainer: {
    marginBottom: 20,
  },

  question: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 21,
  },

  answerRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },

  answerButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#dddddd',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },

  yesSelected: {
    backgroundColor: '#187a3d',
    borderColor: '#187a3d',
  },

  noSelected: {
    backgroundColor: '#8b0000',
    borderColor: '#8b0000',
  },

  answerText: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 15,
  },

  selectedAnswerText: {
    color: '#ffffff',
  },

  resultsButton: {
    marginHorizontal: 20,
    marginTop: 5,
    paddingVertical: 17,
    borderRadius: 12,
    backgroundColor: '#8b0000',
    alignItems: 'center',
  },

  resultsButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  resultCard: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#8b0000',
    elevation: 2,
  },

  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  resultMessage: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 23,
    color: '#333333',
  },

  emergencyCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffe8e8',
  },

  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b0000',
  },

  emergencyText: {
    marginTop: 8,
    color: '#444444',
    fontSize: 14,
    lineHeight: 21,
  },

  emergencyButton: {
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#d00000',
    alignItems: 'center',
  },

  emergencyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  backButton: {
    marginHorizontal: 20,
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