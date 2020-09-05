from pip._internal import main as pipmain
def install():
    pipmain(['install','openpyxl'])
if __name__ == "__main__":
    install()