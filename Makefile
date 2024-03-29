.PHONT:all
all: page dimension order circuit circuits_xlsx

.PHONY:page
page:CutlineInput.js

.PHONY:dimension
dimension:output/dimensionTasks.json

.PHONY:order
order:output/orders_peps.json

.PHONY:circuit
circuit:output/circuits.json

.PHONY:circuits_xlsx
circuits_xlsx:output/circuits_xlsx.json

.PHONT:clean_circuit
clean_circuit:
	rm -f circuit.zip
	rm -f ../MeteorCircuit/circuits_xlsx.json
	rm -f ../MeteorCircuit/circuits.xlsx
	rm -rf ../MeteorCircuit/circuit

CutlineInput.js: CutlineInput.g4 g4tojs.js
	node g4tojs.js

output/dimensionTasks.json: generateCircuit.js random.js main.js in/generateCircuit.json in/pepsCut.json
	node generateCircuit.js

output/orders_peps.json: dimensionTasks.js main.js pepsPath.js output/dimensionTasks.json
	node dimensionTasks.js

output/circuits.json: generateCircuit.js random.js main.js in/generateCircuit.json in/pepsCut.json output/orders_peps.json
	node generateCircuit.js order

output/circuits_xlsx.json: calculateCountOfCircuit.js output/circuits.json
	node calculateCountOfCircuit.js
	python3 convertToXlsx.py output/circuits_xlsx.json
	cp output/circuits_xlsx.json ../MeteorCircuit/
	cp output/circuits.xlsx ../MeteorCircuit/
	7z a circuit.zip ../MeteorCircuit

.PHONT:counterorder
counterorder:
	node generateCircuit.js
	node generateCircuit.js counterorder
	node calculateCountOfCircuit.js
	python3 convertToXlsx.py output/circuits_xlsx.json
	cp output/circuits_xlsx.json ../MeteorCircuit/
	cp output/circuits.xlsx ../MeteorCircuit/
	7z a circuit.zip ../MeteorCircuit