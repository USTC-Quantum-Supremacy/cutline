import numpy as np
import json
seed=13874234
np.random.seed(seed)
randstr=json.dumps({"seed":seed,"list":np.random.random(10000).tolist()})
with open('random_.js') as fid:
    sourcestr=fid.read()
with open('random.js','w') as fid:
    fid.write(sourcestr.split('/// random list start ///')[0])
    fid.write(randstr)
    fid.write(sourcestr.split('/// random list end ///')[1])