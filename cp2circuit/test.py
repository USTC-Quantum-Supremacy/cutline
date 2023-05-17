
import math

import __init__ as mc
mc.setFSIMTime(123)
circuit = mc.getCircuit(258, fsimI=2, fsimList=['G0700', 'G1003'])
print('start--'+circuit[0:100]+'-- ... --'+circuit[-100:]+'--END')
# print(circuit)
gateArgs = {
    "single": 40,
    "double": 80,
}
for ii in range(66):
    gateArgs[f'Q{ii:0>2}'] = (5600+ii)*1e6
    for jj in range(66):
        gateArgs[f'G{ii:0>2}{jj:0>2}'] = [math.pi*0.5, math.pi/6, 0, 0, 0]
qcis = mc.reRenderSimulationFile(15, gateArgs)
# print('start--'+qcis[0:100]+'-- ... --'+qcis[-100:]+'--END')
print(qcis)
indexes = mc.g.Info.filtTarget('Check_A')
print(indexes)
