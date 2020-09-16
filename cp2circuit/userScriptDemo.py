# %%
import json
import re

# cd ..
# python

""" 
假设软件组提供的包叫做`QSTaskInterface`和`QSExperimentInterface`
假设目录结构是
```
├─MeteorCircuit.zip
├─MeteorCircuit
│  ├─circuit
│  ├─__init__.py
│  ├─circuit_xlsx.json
│  └─circuit.xlsx
│
│
└─userScript.py
```
涉及的对象

**任务级**  
taskIndex  
task  
taskID <- todo  

**指令级**  
todo

 """

import QSTaskInterface as qsti
import MeteorCircuit as mc
# %% [markdown]
# ## 连接到服务器
# qsconfig.json中记录了ip地址

qsti.init('qsconfig.json')
mc.init('qsconfig.json')
# %% [markdown]
# ## 初始化任务集合
# 根据实验具体情况, 可以只使用`mc.getAllTask()[0:10]`等写法来只进行一部分实验

qsti.createFromPack('MeteorCircuit.zip')
qsti.createTasks(mc.getAllTask())


# %% [markdown]
# ## 进行一个任务

taskIndex = qsti.getNewTaskIndex() # 获取一个新待进行的任务(未进行过或者已有都是失败状态)

qsti.createTaskByIndex(taskIndex) # 会raise一个错误, 如果有进行中的任务
qsti.setCurrentTaskIndex(taskIndex)
task = mc.getTask(taskIndex)

# %% [markdown]
# ## 继续未完成的任务

taskIndex = qsti.getCurrentTaskIndex() # 获取进行中的任务
isCompleted = qsti.checkCompleted(taskIndex)
if isCompleted:
    # 此时应当使用上一段脚本的开新的任务
    raise RuntimeError('task has completed')
task = mc.getTask(taskIndex)

# %% [markdown]
# ## 把一个任务设置为失败

qsti.failTask() # 把进行中的任务设置为失败
qsti.failTask(taskIndex) # 指定一个任务设为失败


# %% [markdown]
# todo



mc.setFSIMTime(123)
src=mc.getCircuit(3)
print(src)


