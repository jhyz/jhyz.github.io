"""Publication checks must allow new writing while catching private material."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

CHECK = Path(__file__).with_name('check_site.py')

class PublicationChecks(unittest.TestCase):
    def run_check(self, extra_post=False, body='Public article'):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for name in ['index.html', 'posts/themeagent/index.html', 'categories/index.html',
                         'tags/index.html', 'archives/index.html', 'about/index.html',
                         'qian-jinhang-resume.pdf', '404.html']:
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(body, encoding='utf-8')
            search = [{'title': 'ThemeAgent', 'url': '/posts/themeagent/'}]
            if extra_post:
                search.append({'title': 'Another genuine post', 'url': '/posts/another/'})
            index = root / 'assets/js/data/search.json'
            index.parent.mkdir(parents=True)
            index.write_text(json.dumps(search), encoding='utf-8')
            return subprocess.run([sys.executable, str(CHECK), str(root)], capture_output=True).returncode

    def test_initial_article_passes(self):
        self.assertEqual(self.run_check(), 0)

    def test_additional_article_passes(self):
        self.assertEqual(self.run_check(extra_post=True), 0)

    def test_phone_is_blocked(self):
        self.assertNotEqual(self.run_check(body='Synthetic phone: ' + '139' + '00000000'), 0)

    def test_windows_path_is_blocked(self):
        self.assertNotEqual(self.run_check(body=r'C:\Users\Example\private.txt'), 0)

if __name__ == '__main__':
    unittest.main()
