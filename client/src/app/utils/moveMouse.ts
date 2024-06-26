import { Ball } from '../types';
const mouseImpulse = 5;

export const moveMouse = (
  e: React.MouseEvent<HTMLCanvasElement>,
  balls: Ball[],
  setBalls: React.Dispatch<React.SetStateAction<Ball[]>>
) => {

  const canvas = e.currentTarget;
  const rect = canvas.getBoundingClientRect();

  // Получение координат мыши относительно canvas
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  balls.forEach((ball, index) => {
    const deltaX = mouseX - ball.x;
    const deltaY = mouseY - ball.y;

    // Вычисление расстояния между центром шара и курсором мыши
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Если курсор находится в пределах радиуса шара, то шар принимает от него импульс и направление
    if (distance <= ball.radius) {
      setBalls((prevBalls) => {
        const newBalls = [...prevBalls];
        if (newBalls[index].speed < mouseImpulse) {
          newBalls[index] = { ...newBalls[index], speed: mouseImpulse };
        }
        newBalls[index] = { ...newBalls[index], direction: { x: -deltaX, y: -deltaY } };
        return newBalls;
      });
    }
  });
}
