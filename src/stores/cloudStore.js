const DEFAULT_STORE = {
  snoozeEvents: [],
  complianceEvents: [],
};

let store = { ...DEFAULT_STORE };

export function addSnoozeEvent(event) {
  store.snoozeEvents = [...store.snoozeEvents, { ...event, timestamp: new Date().toISOString() }];
}

export function addComplianceEvent(event) {
  store.complianceEvents = [...store.complianceEvents, { ...event, timestamp: new Date().toISOString() }];
}
