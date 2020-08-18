__all__=[
    'getTask',
    'getCircuit',
    'checkState',
]
import os
from openpyxl import load_workbook
ThisPath=os.path.split(os.path.realpath(__file__))[0]

def readXlsx(filename = ThisPath+'\\circuits.xlsx'):
    wb = load_workbook(filename = filename)
    ws = wb[wb.sheetnames[0]]
    data = ws.values
    return list(data)

def build_info():
    class InfoClass:
        def pos(self,index):
            return self.taskIndexes.index(index)
        def get(self,index,field):
            return self.data[self.pos(index)][self.fields.index(field)]
    Info = InfoClass()
    data=readXlsx()
    Info.fields=data[0]
    Info.data=data[1:]
    Info.taskIndexes=[line[Info.fields.index('taskIndex')] for line in Info.data]
    return Info

Info=build_info()

def getCircuit(index):
    filename = Info.get(index,'name')
    with open(ThisPath+'\\circuit\\'+filename,encoding='utf-8') as fid:
        sourceContent = fid.read()
    return fillFSIM(sourceContent)
def getTask(resultDir,index):
    pass
def checkState(resultDir,index):
    pass