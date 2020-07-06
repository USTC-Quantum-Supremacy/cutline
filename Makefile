all:
	make build
	make run1
build:
	g++ -Wall main.cc -O3 -o run
	g++ -Wall mainall.cc -O3 -o run2
run0:
	./run demoinput.txt
run1:
	./run input1.txt
	./run2 input1.txt
run2:
	./run input2.txt
run3:
	./run2 input3.txt
win:
	python3 generateRandomNumber.py
linux:
	python3 generateRandomNumber.py
	node generateCircuit.js
	7z a circuit.zip circuit peps_path