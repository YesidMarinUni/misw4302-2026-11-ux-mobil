import { useState, useCallback } from 'react';
import { addSnoozeEvent, addComplianceEvent } from './cloudStore';

const DEFAULT_ALARMS = [
  {
    id: '1',
    time: '06:30',
    label: 'Rutina matutina',
    purpose: 'Comience tu día con una rutina que te prepare para el éxito. Despierta, hidrátate, muévete un poco y prepárate para un gran día.',
    enabled: true,
    days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
    progressive: false,
    progressiveMinutesBefore: 5,
    ringtone: 'Amanecer Chime',
    priority: 'Normal',
    color: '#FF6B5A',
    action: null,
    longSwipeEnabled: false,
  },
  {
    id: '2',
    time: '07:15',
    label: 'Prepárate',
    purpose: 'Prepárate para el día que tienes por delante. Sin prisa.',
    enabled: true,
    days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
    progressive: true,
    progressiveMinutesBefore: 10,
    ringtone: 'Olas Suaves',
    priority: 'Alta',
    color: '#2CCCA0',
    action: null,
    longSwipeEnabled: false,
  },
  {
    id: '3',
    time: '09:00',
    label: 'Despertar suave de fin de semana',
    purpose: 'Un comienzo tranquilo para un día libre. ¿Qué quieres hacer hoy?',
    enabled: false,
    days: ['Sa', 'Su'],
    progressive: true,
    progressiveMinutesBefore: 15,
    ringtone: 'Canto de Pájaros',
    priority: 'Baja',
    color: '#8B7FE8',
    action: { type: 'call', label: 'Llamar a mamá' },
    longSwipeEnabled: true,
  },
];

export const RINGTONES = [
  'Amanecer Chime',
  'Olas Suaves',
  'Canto de Pájaros',
  'Piano Suave',
  'Campanas de Viento',
  'Rocío de la Mañana',
  'Zumbido Clásico',
];

const PURPOSE_TEMPLATES = [
  { id: 't1', emoji: '🧘', text: 'Comience con calma: respire y estírese antes de cualquier otra cosa.' },
  { id: 't2', emoji: '💧', text: 'Hidrátese primero. Un vaso de agua antes de las pantallas.' },
  { id: 't3', emoji: '🌅', text: 'Observe la luz de la mañana. No use el teléfono durante 10 minutos.' },
  { id: 't4', emoji: '📝', text: 'Escriba una cosa por la que esté agradecido hoy.' },
  { id: 't5', emoji: '🏃', text: 'Mueva su cuerpo. Una caminata corta o una sesión de estiramiento.' },
  { id: 't6', emoji: '☕', text: 'Prepare su bebida matutina favorita con atención.' },
  { id: 't7', emoji: '🎵', text: 'Escuche algo que eleve su ánimo.' },
  { id: 't8', emoji: '🧠', text: 'Establezca una intención clara para hoy.' },
];

const SNOOZE_OPTIONS = [5, 10, 15];
const BEDTIME_SNOOZE_OPTIONS = [15, 30, 60];

export const SCREENS = {
  HOME: 'home',
  CREATE_EDIT: 'create_edit',
  PURPOSE_EDITOR: 'purpose_editor',
  ALARM_RINGING: 'alarm_ringing',
  SNOOZE_PICKER: 'snooze_picker',
  FEEDBACK: 'feedback',
  EXTRAS: 'extras',

  TAB_SLEEP: 'tab_sleep',
  TAB_MORNING: 'tab_morning',
  TAB_TOOLS: 'tab_tools',

  EXTRAS_FOCUS: 'extras_focus',
  GOOD_MORNING: 'good_morning'
};

export const ALARM_ACTIONS = [
  { type: 'call', label: 'Llamar a alguien', icon: '📞' },
  { type: 'task', label: 'Iniciar una tarea', icon: '📋' },
  { type: 'open_app', label: 'Abrir aplicación', icon: '📱' },
  { type: 'message', label: 'Enviar mensaje', icon: '💬' },
];

export const GOOD_MORNING_ACTIONS = [
  { id: 'work_route', label: 'Tráfico al trabajo', icon: '🗺️', description: 'Verifique el tráfico y la ruta', simTitle: 'Ruta al trabajo', simDetail: '25 min vía I-95 N — Tráfico ligero' },
  { id: 'open_app', label: 'Abrir aplicación', icon: '📱', description: 'Abrir una aplicación favorita', simTitle: 'Abriendo Spotify', simDetail: 'Tu Daily Mix está listo' },
  { id: 'calendar', label: 'Calendario', icon: '📅', description: 'Ver el horario de hoy', simTitle: 'Agenda de hoy', simDetail: '3 eventos — el primero a las 9:00 AM' },
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

export function useAlarmState() {
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
  const [briefingSources, setBriefingSources] = useState({
    agenda: true,
    weather: true,
    traffic: false,
    news: false,
  });

  const [goodMorningActions, setGoodMorningActions] = useState(['work_route', 'calendar']);

  const [smartSnoozeEnabled, setSmartSnoozeEnabled] = useState(false);
  const [gpsPermissionGranted, setGpsPermissionGranted] = useState(false);
  const [smartSnoozeLocation, setSmartSnoozeLocation] = useState({ name: 'Home', lat: 40.7128, lng: -74.006 });

  const navigate = useCallback((newScreen) => {
    setScreenHistory(prev => [...prev, screen]);
    setScreen(newScreen);
  }, [screen]);

  const goBack = useCallback(() => {
    setScreenHistory(prev => {
      const newHistory = [...prev];
      const previous = newHistory.pop();
      if (previous) {
        setScreen(previous);
      }
      return newHistory;
    });
  }, []);

  const goHome = useCallback(() => {
    setScreenHistory([]);
    setScreen(SCREENS.HOME);
  }, []);

  const createNewAlarm = useCallback(() => {
    const newAlarm = {
      id: Date.now().toString(),
      time: '07:00',
      label: '',
      purpose: '',
      enabled: true,
      days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
      progressive: false,
      progressiveMinutesBefore: 5,
      ringtone: 'Amanecer Chime',
      priority: 'normal',
      color: '#FF6B5A',
      action: null,
      longSwipeEnabled: false,
    };
    setEditingAlarm(newAlarm);
    navigate(SCREENS.CREATE_EDIT);
  }, [navigate]);

  const editAlarm = useCallback((alarm) => {
    setEditingAlarm({
      progressive: false,
      progressiveMinutesBefore: 5,
      ringtone: 'Amanecer Chime',
      priority: 'normal',
      color: '#FF6B5A',
      action: null,
      longSwipeEnabled: false,
      ...alarm,
    });
    navigate(SCREENS.CREATE_EDIT);
  }, [navigate]);

  const saveAlarm = useCallback(() => {
    if (!editingAlarm) return;
    setAlarms(prev => {
      const exists = prev.find(a => a.id === editingAlarm.id);
      if (exists) {
        return prev.map(a => a.id === editingAlarm.id ? editingAlarm : a);
      }
      return [...prev, editingAlarm];
    });
    setEditingAlarm(null);
    goHome();
  }, [editingAlarm, goHome]);

  const deleteAlarm = useCallback((id) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  }, []);

  const toggleAlarm = useCallback((id) => {
    setAlarms(prev => prev.map(a =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
  }, []);

  const simulateAlarm = useCallback((alarm) => {
    const target = alarm || alarms.find(a => a.enabled) || alarms[0];
    setRingingAlarm(target);
    setFadeProgress(0);
    navigate(SCREENS.ALARM_RINGING);

    const isProgressive = target.progressive;
    const speed = isProgressive ? 200 : 100;
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
      }
      setFadeProgress(progress);
    }, speed);
  }, [alarms, navigate]);

  const dismissAlarm = useCallback(() => {
    if (ringingAlarm) {
      addComplianceEvent({
        alarmId: ringingAlarm.id,
        alarmLabel: ringingAlarm.label,
        alarmTime: ringingAlarm.time,
        status: 'completed',
      });
    }

    if (briefingEnabled || goodMorningActions.length > 0) {
      navigate(SCREENS.GOOD_MORNING);
    } else {
      setFeedbackMessage('Alarma descartada. Que tenga una maravillosa mañana.');
      navigate(SCREENS.FEEDBACK);
      setTimeout(() => goHome(), 2000);
    }
  }, [navigate, goHome, ringingAlarm, briefingEnabled, goodMorningActions]);

  const snoozeAlarm = useCallback(() => {
    navigate(SCREENS.SNOOZE_PICKER);
  }, [navigate]);

  const confirmSnooze = useCallback((minutes) => {
    if (ringingAlarm) {
      addSnoozeEvent({
        alarmId: ringingAlarm.id,
        alarmLabel: ringingAlarm.label,
        alarmTime: ringingAlarm.time,
        snoozeDuration: minutes,
      });
      addComplianceEvent({
        alarmId: ringingAlarm.id,
        alarmLabel: ringingAlarm.label,
        alarmTime: ringingAlarm.time,
        status: 'snoozed',
        snoozeDuration: minutes,
      });
    }
    setFeedbackMessage(`Pospuesto por ${minutes} minutos. Descanse un poco más.`);
    navigate(SCREENS.FEEDBACK);
    setTimeout(() => goHome(), 2000);
  }, [navigate, goHome, ringingAlarm]);


  const bedtimeSnooze = useCallback((minutes) => {
    setFeedbackMessage(`Recordatorio pospuesto por ${minutes} minutos.`);
    navigate(SCREENS.FEEDBACK);
    setTimeout(() => goHome(), 2000);
  }, [navigate, goHome]);

  const bedtimeSleep = useCallback(() => {
    setFeedbackMessage('Buenas noches. Duerma bien.');
    navigate(SCREENS.FEEDBACK);
    setTimeout(() => goHome(), 2000);
  }, [navigate, goHome]);

  const bedtimeDisable = useCallback(() => {
    setFeedbackMessage('Recordatorio de hora de dormir desactivado por hoy.');
    navigate(SCREENS.FEEDBACK);
    setTimeout(() => goHome(), 2000);
  }, [navigate, goHome]);

  const openPurposeEditor = useCallback(() => {
    navigate(SCREENS.PURPOSE_EDITOR);
  }, [navigate]);

  const savePurpose = useCallback((purpose) => {
    setEditingAlarm(prev => ({ ...prev, purpose }));
    goBack();
  }, [goBack]);

  const updateEditingAlarm = useCallback((updates) => {
    setEditingAlarm(prev => ({ ...prev, ...updates }));
  }, []);

  const navigateExtras = useCallback(() => {
    setScreenHistory([]);
    setScreen(SCREENS.EXTRAS);
  }, []);

  const navigateSleep = useCallback(() => {
    setScreenHistory([]);
    setScreen(SCREENS.TAB_SLEEP);
  }, []);

  const navigateMorning = useCallback(() => {
    setScreenHistory([]);
    setScreen(SCREENS.TAB_MORNING);
  }, []);

  const navigateTools = useCallback(() => {
    setScreenHistory([]);
    setScreen(SCREENS.TAB_TOOLS);
  }, []);

  return {
    screen,
    alarms,
    editingAlarm,
    ringingAlarm,
    feedbackMessage,
    notificationsEnabled,
    fadeProgress,
    navigate,
    goBack,
    goHome,
    createNewAlarm,
    editAlarm,
    saveAlarm,
    deleteAlarm,
    toggleAlarm,
    simulateAlarm,
    dismissAlarm,
    snoozeAlarm,
    confirmSnooze,
    bedtimeSnooze,
    bedtimeSleep,
    bedtimeDisable,
    openPurposeEditor,
    savePurpose,
    updateEditingAlarm,
    setNotificationsEnabled,
    navigateExtras,
    navigateSleep,
    navigateMorning,
    navigateTools,
    bedtimeEnabled,
    setBedtimeEnabled,
    bedtimeTime,
    setBedtimeTime,
    bedtimeDays,
    setBedtimeDays,
    PURPOSE_TEMPLATES,
    SNOOZE_OPTIONS,
    BEDTIME_SNOOZE_OPTIONS,
    RINGTONES,
 
    focusModeEnabled, setFocusModeEnabled,
    focusPermissionGranted, setFocusPermissionGranted,
    blockedApps, setBlockedApps,
   
    briefingEnabled, setBriefingEnabled,
    briefingSources, setBriefingSources,

    smartSnoozeEnabled, setSmartSnoozeEnabled,
    gpsPermissionGranted, setGpsPermissionGranted,
    smartSnoozeLocation, setSmartSnoozeLocation,

    goodMorningActions, setGoodMorningActions,
  };
}
