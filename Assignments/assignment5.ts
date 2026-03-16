// Map<employeeName, [baseSalary, experience, rating]>

//Storing employee data (input)
const empData: Map<string, number[]> = new Map();
empData.set("Alice Johnson", [75000, 5, 4.2]);
empData.set("Bob Smith", [68000, 3, 3.8]);
empData.set("Carol Davis", [82000, 7, 4.5]);
empData.set("David Brown", [90000, 10, 2.0]);
empData.set("Eva Green", [60000, 2, 3.5]);


//Create empty Map to store hike percentages
const hikeMap: Map<string, number> = new Map();

// Calculate hike for each employee and store in hikeMap
for (const key of empData.keys()) {
  const data = empData.get(key)!;// get the array of values for the employee
  const baseSalary = data[0];
  const experience = data[1];
  const rating = data[2];

  const hikePercentage = calculateHike(baseSalary, experience, rating);
  hikeMap.set(key, hikePercentage);
}

console.log("Hike Percentage for each employee:");
console.log(hikeMap);


// Function to calculate hike percentage
function calculateHike(
  baseSalary: number,
  experience: number,
  rating: number
): number {
  let variablePayPercentage = 0;
  let bonus = 0;
  let reward = 0;

  if (rating >= 4) {
    variablePayPercentage = 15;
    bonus = 1500;
  } else if (rating >= 3) {
    variablePayPercentage = 10;
    bonus = 1200;
  } else {
    variablePayPercentage = 3;
    bonus = 300;
  }

  if (experience >= 5) {
    reward = 5000;
  }

  const hike =
    (baseSalary * variablePayPercentage) / 100 + bonus + reward;

  return (hike / baseSalary) * 100;
}

export {};