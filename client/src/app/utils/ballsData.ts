import { Ball } from '../types';

export const initialSpeed = 0;

export const initialBalls: Ball[] = [
  { x: 100, y: 100, radius: 40, color: '#FF0000', speed: initialSpeed, direction: {x: 0, y: 0}},
  { x: 200, y: 200, radius: 40, color: '#00FF00', speed: initialSpeed, direction: {x: 0, y: 0}},
  { x: 300, y: 300, radius: 50, color: '#0000FF', speed: initialSpeed, direction: {x: 0, y: 0}},
  { x: 400, y: 100, radius: 35, color: '#FFFF00', speed: initialSpeed, direction: {x: 0, y: 0}},
  { x: 450, y: 350, radius: 45, color: '#FFA500', speed: initialSpeed, direction: {x: 0, y: 0}},
  { x: 150, y: 350, radius: 30, color: '#800080', speed: initialSpeed, direction: {x: 0, y: 0}},
  { x: 250, y: 100, radius: 55, color: '#008000', speed: initialSpeed, direction: {x: 0, y: 0}},
  { x: 350, y: 200, radius: 25, color: '#00FFFF', speed: initialSpeed, direction: {x: 0, y: 0}},
];


