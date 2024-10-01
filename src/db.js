const stocks = [
    {
      "itemName": "Leather Jacket",
      "itemCode": "CODE1",
      "price": "199.99",
      "stock": 72
    },
    {
      "itemName": "Smartphone",
      "itemCode": "CODE2",
      "price": "799.99",
      "stock": 54
    },
    {
      "itemName": "Bluetooth Headphones",
      "itemCode": "CODE3",
      "price": "129.45",
      "stock": 39
    },
    {
      "itemName": "Electric Toothbrush",
      "itemCode": "CODE4",
      "price": "66.53",
      "stock": 18
    },
    {
      "itemName": "Coffee Maker",
      "itemCode": "CODE5",
      "price": "99.12",
      "stock": 95
    },
    {
      "itemName": "Gaming Mouse",
      "itemCode": "CODE6",
      "price": "39.97",
      "stock": 68
    },
    {
      "itemName": "Laptop",
      "itemCode": "CODE7",
      "price": "1499.99",
      "stock": 87
    },
    {
      "itemName": "Smartwatch",
      "itemCode": "CODE8",
      "price": "299.78",
      "stock": 61
    },
    {
      "itemName": "Digital Camera",
      "itemCode": "CODE9",
      "price": "899.42",
      "stock": 32
    },
    {
      "itemName": "Electric Kettle",
      "itemCode": "CODE10",
      "price": "82.10",
      "stock": 20
    },
    {
      "itemName": "Portable Charger",
      "itemCode": "CODE11",
      "price": "24.56",
      "stock": 77
    },
    {
      "itemName": "Air Fryer",
      "itemCode": "CODE12",
      "price": "77.68",
      "stock": 11
    },
    {
      "itemName": "Bluetooth Speaker",
      "itemCode": "CODE13",
      "price": "56.43",
      "stock": 88
    },
    {
      "itemName": "Smart Thermostat",
      "itemCode": "CODE14",
      "price": "199.92",
      "stock": 52
    },
    {
      "itemName": "Vacuum Cleaner",
      "itemCode": "CODE15",
      "price": "299.12",
      "stock": 84
    },
    {
      "itemName": "Wireless Keyboard",
      "itemCode": "CODE16",
      "price": "87.99",
      "stock": 63
    },
    {
      "itemName": "Tablet",
      "itemCode": "CODE17",
      "price": "349.51",
      "stock": 29
    },
    {
      "itemName": "Smart Light Bulb",
      "itemCode": "CODE18",
      "price": "60.64",
      "stock": 74
    },
    {
      "itemName": "Blender",
      "itemCode": "CODE19",
      "price": "15.38",
      "stock": 40
    },
    {
      "itemName": "Electric Grill",
      "itemCode": "CODE20",
      "price": "48.89",
      "stock": 47
    },
    {
      "itemName": "Refrigerator",
      "itemCode": "CODE21",
      "price": "999.77",
      "stock": 59
    },
    {
      "itemName": "Hair Dryer",
      "itemCode": "CODE22",
      "price": "70.84",
      "stock": 85
    },
    {
      "itemName": "Dishwasher",
      "itemCode": "CODE23",
      "price": "799.67",
      "stock": 90
    },
    {
      "itemName": "Electric Fan",
      "itemCode": "CODE24",
      "price": "26.42",
      "stock": 34
    },
    {
      "itemName": "Slow Cooker",
      "itemCode": "CODE25",
      "price": "94.16",
      "stock": 66
    },
    {
      "itemName": "Toaster Oven",
      "itemCode": "CODE26",
      "price": "37.75",
      "stock": 55
    },
    {
      "itemName": "Food Processor",
      "itemCode": "CODE27",
      "price": "92.53",
      "stock": 20
    },
    {
      "itemName": "Electric Pressure Cooker",
      "itemCode": "CODE28",
      "price": "78.19",
      "stock": 76
    },
    {
      "itemName": "Cordless Drill",
      "itemCode": "CODE29",
      "price": "61.12",
      "stock": 62
    },
    {
      "itemName": "Space Heater",
      "itemCode": "CODE30",
      "price": "11.67",
      "stock": 53
    },
    {
      "itemName": "Air Purifier",
      "itemCode": "CODE31",
      "price": "43.89",
      "stock": 39
    },
    {
      "itemName": "Home Security Camera",
      "itemCode": "CODE32",
      "price": "57.32",
      "stock": 71
    },
    {
      "itemName": "Electric Blanket",
      "itemCode": "CODE33",
      "price": "79.50",
      "stock": 49
    },
    {
      "itemName": "Stand Mixer",
      "itemCode": "CODE34",
      "price": "85.96",
      "stock": 90
    },
    {
      "itemName": "Pressure Washer",
      "itemCode": "CODE35",
      "price": "14.60",
      "stock": 65
    },
    {
      "itemName": "Smart Doorbell",
      "itemCode": "CODE36",
      "price": "68.11",
      "stock": 82
    },
    {
      "itemName": "Sofa",
      "itemCode": "CODE37",
      "price": "52.30",
      "stock": 48
    },
    {
      "itemName": "Washing Machine",
      "itemCode": "CODE38",
      "price": "29.24",
      "stock": 28
    },
    {
      "itemName": "Microwave Oven",
      "itemCode": "CODE39",
      "price": "91.67",
      "stock": 84
    },
    {
      "itemName": "Cookware Set",
      "itemCode": "CODE40",
      "price": "67.88",
      "stock": 77
    },
    {
      "itemName": "Treadmill",
      "itemCode": "CODE41",
      "price": "96.51",
      "stock": 33
    },
    {
      "itemName": "Coffee Grinder",
      "itemCode": "CODE42",
      "price": "58.44",
      "stock": 60
    },
    {
      "itemName": "Electric Toothbrush",
      "itemCode": "CODE43",
      "price": "35.90",
      "stock": 93
    },
    {
      "itemName": "Luggage Set",
      "itemCode": "CODE44",
      "price": "40.12",
      "stock": 22
    },
    {
      "itemName": "Dish Rack",
      "itemCode": "CODE45",
      "price": "76.65",
      "stock": 79
    },
    {
      "itemName": "Wine Cooler",
      "itemCode": "CODE46",
      "price": "23.80",
      "stock": 50
    },
    {
      "itemName": "Food Dehydrator",
      "itemCode": "CODE47",
      "price": "52.77",
      "stock": 21
    },
    {
      "itemName": "Electric Skillet",
      "itemCode": "CODE48",
      "price": "31.98",
      "stock": 38
    },
    {
      "itemName": "Air Conditioner",
      "itemCode": "CODE49",
      "price": "87.11",
      "stock": 42
    },
    {
      "itemName": "Portable Air Conditioner",
      "itemCode": "CODE50",
      "price": "65.55",
      "stock": 69
    }
  ];
  
  export default stocks;
