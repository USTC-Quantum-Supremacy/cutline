## install

```shell
git clone <url>
cd cutline
git submodule update --init --recursive antlr-blockly
make random
make g4
```

## 搜索切割线

c程序已放弃, 在js中重新实现

+ `Min cut`: 在剪枝的情况下寻找最短路径
+ `All Balanced`: 在不剪枝的情况下返回所有偏差小于设置的路径

目前的实现会放弃部分以下路线:
+ 某个比特的三条边均被切断
+ 分成了3个区域或以上

## patterns

筛选1(网页的search)

只用A~E的32种 外加IJKL

筛选2(shell)

按层的 `2 * 2^(左下右上) * 2^(左上右下)` 种

```shell
node tasks_allcircles.js do
node tasks_allcircles.js analysis

node tasks_allcircles.js giveup
```

## server

双击demo.html是能够在 file:// 下运行的, 目前server仅提供静态服务

```shell
make random
make g4
screen -dms cutline python3 server.py
```

## generate

```shell
make
```

其中  
output/orders_peps.json circuit.zip 需要与Meteor.jl和callMeteor一起工作
