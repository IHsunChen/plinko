import logo from './logo.svg';
import './App.css';
import { useRef, useEffect, useState } from 'react';
import Matter from 'matter-js';

function App() {
  const canvasRef = useRef(null);
  const [test, setTest] = useState(0)
  const engine = Matter.Engine.create();
  const runner = Matter.Runner.create();
  const world = engine.world;

  const drawBalls = () => {
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= i + 3; j++) {
        const fixedCircle = Matter.Bodies.circle(200 + j * 20 - 10 * i, 50 + 30 * i, 4, {
          isStatic: true,
          render: {
            fillStyle: 'white',
          },
        });
        Matter.World.add(world, [fixedCircle]);
      }
    }
  };

  const dropBall = () => {
    setTest(prevState => prevState + 1)
    console.log(test)
    let ball = Matter.Bodies.circle(200, 50, 4, {
      isStatic: false,
      render: {
        fillStyle: 'red',
      },
    });
    Matter.World.add(world, [ball]);
  }

  useEffect(() => {
    drawBalls()
    const render = Matter.Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });
    Matter.Render.run(render);

    Matter.Runner.run(runner, engine);
  }, [])
  return (
    <>
      <div ref={canvasRef} />
      <button onClick={dropBall}>drop ball</button>
    </>

  );
}

export default App;
