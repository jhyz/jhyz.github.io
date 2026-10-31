# 钱金航的博客

<https://jhyz.github.io/> · 基于 [Chirpy Starter](https://github.com/cotes2020/chirpy-starter) 与 Jekyll，主题固定为 Chirpy 7.6.0。

## 本地预览

需要 Ruby 3.4 和 Bundler：

```sh
bundle install
bundle exec jekyll serve
```

生产构建与检查：

```sh
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer _site --disable-external
python3 tests/check_site.py _site
```

## 写文章

在 `_posts` 中添加 `YYYY-MM-DD-slug.md`，填写 title、date、categories、tags 与 description。设置 `pin: true` 可选为首页精选。首页、归档、分类、标签、搜索与 RSS 均从文章生成。

少量定制集中在 `_layouts/home.html`、`_includes/update-list.html` 和 `assets/css/jekyll-theme-chirpy.scss`；其余布局、搜索、主题切换继续使用官方主题。升级主题时应检查这些覆盖文件与中文语言文件。

## 发布

GitHub Actions 构建并检查每个迁移分支和 PR，只有 `main` 部署到 Pages。仓库 Pages 来源保持为 GitHub Actions。

## 旧版恢复

迁移前提交：`852ed439c53f50a0e3872f025107b89d40d89575`。旧站源码保留在 Git 历史中。若需恢复，应创建新的恢复提交并通过 Pages 构建发布，不需要改写历史。旧版内容需要重新进行公开范围审查。

Chirpy 代码遵循仓库中的 MIT LICENSE；个人文章的许可在页面中显示。
