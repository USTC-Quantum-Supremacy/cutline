all: random g4 dimension order circuit

.PHONY:random
random:random.js

.PHONY:g4
g4:CutlineInput.g4.js

.PHONY:page
page:random.js CutlineInput.g4.js

.PHONY:dimension
dimension:output/dimensionTasks.json

.PHONY:order
order:output/orders_peps.json

.PHONY:circuit
circuit:output/circuits.json

random.js: generateRandomNumber.py random_.js
	python3 generateRandomNumber.py

CutlineInput.g4.js: CutlineInput.g4
	python3 generateRandomNumber.py

output/dimensionTasks.json: generateCircuit.js random.js main.js in/generateCircuit.json in/pepsCut.json
	mkdir ../MeteorCircuit
	mkdir ../MeteorCircuit/circuit
	node generateCircuit.js

output/orders_peps.json: dimensionTasks.js main.js pepsPath.js output/dimensionTasks.json
	node dimensionTasks.js

output/circuits.json: generateCircuit.js random.js main.js in/generateCircuit.json in/pepsCut.json output/orders_peps.json
	node generateCircuit.js order
	python3 convertToXlsx.py output/circuits.json
	cp cp2circuit/* ../MeteorCircuit/
	cp output/circuits.xlsx ../MeteorCircuit/
	7z a circuit.zip ../MeteorCircuit