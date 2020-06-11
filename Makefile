all:
	make build
	make run1
build:
	g++ -Wall main.cc -O3 -o run
run0:
	./run demoinput.txt
run1:
	./run input1.txt
run2:
	./run input2.txt