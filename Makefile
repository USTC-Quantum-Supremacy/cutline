.PHONT:all
all: page dimension order circuit circuits_xlsx

.PHONY:page
page:CutlineInput.g4.js

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
	rm -rf ../MeteorCircuit

CutlineInput.g4.js: CutlineInput.g4
	node g4tojs.js

output/dimensionTasks.json: generateCircuit.js random.js main.js in/generateCircuit.json in/pepsCut.json
	node generateCircuit.js

output/orders_peps.json: dimensionTasks.js main.js pepsPath.js output/dimensionTasks.json
	node dimensionTasks.js

output/circuits.json: generateCircuit.js random.js main.js in/generateCircuit.json in/pepsCut.json output/orders_peps.json
	node generateCircuit.js order
	python3 convertToXlsx.py output/circuits.json
	cp cp2circuit/* ../MeteorCircuit/
	cp output/circuits.xlsx ../MeteorCircuit/
	7z a circuit.zip ../MeteorCircuit

output/circuits_xlsx.json: calculateCountOfCircuit.js output/circuits.json
	node calculateCountOfCircuit.js
	python3 convertToXlsx.py output/circuits_xlsx.json
	cp cp2circuit/* ../MeteorCircuit/
	cp output/circuits_xlsx.json ../MeteorCircuit/
	cp output/circuits.xlsx ../MeteorCircuit/
	7z a circuit.zip ../MeteorCircuit