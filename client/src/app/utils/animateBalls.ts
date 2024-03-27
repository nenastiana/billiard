import { Ball } from '../types';

export function animateBalls(balls: Ball[], context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

      if (ball.border) {
        context.strokeStyle = ball.border;
        context.lineWidth = 2;
        context.stroke();
      }
      
      context.fillStyle = ball.color;
      context.fill();
    });
  }

  
