## install

git clone
cd cutline
git submodule update --init --recursive antlr-blockly
python3 generateRandomNumber.py

## 搜索切割线

c程序已放弃, 在js中实现

1. 在剪枝的情况下看看一共有多少路径 main.cc run
1. 在不剪枝的情况下看看一共有多少路径 mainall.cc run2

## patterns

筛选1

只用A~E的32种 外加IJKL

筛选2

按层的话 `2 * 2^(左下右上) * 2^(左上右下)` 种

## server

```shell
screen -R cutline
python3 server.py
```

## generate

```shell
node generateCircuit.js
7z a circuit.zip circuit peps_path
```