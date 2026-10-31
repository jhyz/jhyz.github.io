"""Check the rendered publication boundary, not just the source tree."""
from pathlib import Path
import json
import re
import sys

site = Path(sys.argv[1])
required = ['index.html', 'posts/themeagent/index.html', 'categories/index.html',
            'tags/index.html', 'archives/index.html', 'about/index.html',
            'assets/js/data/search.json', 'qian-jinhang-resume.pdf', '404.html']
for name in required:
    assert (site / name).is_file(), f'Missing route: {name}'
for name in ['app', 'tests', 'docs', 'db', 'worker', '.openai']:
    assert not (site / name).exists(), f'Unexpected published source directory: {name}'
search = json.loads((site / 'assets/js/data/search.json').read_text(encoding='utf-8'))
assert len(search) == 1 and 'ThemeAgent' in search[0]['title'], 'Unexpected articles'
for path in site.rglob('*'):
    if path.suffix not in {'.html', '.json', '.xml', '.txt'}:
        continue
    content = path.read_text(encoding='utf-8')
    for pattern in [r'(?<![0-9])1[3-9][0-9]{9}(?![0-9])', r'[A-Za-z]:\\(?:Users|learntry)', r'/Users/', r'/home/[^ /]+/', r'ghp_[A-Za-z0-9]{20,}', r'-----BEGIN .*PRIVATE KEY-----']:
        assert not re.search(pattern, content), f'Publication review required: {path.relative_to(site)}'
print(f'PASS: {len(required)} required routes, one real article, publication boundary checks')
