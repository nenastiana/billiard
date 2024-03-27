import { Ball } from '../types';

export const checkCollision = (ball1: Ball, ball2: Ball) => {
    const deltaX = ball1.x - ball2.x;
    const deltaY = ball1.y - ball2.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance <= ball1.radius + ball2.radius;
};