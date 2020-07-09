all: random.js CutlineInput.g4.js output/dimensionTasks.json output/orders_peps.json circuit.zip

.PHONY:random
random:random.js

.PHONY:g4
g4:CutlineInput.g4.js

.PHONY:dimension
dimension:output/dimensionTasks.json

.PHONY:order
order:output/orders_peps.json

.PHONY:circuit
circuit:circuit.zip

random.js: generateRandomNumber.py random_.js
	python3 generateRandomNumber.py

CutlineInput.g4.js: CutlineInput.g4
	python3 generateRandomNumber.py

output/dimensionTasks.json: generateCircuit.js random.js main.js in/generateCircuit.json in/pepsCut.json
	node generateCircuit.js

output/orders_peps.json: dimensionTasks.js main.js pepsPath.js output/dimensionTasks.json
	node dimensionTasks.js

circuit.zip: generateCircuit.js random.js main.js in/generateCircuit.json in/pepsCut.json output/orders_peps.json
	node generateCircuit.js order
	7z a circuit.zip circuit peps_path
