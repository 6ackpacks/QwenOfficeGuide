import subprocess, base64, json, time, concurrent.futures

TOKEN = subprocess.run(['gh','auth','token'], capture_output=True, text=True).stdout.strip()
OWNER, REPO = '6ackpacks', 'QwenOfficeGuide'
API = f'https://api.github.com/repos/{OWNER}/{REPO}'

def curl(method, path, body):
    url = API + path if path.startswith('/') else path
    data = json.dumps(body)
    for attempt in range(6):
        r = subprocess.run(['curl','-s','-X',method,url,
            '-H',f'Authorization: Bearer {TOKEN}',
            '-H','Accept: application/vnd.github+json',
            '-H','Content-Type: application/json',
            '--max-time','90','-d',data], capture_output=True, text=True)
        try:
            j = json.loads(r.stdout)
        except Exception:
            j = {'message': 'parse error', 'raw': r.stdout[:200]}
        if 'sha' in j or 'ref' in j or 'content' in j:
            return j
        time.sleep(2 * (attempt + 1))
    raise RuntimeError(f'{method} {path} failed: {json.dumps(j)[:300]}')

files = subprocess.run(['git','-c','core.quotepath=false','ls-files'], capture_output=True, text=True).stdout.splitlines()

# 1) bootstrap commit via contents API (skip if already exists)
chk = subprocess.run(['curl','-s','-o','/dev/null','-w','%{http_code}',
    f'{API}/contents/README.md','-H',f'Authorization: Bearer {TOKEN}'],
    capture_output=True, text=True).stdout.strip()
if chk == '200':
    print('bootstrap already exists, skipping')
else:
    content = open('README.md','rb').read()
    r = curl('PUT', '/contents/README.md', {
        'message': '千问办公实战蓝皮书：24 章内容 + VitePress 站点',
        'content': base64.b64encode(content).decode(),
        'branch': 'main'})
    print('bootstrap commit:', r['commit']['sha'][:10])

# 2) blobs for the rest
rest = [f for f in files if f != 'README.md']
print(len(rest), 'remaining files')

def make_blob(f):
    data = open(f,'rb').read()
    r = curl('POST', '/git/blobs', {
        'content': base64.b64encode(data).decode(), 'encoding': 'base64'})
    return {'path': f, 'mode': '100644', 'type': 'blob', 'sha': r['sha']}

items = []
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
    for i, it in enumerate(ex.map(make_blob, rest)):
        items.append(it)
        if (i+1) % 10 == 0: print(f'blob {i+1}/{len(rest)}')

# include README blob from bootstrap tree
# build tree in chunks
tree_sha = None
chunk = 100
for i in range(0, len(items), chunk):
    body = {'tree': items[i:i+chunk]}
    if tree_sha: body['base_tree'] = tree_sha
    tree_sha = curl('POST', '/git/trees', body)['sha']
    print(f'tree {min(i+chunk,len(items))}/{len(items)}')

# parent commit = bootstrap
parent = curl('GET', '/git/ref/heads/main', {})['object']['sha']
commit = curl('POST', '/git/commits', {
    'message': '千问办公实战蓝皮书：24 章内容 + VitePress 站点（完整文件）',
    'tree': tree_sha, 'parents': [parent]})
print('commit:', commit['sha'][:10])
r = curl('PATCH', '/git/refs/heads/main', {'sha': commit['sha']})
print('ref updated:', r['object']['sha'][:10])
