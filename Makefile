all:
	make build
	make run
build:
	g++ -Wall main.cc -O3 -o run
run:
	run demoinput.txt