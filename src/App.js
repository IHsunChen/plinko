import logo from './logo.svg';
import './App.css';
import { useRef, useEffect, useState } from 'react';
import Matter from 'matter-js';

function App() {
  const canvasRef = useRef(null);
  const [test, setTest] = useState(0)
  const engine = Matter.Engine.create({
    gravity: { x: 0, y: 1 },
  });
  const runner = Matter.Runner.create();
  const world = engine.world;
  const group = Matter.Body.nextGroup(true);
  const width = 600
  const x_offset = 30
  const y_offset = 25.5
  const rows = 16

  const drawBalls = () => {
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= i + 2; j++) {
        const fixedCircle = Matter.Bodies.circle(width / 2 - x_offset - i * x_offset / 2 + x_offset * j, 30 + y_offset * i, 3.5, {
          isStatic: true,
          restitution: 0.8, // 設置圓形剛體的彈性為 0.5
          friction: 0.5,
          render: {
            fillStyle: 'white',
          },
        });
        Matter.World.add(world, [fixedCircle]);
      }
    }
  };

  const dropBall = () => {
    let ball = Matter.Bodies.circle(289.5654332, 0, 7, {
      isStatic: false,
      restitution: 0.8, // 設置圓形剛體的彈性為 0.5
      friction: 0.5,
      render: {
        fillStyle: 'red',
      },
      collisionFilter: {
        group: group // 將所有圓形剛體的碰撞分組設置為相同的值
      },
      mass: 2
    });
    Matter.World.add(world, [ball]);
  }

  useEffect(() => {
    drawBalls()
    const render = Matter.Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        width: width,
        height: width,
        wireframes: false,
      },
    });
    Matter.Render.run(render);

    Matter.Runner.run(runner, engine);
  }, [])
  return (
    <>
      <div ref={canvasRef} />
      <button onClick={() => dropBall()}>drop ball</button>
    </>

  );
}

export default App;
