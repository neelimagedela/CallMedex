export const scanDatabase = {

  cardiology: [

    {
      id:"ecg",
      name:"ECG",
      subtitle:"Electrocardiogram",
      price:350,
      oldPrice:700,
      icon:"📈",

      instructions:[
        "No fasting required",
        "Avoid lotion on chest",
        "Wear comfortable clothes"
      ]
    },

    {
      id:"echo",
      name:"2D ECHO",
      subtitle:"Echocardiography",
      price:900,
      oldPrice:1800,
      icon:"🩺",

      instructions:[
        "No preparation needed",
        "Carry previous reports",
        "Wear loose clothing"
      ]
    },

    {
      id:"tmt",
      name:"TMT",
      subtitle:"Treadmill Stress Test",
      price:1200,
      oldPrice:2400,
      icon:"🏃",

      instructions:[
        "Avoid heavy meals",
        "Wear sports shoes",
        "Avoid smoking"
      ]
    },

    {
      id:"trop",
      name:"TROP I/T",
      subtitle:"Troponin I & T Test",
      price:600,
      oldPrice:1200,
      icon:"🧬",

      instructions:[
        "Blood sample required",
        "Hydrate properly",
        "Carry prescription"
      ]
    }

  ],

  radiology:[

    {
      id:"mri",
      name:"MRI",
      subtitle:"Magnetic Resonance Imaging",
      price:4500,
      oldPrice:6000,
      icon:"🧲",

      instructions:[
        "Remove metal items",
        "Inform implants",
        "Carry reports"
      ]
    }

  ]

};