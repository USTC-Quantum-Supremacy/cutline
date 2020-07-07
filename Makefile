all: random.js CutlineInput.g4.js circuit.zip
random.js: random_.js generateRandomNumber.py
	python3 generateRandomNumber.py
CutlineInput.g4.js: CutlineInput.g4
	python3 generateRandomNumber.py
circuit.zip: generateCircuit.js in/generateCircuit.json
	node generateCircuit.js
	7z a circuit.zip circuit peps_path