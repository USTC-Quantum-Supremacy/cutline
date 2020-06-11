all:
	make build
	make run2
build:
	g++ -Wall main.cc -O3 -o run
run:
	./run demoinput.txt
run2:
	./run input1.txt