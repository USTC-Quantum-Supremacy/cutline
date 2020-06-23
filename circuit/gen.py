#python3 circuit/gen.py
import os
q=[37,40,45,50,55,60,66]
dd=[4,5,6,7,8]
def gen(n,d):
    return f'node /home/user/zhaouv/cutline/generateCircuit.js {d} {n} EFGH circuit/sycamore{n}_{d}_EFGH.txt'

if __name__ == "__main__":
    for n in q:
        for d in dd:
            cmd=gen(n,d)
            ss=os.popen(cmd)
            ret=ss.read()