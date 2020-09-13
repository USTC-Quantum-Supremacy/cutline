from pip.__main__ import _main as pipmain
# pip install -r requirements.txt
def install():
    def _add(pkg):
        pipmain(['install',pkg,'-i','http://pypi.mirrors.ustc.edu.cn/simple'])
    # _add('openpyxl')
if __name__ == "__main__":
    install()