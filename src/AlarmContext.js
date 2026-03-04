import React, { createContext, useContext, useState, useCallback } from 'react';
import { addSnoozeEvent, addComplianceEvent } from './stores/cloudStore';

export const SCREENS = {
  HOME: 'home',
  CREATE_EDIT: 'create_edit',
  PURPOSE_EDITOR: 'purpose_editor',
  ALARM_RINGING: 'alarm_ringing',
  SNOOZE_PICKER: 'snooze_picker',
  FEEDBACK: 'feedback',
  TAB_SLEEP: 'tab_sleep',
  TAB_MORNING: 'tab_morning',
  TAB_TOOLS: 'tab_tools',
  EXTRAS_FOCUS: 'extras_focus',
  GOOD_MORNING: 'good_morning'
};

export const RINGTONES = [
  'Campana del amanecer', 'Olas suaves', 'Canto de pájaros',
  'Piano suave', 'Campanas de viento', 'Rocío de la mañana', 'Vibración clásica',
];

export const ALARM_ACTIONS = [
  { type: 'call', label: 'Llamar a alguien', icon: '📞' },
  { type: 'task', label: 'Iniciar una tarea', icon: '📋' },
  { type: 'open_app', label: 'Abrir app', icon: '📱' },
  { type: 'message', label: 'Enviar mensaje', icon: '💬' },
];

export const PRIORITIES = [
  { value: 'low', label: 'Baja', color: '#8B7FE8' },
  { value: 'normal', label: 'Normal', color: '#2CCCA0' },
  { value: 'high', label: 'Alta', color: '#FF6B5A' },
  { value: 'critical', label: 'Crítica', color: '#E04535' },
];

export const ALARM_COLORS = [
  '#FF6B5A', '#2CCCA0', '#8B7FE8', '#FFD54F', '#FF8A65', '#4DB6AC', '#7986CB', '#AED581',
];

export const GOOD_MORNING_ACTIONS = [
  { id: 'work_route', label: 'Ruta al trabajo', icon: '🗺️', description: 'Ver tráfico y ruta', simTitle: 'Ruta al trabajo', simDetail: '25 min — Tráfico leve' },
  { id: 'open_app', label: 'Abrir app', icon: '📱', description: 'Abrir una app favorita', simTitle: 'Abriendo Spotify', simDetail: 'Tu mezcla diaria está lista' },
  { id: 'calendar', label: 'Calendario', icon: '📅', description: 'Ver agenda de hoy', simTitle: 'Agenda de hoy', simDetail: '3 eventos — primero a las 9:00 AM' },
];

const PURPOSE_TEMPLATES = [
  { id: 't1', emoji: '🧘', text: 'Empieza con calma — respira y estírate antes que nada.' },
  { id: 't2', emoji: '💧', text: 'Hidratate primero. Un vaso de agua antes de ver pantallas.' },
  { id: 't3', emoji: '🌅', text: 'Observa la luz de la mañana. Sin teléfono por 10 minutos.' },
  { id: 't4', emoji: '📝', text: 'Escribe una cosa por la que estés agradecido hoy.' },
  { id: 't5', emoji: '🏃', text: 'Mueve tu cuerpo. Una caminata corta o estiramientos.' },
  { id: 't6', emoji: '☕', text: 'Prepara tu bebida mañanera favorita con atención plena.' },
  { id: 't7', emoji: '🎵', text: 'Escucha algo que eleve tu ánimo.' },
  { id: 't8', emoji: '🧠', text: 'Establece una intención clara para hoy.' },
];

const SNOOZE_OPTIONS = [5, 10, 15];
const BEDTIME_SNOOZE_OPTIONS = [15, 30, 60];
const PROGRESSIVE_OPTIONS = [3, 5, 10, 15, 20, 30];

const DEFAULT_ALARMS = [
  { id: '1', time: '06:30', label: 'Rutina matutina', purpose: 'Empieza el día con intención — estírate, respira, hidratate.', enabled: true, days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'], progressive: false, progressiveMinutesBefore: 5, ringtone: 'Campana del amanecer', priority: 'Normal', color: '#FF6B5A', action: null, longSwipeEnabled: false },
  { id: '2', time: '07:15', label: 'Prepárate', purpose: 'Es hora de prepararse para el día. Sin prisas.', enabled: true, days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'], progressive: true, progressiveMinutesBefore: 10, ringtone: 'Olas suaves', priority: 'Alta', color: '#2CCCA0', action: null, longSwipeEnabled: false },
  { id: '3', time: '09:00', label: 'Despertar suave de fin de semana', purpose: 'Un inicio tranquilo de un día libre. ¿Qué quieres hoy?', enabled: false, days: ['Sa', 'Do'], progressive: true, progressiveMinutesBefore: 15, ringtone: 'Canto de pájaros', priority: 'Baja', color: '#8B7FE8', action: { type: 'call', label: 'Llamar a mamá' }, longSwipeEnabled: true },
];
const AlarmContext = createContext(null);

export function AlarmProvider({ children, onLogout }) {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [alarms, setAlarms] = useState(DEFAULT_ALARMS);
  const [editingAlarm, setEditingAlarm] = useState(null);
  const [ringingAlarm, setRingingAlarm] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fadeProgress, setFadeProgress] = useState(0);
  const [screenHistory, setScreenHistory] = useState([]);

  const [bedtimeEnabled, setBedtimeEnabled] = useState(true);
  const [bedtimeTime, setBedtimeTime] = useState('22:30');
  const [bedtimeDays, setBedtimeDays] = useState(['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Do']);

  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const [focusPermissionGranted, setFocusPermissionGranted] = useState(false);
  const [blockedApps, setBlockedApps] = useState(['Instagram', 'TikTok', 'Twitter/X']);

  const [briefingEnabled, setBriefingEnabled] = useState(false);
  const [briefingSources, setBriefingSources] = useState({ agenda: true, weather: true, traffic: false, news: false });

  const [goodMorningActions, setGoodMorningActions] = useState(['work_route', 'calendar']);

  const [smartSnoozeEnabled, setSmartSnoozeEnabled] = useState(false);
  const [gpsPermissionGranted, setGpsPermissionGranted] = useState(false);
  const [smartSnoozeLocation, setSmartSnoozeLocation] = useState({ name: 'Casa', lat: 40.7128, lng: -74.006 });

  const navigate = useCallback((newScreen) => {
    setScreenHistory(prev => [...prev, screen]);
    setScreen(newScreen);
  }, [screen]);

  const goBack = useCallback(() => {
    setScreenHistory(prev => {
      const next = [...prev];
      const previous = next.pop();
      if (previous) setScreen(previous);
      return next;
    });
  }, []);

  const goHome = useCallback(() => {
    setScreenHistory([]);
    setScreen(SCREENS.HOME);
  }, []);

  const createNewAlarm = useCallback(() => {
    setEditingAlarm({ id: Date.now().toString(), time: '07:00', label: '', purpose: '', enabled: true, days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'], progressive: false, progressiveMinutesBefore: 5, ringtone: 'Campana del amanecer', priority: 'normal', color: '#FF6B5A', action: null, longSwipeEnabled: false });
    navigate(SCREENS.CREATE_EDIT);
  }, [navigate]);

  const editAlarm = useCallback((alarm) => {
    setEditingAlarm({ progressive: false, progressiveMinutesBefore: 5, ringtone: 'Campana del amanecer', priority: 'normal', color: '#FF6B5A', action: null, longSwipeEnabled: false, ...alarm });
    navigate(SCREENS.CREATE_EDIT);
  }, [navigate]);

  const saveAlarm = useCallback(() => {
    if (!editingAlarm) return;
    setAlarms(prev => {
      const exists = prev.find(a => a.id === editingAlarm.id);
      return exists ? prev.map(a => a.id === editingAlarm.id ? editingAlarm : a) : [...prev, editingAlarm];
    });
    setEditingAlarm(null);
    goHome();
  }, [editingAlarm, goHome]);

  const deleteAlarm = useCallback((id) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  }, []);

  const toggleAlarm = useCallback((id) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  }, []);

  const updateEditingAlarm = useCallback((updates) => {
    setEditingAlarm(prev => ({ ...prev, ...updates }));
  }, []);

  const simulateAlarm = useCallback((alarm) => {
    const target = alarm || alarms.find(a => a.enabled) || alarms[0];
    setRingingAlarm(target);
    setFadeProgress(0);
    navigate(SCREENS.ALARM_RINGING);
    let progress = 0;
    const speed = target?.progressive ? 200 : 100;
    const interval = setInterval(() => {
      progress += 2;
      if (progress >= 100) { clearInterval(interval); progress = 100; }
      setFadeProgress(progress);
    }, speed);
  }, [alarms, navigate]);

  const dismissAlarm = useCallback(() => {
    if (ringingAlarm) {
      addComplianceEvent({ alarmId: ringingAlarm.id, alarmLabel: ringingAlarm.label, alarmTime: ringingAlarm.time, status: 'completed' });
    }
    if (briefingEnabled || goodMorningActions.length > 0) {
      navigate(SCREENS.GOOD_MORNING);
    } else {
      setFeedbackMessage('Alarma desactivada. ¡Que tengas una mañana maravillosa!');
      navigate(SCREENS.FEEDBACK);
      setTimeout(() => goHome(), 2000);
    }
  }, [navigate, goHome, ringingAlarm, briefingEnabled, goodMorningActions]);

  const snoozeAlarm = useCallback(() => { navigate(SCREENS.SNOOZE_PICKER); }, [navigate]);

  const confirmSnooze = useCallback((minutes) => {
    if (ringingAlarm) {
      addSnoozeEvent({ alarmId: ringingAlarm.id, alarmLabel: ringingAlarm.label, alarmTime: ringingAlarm.time, snoozeDuration: minutes });
      addComplianceEvent({ alarmId: ringingAlarm.id, alarmLabel: ringingAlarm.label, alarmTime: ringingAlarm.time, status: 'snoozed', snoozeDuration: minutes });
    }
    setFeedbackMessage(`Pospuesta ${minutes} minutos. Descansa un poco más.`);
    navigate(SCREENS.FEEDBACK);
    setTimeout(() => goHome(), 2000);
  }, [navigate, goHome, ringingAlarm]);

  const bedtimeSnooze = useCallback((minutes) => {
    setFeedbackMessage(`Recordatorio pospuesto ${minutes} minutos.`);
    navigate(SCREENS.FEEDBACK);
    setTimeout(() => goHome(), 2000);
  }, [navigate, goHome]);
  const bedtimeSleep = useCallback(() => {
    setFeedbackMessage('Buenas noches. Que descanses.');
    navigate(SCREENS.FEEDBACK);
    setTimeout(() => goHome(), 2000);
  }, [navigate, goHome]);
  const bedtimeDisable = useCallback(() => {
    setFeedbackMessage('Recordatorio nocturno desactivado por hoy.');
    navigate(SCREENS.FEEDBACK);
    setTimeout(() => goHome(), 2000);
  }, [navigate, goHome]);

  const openPurposeEditor = useCallback(() => { navigate(SCREENS.PURPOSE_EDITOR); }, [navigate]);
  const savePurpose = useCallback((purpose) => {
    setEditingAlarm(prev => ({ ...prev, purpose }));
    goBack();
  }, [goBack]);

  const navigateSleep = useCallback(() => { setScreenHistory([]); setScreen(SCREENS.TAB_SLEEP); }, []);
  const navigateMorning = useCallback(() => { setScreenHistory([]); setScreen(SCREENS.TAB_MORNING); }, []);
  const navigateTools = useCallback(() => { setScreenHistory([]); setScreen(SCREENS.TAB_TOOLS); }, []);

  const value = {
    screen,
    alarms,
    editingAlarm,
    ringingAlarm,
    feedbackMessage,
    notificationsEnabled,
    fadeProgress,
    PROGRESSIVE_OPTIONS,
    PURPOSE_TEMPLATES,
    SNOOZE_OPTIONS,
    BEDTIME_SNOOZE_OPTIONS,
    navigate,
    goBack,
    goHome,
    createNewAlarm,
    editAlarm,
    saveAlarm,
    deleteAlarm,
    toggleAlarm,
    updateEditingAlarm,
    simulateAlarm,
    dismissAlarm,
    snoozeAlarm,
    confirmSnooze,
    bedtimeSnooze,
    bedtimeSleep,
    bedtimeDisable,
    openPurposeEditor,
    savePurpose,
    setNotificationsEnabled,
    navigateSleep,
    navigateMorning,
    navigateTools,
    bedtimeEnabled, setBedtimeEnabled,
    bedtimeTime, setBedtimeTime,
    bedtimeDays, setBedtimeDays,
    focusModeEnabled, setFocusModeEnabled,
    focusPermissionGranted, setFocusPermissionGranted,
    blockedApps, setBlockedApps,
    briefingEnabled, setBriefingEnabled,
    briefingSources, setBriefingSources,
    goodMorningActions, setGoodMorningActions,
    smartSnoozeEnabled, setSmartSnoozeEnabled,
    gpsPermissionGranted, setGpsPermissionGranted,
    smartSnoozeLocation, setSmartSnoozeLocation,
    onLogout,
  };

  return <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>;
}

export function useAlarm() {
  const ctx = useContext(AlarmContext);
  if (!ctx) throw new Error('useAlarm must be used inside AlarmProvider');
  return ctx;
}
