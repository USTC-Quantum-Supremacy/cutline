## install

git clone
cd cutline
git submodule update --init --recursive antlr-blockly
make


## 搜索切割线

1. 在剪枝的情况下看看一共有多少路径 main.cc run
1. 在不剪枝的情况下看看一共有多少路径 mainall.cc run2

## patterns

筛选1

只用A~E的8种

```
ABCDCDAB: BC,DA
BACDCDBA: AC,DB
ABEFEFAB: BE,FA
BAEFEFBA: AE,FB
GHCDCDGH: HC,DG
HGCDCDHG: GC,DH
GHEFEFGH: HE,FG
HGEFEFHG: GE,FH
```

筛选2

按层的话 `2^(左下右上) * 2^(左上右下)` 种

