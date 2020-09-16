# -*- coding: utf-8 -*-
# %%
import json
import re

# cd ..
# python

""" 
假设软件组提供的包叫做`QSTaskInterface`  
假设目录结构是
```
├─MeteorCircuit.zip
├─MeteorCircuit
│  ├─circuit
│  │  └─*.qcis
│  ├─__init__.py
│  ├─circuit_xlsx.json
│  └─circuit.xlsx
│
├─qsconfig.json
└─userScript.py
```
涉及的对象

**任务级**  
taskIndex  
task  
taskID <- todo  

**指令级**  
instruction  


 """

import QSTaskInterface as qsti
import MeteorCircuit as mc
# %% [markdown]
# # 初始化
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
# # 任务
# 以下内容有一些`taskIndex`应该要换成`taskID`
#
# ## 进行一个任务

taskIndex = qsti.getNewTaskIndex()  # 获取一个新待进行的任务(未进行过或者已有都是失败状态)

qsti.createTaskByIndex(taskIndex)  # 会raise一个错误, 如果有进行中的任务
task = mc.getTask(taskIndex)

# %% [markdown]
# ## 继续未完成的任务

taskIndex = qsti.getCurrentTaskIndex()  # 获取进行中的任务
isCompleted = qsti.checkCompleted(taskIndex)
if isCompleted:
    # 此时应当使用上一段脚本的开新的任务
    raise RuntimeError('task has completed')
task = mc.getTask(taskIndex)

# %% [markdown]
# ## 把一个任务设置为失败

qsti.failTask(reason='...')  # 把进行中的任务设置为失败
qsti.failTask(taskIndex, reason='...')  # 指定一个任务设为失败


# %% [markdown]
# # 指令
# ## 运行指令集
mc.setFSIMTime(123)
for instruction in task:
    qsti.join()  # 等待上一个指令运行完, 如果上一个是错误退出了这里会raise
    iType = instruction['type']
    if iType == 'circuit':
        circuit = mc.getCircuit(instruction['circuitIndex'])
        count = instruction['count']
        index = instruction['index']
        qsti.runCircuit(index, circuit, count)  # 提交式的
    if iType == 'calibration':
        pass
    if iType == 'check':
        circuit = mc.getCircuit(instruction['checkCircuit'])
        count = instruction['count']
        index = instruction['index']
        # 同步式的获取结果, check线路能很快跑完
        checkBasis = qsti.runCheck(index, circuit, count)
        mc.submitCheck(instruction, checkBasis)

qsti.join()
# 全部结束后
taskBasis = qsti.queryTaskResult(taskIndex)
mc.submitTask(taskIndex, taskBasis)
# %% [markdown]
# # 查询结果

mc.queryCheck(taskIndex)
mc.queryTask(taskIndex)
