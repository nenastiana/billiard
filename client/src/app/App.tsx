import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Ball } from './types';
import { animateBalls } from './utils/animateBalls';
import { initialBalls } from './utils/ballsData';
import { moveMouse } from './utils/moveMouse';
import { moveBalls } from './utils/moveBalls';

function App(): JSX.Element {
  const [balls, setBalls] = useState<Ball[]>(initialBalls);
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  const [selectedBallIndex, setSelectedBallIndex] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const contextRef = useRef<CanvasRenderingContext2D>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    contextRef.current = context;

    const animate = () => {
      animateBalls(balls, context, canvas);
    };
    animate();
  }, [balls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    moveMouse(e, balls, setBalls);
  };

  const handleClick = () => {
    setIsAnimationStopped(!isAnimationStopped);
    if (!isAnimationStopped) {

      setBalls(prevBalls => {
        return prevBalls.map(ball => ({ ...ball, border: null }));
      });
      setSelectedBallIndex(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const interval = isAnimationStopped ? undefined : setInterval(() => moveBalls(canvas, setBalls), 10);
  
    if (!isAnimationStopped) {
      setBalls(prevBalls => {
        return prevBalls.map(ball => ({ ...ball, border: null }));
      });
    }
  
    return () => clearInterval(interval);
  }, [isAnimationStopped]);
  

  const handleColorChange = (color: string) => {
    if (selectedBallIndex !== null) {
      setBalls(prevBalls => {
        const updatedBalls = [...prevBalls];
        updatedBalls[selectedBallIndex].color = color;
        return updatedBalls;
      });
      setSelectedColor(color);
    }
  };

  const ballClick = (index: number) => {
    if (isAnimationStopped) {
      setBalls(prevBalls => {
        const updatedBalls = prevBalls.map((ball, i) => ({
          ...ball,
          border: i === index ? '2px solid black' : null
        }));
        setSelectedBallIndex(index);
        setSelectedColor(updatedBalls[index].color);
        return updatedBalls;
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        if (context.isPointInPath(x, y)) {
          ballClick(i);
          break;
        }
      }
    }
  };

  return (
    <div>
      <div>
        <h1>billiard</h1>
        <button onClick={handleClick}>{isAnimationStopped ? 'Continue play' : 'Change balls color'}</button>

        {isAnimationStopped && selectedBallIndex !== null && (
          <div className="color-menu">
            {initialBalls.map((ball, index) => (
              <button
                key={index}
                className={`color-menu-button ${ball.color === selectedColor ? 'selected' : ''}`}
                style={{ backgroundColor: ball.color}}
                onClick={() => handleColorChange(ball.color)}
              ></button>
            ))}
          </div>
        )}
      </div>

      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleCanvasClick}
        width={600}
        height={400}
        style={{ backgroundColor: '#f0f0f0' }} 
      ></canvas>
    </div>
  );
}

export default App;