import * as Phaser from 'phaser';

// use phasers event system to send events
export const EVENT_BUS = new Phaser.Events.EventEmitter();

export const CUSTOM_EVENTS = {
  OPENED_CHEST: 'OPENED_CHEST',
} as const;
