const DEFAULT_STORE = {
  postIts: [
    { id: 'p1', text: 'Eres capaz de cosas increíbles.', color: '#FF6B5A', tags: ['motivación'] },
    { id: 'p2', text: 'Hoy es un nuevo comienzo. ¡Aprovéchalo!', color: '#2CCCA0', tags: ['mañana'] },
    { id: 'p3', text: 'Los pequeños pasos conducen a grandes cambios.', color: '#8B7FE8', tags: ['motivación'] },
  ],
  snoozeEvents: [],
  complianceEvents: [],
};

let store = { ...DEFAULT_STORE };

export function getCloudStore() {
  return store;
}

export function addSnoozeEvent(event) {
  store.snoozeEvents = [...store.snoozeEvents, { ...event, timestamp: new Date().toISOString() }];
}

export function addComplianceEvent(event) {
  store.complianceEvents = [...store.complianceEvents, { ...event, timestamp: new Date().toISOString() }];
}

export function addPostIt(postIt) {
  store.postIts = [...store.postIts, postIt];
}

export function deletePostIt(id) {
  store.postIts = store.postIts.filter(p => p.id !== id);
}
