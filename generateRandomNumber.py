import numpy as np
import json
seed=13874234
seeds=[
    13874234,10285102,22886724,92997209,18392462,
    58869319,80531470,53535483,43935200,23239930]
randobj={"seed":str(seed),"list":[1,2,3],"seeds":[str(i) for i in seeds]}
for seed in seeds:
    np.random.seed(seed)
    randobj[seed]=np.random.random(10000).tolist()
randstr=json.dumps(randobj)
with open('random_.js') as fid:
    sourcestr=fid.read()
with open('random.js','w') as fid:
    fid.write(sourcestr.split('/// random list start ///')[0])
    fid.write(randstr)
    fid.write(sourcestr.split('/// random list end ///')[1])

with open('CutlineInput.g4') as fid:
    sourceg4=fid.read()
with open('CutlineInput.g4.js','w') as fid:
    fid.write('this.grammerFile=')
    fid.write(json.dumps(sourceg4))