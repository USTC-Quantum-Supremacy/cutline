# [markdown]
# ## export and import

from math import pi,ceil,floor
import json
import re
import os
__all__ = [

    'getSimulation',
    'reRenderSimulationFile',

    'setFSIMTime',
    'getCircuit',

    'g',
]
# from openpyxl import load_workbook

# [markdown]
# ## definition

ThisPath = os.path.split(os.path.realpath(__file__))[0]

# def readXlsx(filename):
#     wb = load_workbook(filename = filename)
#     ws = wb[wb.sheetnames[0]]
#     data = ws.values
#     return list(data)


def toQLength(s):
    return ('{:0>'+str(g.QNameLength)+'}').format(s)


def build_info():
    class InfoClass:
        def pos(self, index):
            return self.circuitIndexes.index(index)

        def get(self, index, field):
            return self.data[self.pos(index)][self.fields.index(field)]

        def filtTarget(self, target):
            indexes = []
            for ii, line in enumerate(self.data, 1):
                if self.get(ii, 'seedIndex') == 0 and re.search('(^|_)'+target+'(_|$)', self.get(ii, 'targets')):
                    indexes.append(ii)
            return indexes
        
        def filtTargetAllSeed(self, target):
            indexes = []
            for ii, line in enumerate(self.data, 1):
                if re.search('(^|_)'+target+'(_|$)', self.get(ii, 'targets')):
                    indexes.append(ii)
            return indexes
    Info = InfoClass()
    # data=readXlsx(ThisPath+'/circuits.xlsx')
    with open(ThisPath+'/circuits_xlsx.json', 'r', encoding='utf-8') as fid:
        data = json.load(fid)['data'][0]
    Info.fields = data[0]
    Info.data = data[1:]
    Info.circuitIndexes = [
        line[Info.fields.index('circuitIndex')] for line in Info.data]
    return Info


Info = build_info()

def getPatternIndex(gatestr):
    x=re.search(r'(\d+)_(\d+)',gatestr)
    name1 = 'G'+toQLength(x.group(1))+toQLength(x.group(2))
    name2 = 'G'+toQLength(x.group(2))+toQLength(x.group(1))
    for ii in range(4):
        if name1 in g.fsimList[ii]:
            return ii
        if name2 in g.fsimList[ii]:
            return ii
    return 0

def fillFSIM(src):
    m = re.match(r"((?:[XY].*\n)+)", src)
    qubits = {line.split(' ')[1][1:]: 1 for line in m.group(
        1).strip().split('\n')}

    def repl(subm):
        qubits2 = dict(qubits)
        output = [subm.group(1)]
        pi = getPatternIndex(subm.group(1))
        for line in subm.group(1).strip().split('\n'):
            m2 = re.match(r"FSIM G(\d+)_(\d+) ", line)
            qubits2[m2.group(1)] = 2
            qubits2[m2.group(2)] = 2
        for k, v in qubits2.items():
            if v == 1:
                output.append(f"I Q{k} {g.FSIMTime[pi]}\n")
        return ''.join(output)
    out = re.sub(r"((?:[F].*\n)+)", repl, src)
    return out


def appendMeasure(src):
    m = re.match(r"((?:[XY].*\n)+)", src)
    qubits = [line.split(' ')[1][1:]
              for line in m.group(1).strip().split('\n')]
    measurementPart = ''.join(['\nMEASURE Q'+qi for qi in qubits])
    out = src+measurementPart
    return out


def fixFsimIndex(src):
    def repl(subm):
        pi = getPatternIndex(subm.group(1))
        return subm.group(1)+' '+str(g.fsimI[pi])
    out = re.sub(r'(FSIM \w+) 0', repl, src)
    return out


def fixQuantumName(src):
    def singleName(x):
        return 'Q'+toQLength(x.group(1))
    fsimList = []
    for fi in g.fsimList:
        fsimList+=fi
    def doubleName(x):
        name1 = 'G'+toQLength(x.group(1))+toQLength(x.group(2))
        name2 = 'G'+toQLength(x.group(2))+toQLength(x.group(1))
        name = name1
        if name2 in fsimList:
            name = name2
        return name
    p1 = re.sub(r'Q(\d+)\b', singleName, src)
    p2 = re.sub(r'G(\d+)_(\d+)\b', doubleName, p1)
    return p2


def fixQcis(src):
    p1 = fillFSIM(src)
    p2 = appendMeasure(p1)
    p3 = fixFsimIndex(p2)
    p4 = fixQuantumName(p3)
    return p4

def fixSimulationFile(src, gateArgs):
    layerTime={}
    def gateFix(x):
        layer = int(x.group(1))
        q1 = int(x.group(2))
        q2 = int(x.group(3))
        name1 = 'G'+toQLength(q1)+toQLength(q2)
        name2 = 'G'+toQLength(q2)+toQLength(q1)
        if name1 not in gateArgs and name2 not in gateArgs:
            # should raiseError here
            print('!')
            return x.group(0)
        name = name1
        if name2 in gateArgs:
            name = name2
            q1,q2 = q2,q1
        st = gateArgs['single']*0.5e-9
        theta, phi, deltap, deltam, deltamoff_base, doubleTime, addtionalSgn, addtionalOrder = gateArgs[name]
        f1 = gateArgs['Q'+toQLength(q1)]
        f2 = gateArgs['Q'+toQLength(q2)]
        df = f2 - f1
        if addtionalSgn:
            df*=-1
        layerTime[layer]=doubleTime*0.5e-9
        sumTime = -st
        for ii in range(layer):
            sumTime+=layerTime.get(ii,st)
        deltamoff = -df*sumTime*2*pi + deltamoff_base
        if addtionalOrder:
            q1,q2 = q2,q1
        return f'{layer} fsimplus({theta}, {phi}, {deltap}, {deltam}, {deltamoff}) {q1} {q2}'
    out = re.sub(
        # 1                        2     3
        r'(\d+) fsimplus\([^\)]+\) (\d+) (\d+)', gateFix, src)
    return out

# [markdown]
# global values


class g:
    ThisPath = ThisPath
    Info = Info
    FSIMTime = [1,1,1,1]
    fsimList = [[],[],[],[]]
    fsimI = [0,0,0,0]
    QNameLength = 2

# [markdown]
# ## simulation part


def getSimulation(index, algorithm=''):
    al = 'SFA'
    filename = 'circuit/'+g.Info.get(index, 'name')
    if algorithm == '':
        target = g.Info.get(index, 'targets')
        if re.search(r'(^|_)SFA($|_)', target):
            al = 'SFA'
        if re.search(r'(^|_)SFA_?LESSMEM($|_)', target):
            al = 'SFA_LESSMEM'
        if re.search(r'(^|_)PEPS($|_)', target):
            al = 'PEPS'
        if re.search(r'(^|_)SA($|_)', target):
            al = 'SA'
        if re.search(r'(^|_)PATCH($|_)', target):
            al = 'PATCH'
    else:
        al = algorithm
    n = g.Info.get(index, 'n')
    depth = g.Info.get(index, 'depth')
    return dict(filename=filename, algorithm=al, n=n, depth=depth)


def reRenderSimulationFile(index, gateArgs):
    filename = g.Info.get(index, 'name')
    with open(g.ThisPath+'/circuit/'+filename, encoding='utf-8') as fid:
        src = fid.read()
    return fixSimulationFile(src, gateArgs)


# [markdown]
# ## experiment part


def setFSIMTime(time):
    if type(time)!=list:
        time=[time,time,time,time]
    g.FSIMTime = time


def getCircuit(index, fsimI=[0,0,0,0], fsimList=[[],[],[],[]]):
    g.fsimI = fsimI
    g.fsimList = fsimList
    filename = g.Info.get(index, 'name')+'.qcis'
    with open(g.ThisPath+'/circuit/'+filename, encoding='utf-8') as fid:
        src = fid.read()
    return fixQcis(src)
