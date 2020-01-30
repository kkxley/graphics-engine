const Cube = [
    {
      fill: 'red', //перед
      vertex: [
        { x: 10, y: 10, z: 250 },
        { x: 10, y: 250, z: 250 },
        { x: 250, y: 250, z: 250 },
        { x: 250, y: 10, z: 250 }
      ],
      normal: 1
    },
    {
      fill: 'blue', //низ
      vertex: [
        { x: 10, y: 250, z: 10 },
        { x: 10, y: 250, z: 250 },
        { x: 250, y: 250, z: 250 },
        { x: 250, y: 250, z: 10 }
      ],
      normal: -1
    },
    {
      fill: 'green',
      vertex: [
        { x: 10, y: 10, z: 10 },
        { x: 10, y: 10, z: 250 },
        { x: 10, y: 250, z: 250 },
        { x: 10, y: 250, z: 10 }
      ],
      normal: -1
    },
    {
      fill: 'pink', //вверх
      vertex: [
        { x: 10, y: 10, z: 10 },
        { x: 250, y: 10, z: 10 },
        { x: 250, y: 10, z: 250 },
        { x: 10, y: 10, z: 250 }
      ],
      normal: -1
    },
    {
      fill: 'yellow', //право
      vertex: [
        { x: 250, y: 10, z: 10 },
        { x: 250, y: 10, z: 250 },
        { x: 250, y: 250, z: 250 },
        { x: 250, y: 250, z: 10 }
      ],
      normal: 1
    },
    {
      fill: 'orange', //зад
      vertex: [
        { x: 10, y: 10, z: 10 },
        { x: 250, y: 10, z: 10 },
        { x: 250, y: 250, z: 10 },
        { x: 10, y: 250, z: 10 }
      ],
      normal: 1
    }
  ];

  export default Cube;