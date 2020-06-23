


def gen(n):
    return f'''{n}

1

1

111

24 37
24 19
22 19
22 18
''',f'sycamore{n}_cut.txt'

if __name__ == "__main__":
    ns=range(37,61)
    for n in ns:
        fcontent,fname=gen(n)
        with open(fname,'w') as fid:
            fid.write(fcontent)