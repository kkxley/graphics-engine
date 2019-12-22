const Cube = [
    {
      fill: 'red', //перед
      vertex: [
        { x: 0, y: 0, z: 250 },
        { x: 0, y: 250, z: 250 },
        { x: 250, y: 250, z: 250 },
        { x: 250, y: 0, z: 250 }
      ],
      normal: 1
    },
    {
      fill: 'blue', //низ
      vertex: [
        { x: 0, y: 250, z: 0 },
        { x: 0, y: 250, z: 250 },
        { x: 250, y: 250, z: 250 },
        { x: 250, y: 250, z: 0 }
      ],
      normal: -1
    },
    {
      fill: 'green',
      vertex: [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 250 },
        { x: 0, y: 250, z: 250 },
        { x: 0, y: 250, z: 0 }
      ],
      normal: -1
    },
    {
      fill: 'pink', //вверх
      vertex: [
        { x: 0, y: 0, z: 0 },
        { x: 250, y: 0, z: 0 },
        { x: 250, y: 0, z: 250 },
        { x: 0, y: 0, z: 250 }
      ],
      normal: -1
    },
    {
      fill: 'yellow', //право
      vertex: [
        { x: 250, y: 0, z: 0 },
        { x: 250, y: 0, z: 250 },
        { x: 250, y: 250, z: 250 },
        { x: 250, y: 250, z: 0 }
      ],
      normal: 1
    },
    {
      fill: 'orange', //зад
      vertex: [
        { x: 0, y: 0, z: 0 },
        { x: 250, y: 0, z: 0 },
        { x: 250, y: 250, z: 0 },
        { x: 0, y: 250, z: 0 }
      ],
      normal: 1
    }
  ];

  export default Cube;