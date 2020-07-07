# -*- coding: utf-8 -*-

import sys
import json
import os
import shutil
import base64

isPy3 = sys.version_info > (3, 0)

class g:
    ip='0.0.0.0'
    port=26185
    # cutline='/home/user/zhaouv/cutline/run '
    # cutline2='/home/user/zhaouv/cutline/run2 '
    # filepath='/home/user/zhaouv/cutline/in/current.in'
    # isRunning=False

def p(s): # s is unicode in py2 and str in py3
        if isPy3: print(s)
        else: print(s.decode('utf-8'))
p("")

try:
    from flask import Flask, request, Response, abort
    import mimetypes
except:
    p("需要flask才可使用本服务。\n安装方式：%s install flask" % ("pip3" if isPy3 else "pip"))
    exit(1)

app = Flask(__name__, static_folder='__static__')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

def is_sub(filename):
    try:
        return (os.path.realpath(filename) + os.sep).startswith(os.path.realpath(".") + os.sep)
    except:
        return True

def get_mimetype(path):
    return mimetypes.guess_type(path)[0] or 'application/octet-stream'

def get_file(path):
    if not os.path.isfile(path):
        abort(404)
        return None
    if not is_sub(path):
        abort(403)
        return None
    with open(path, 'rb') as f:
        content = f.read() # str in py2 and bytes in py3
    return content 

@app.route('/', methods=['GET'])
def root():
    return static_file('index.html')

@app.route('/<path:path>', methods=['GET'])
def static_file(path):
    if os.path.isdir(path): 
        if not path.endswith('/'): path += '/'
        path += 'index.html'
    if not os.path.isfile(path):
        abort(404)
        return None
    mimetype = get_mimetype(path)
    response = Response(get_file(path), mimetype = mimetype)
    if mimetype.startswith('audio/'): response.headers["Accept-Ranges"] = "bytes"
    return response

# @app.route('/', methods=['POST'])
# def writeFile():
#     data = request.get_data() # str in py2 and bytes in py3
#     if isPy3: data = str(data, encoding = 'utf-8')
#     try:
#         op=json.loads(data)
#         CInput=op['CInput']
#         prune=op['prune']
#     except Exception as e:
#         return 'error format'
#     if g.isRunning:
#         return 'failed, last task is running'
#     ret=''
#     try:
#         g.isRunning=True
#         with open(g.filepath,'w') as fid:
#             fid.write(CInput)
#         exe=g.cutline if prune else g.cutline2
#         ss=os.popen(exe+g.filepath)
#         ret=ss.read()
#     except Exception as ee:
#         ret='error happens'
#     finally:
#         g.isRunning=False
#     return ret

if __name__ == '__main__':
    p('服务已启动...')
    app.run(host = g.ip, port = g.port, debug = False)
