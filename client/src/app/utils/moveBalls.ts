import { Ball } from '../types';
import { checkCollision } from './checkCollision';

export const moveBalls = ( canvas: HTMLCanvasElement, setBalls: React.Dispatch<React.SetStateAction<Ball[]>> ) => {
  setBalls((prevBalls) => {
    return prevBalls.map((ball, index) => {
      let newBall = { ...ball };
      
        // Двигаем шар
        let newX = ball.x;
        let newY = ball.y;
        
        const distance = Math.sqrt(ball.direction.x * ball.direction.x + ball.direction.y * ball.direction.y);
        if (distance) {
          newX = ball.x + ball.direction.x / distance * ball.speed;
          newY = ball.y + ball.direction.y / distance * ball.speed;
        }

        let newDirectionX = ball.direction.x;
        let newDirectionY = ball.direction.y;
        let newSpeed = ball.speed;

        // Проверяем столкновения с границами холста
        if (newX < ball.radius || newX > canvas.width - ball.radius) {
          newDirectionX *= -1;
          newX = newX < ball.radius ? ball.radius : canvas.width - ball.radius;
          newSpeed -= 0.5;
        }

        if (newY < ball.radius || newY > canvas.height - ball.radius) {
          newDirectionY *= -1;
          newY = newY < ball.radius ? ball.radius : canvas.height - ball.radius;
          newSpeed -= 0.5;
        }
        
        let collised = false
        prevBalls.forEach((otherBall, otherIndex) => {
          if (index !== otherIndex && checkCollision(ball, otherBall)) {

            newSpeed = Math.max(newSpeed, otherBall.speed);
            collised = true;
            const directionToOtherX = otherBall.x - ball.x;
            const directionToOtherY = otherBall.y - ball.y;
            newDirectionX = -directionToOtherX;
            newDirectionY = -directionToOtherY;
          }
        });

        if (collised) {
          newSpeed -= 0.25
        }

        newSpeed = newSpeed < 0 ? 0 : newSpeed;

        newBall = {
          ...newBall,
          x: newX,
          y: newY,
          speed: newSpeed,
          direction: { x: newDirectionX, y: newDirectionY }
        };
      
      return newBall;
    });
  });
}
