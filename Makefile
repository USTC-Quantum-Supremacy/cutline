all:
	make random
	# make g4
	make circuit
random:
	python3 generateRandomNumber.py
g4:
	python3 generateRandomNumber.py
circuit:
	node generateCircuit.js
	7z a circuit.zip circuit peps_path