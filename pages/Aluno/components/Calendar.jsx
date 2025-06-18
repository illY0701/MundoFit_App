// ── CALENDÁRIO SEMANAL ─────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles';

const Calendar = ({ week, selected, onToggle, completedWorkouts, onNextWeek, onPrevWeek }) => {
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <View>
      {/* Adicione controles de navegação */}
      <View style={styles.weekNavigation}>
        <TouchableOpacity onPress={onPrevWeek} style={styles.navButton}>
          <Text style={styles.navButtonText}>{"<"}</Text>
        </TouchableOpacity>
        
        <Text style={styles.weekTitle}>
          {`Semana ${week[0].getDate()}/${week[0].getMonth()+1} - ${week[6].getDate()}/${week[6].getMonth()+1}`}
        </Text>
        
        <TouchableOpacity onPress={onNextWeek} style={styles.navButton}>
          <Text style={styles.navButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarScroll}>
        <View style={styles.calendarContainer}>
          {week.map((date) => {
            const key = date.toISOString().split('T')[0];
            const sel = !!selected[key];
            const weekDay = diasSemana[date.getDay()];
            const day = date.getDate();

            return (
              <TouchableOpacity
                key={key}
                onPress={() => onToggle(key)}
                style={[
                  styles.dayContainer,
                  sel && styles.selectedDay,
                  completedWorkouts[key] && styles.completedWorkoutDay,
                ]}
              >
                <Text style={[
                  styles.weekDayText,
                  sel && styles.selectedDayText,
                  completedWorkouts[key] && styles.completedWorkoutDayText,
                ]}>
                  {weekDay}
                </Text>
                <Text style={[
                  styles.dayText,
                  sel && styles.selectedDayText,
                  completedWorkouts[key] && styles.completedWorkoutDayText,
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default Calendar;
