function my_footer(hook, vm) {
    var footer = [
        '<hr/>',
        '<footer class="text-center">',
        '<p>',
        '<small><strong>版权 © CBoard项目组</strong>. 保留一切版权.<br></small>',
        '<small>联系我们: <a href="mailto:#"> peter.zhang921@gmail.com </a></small> <br>',
        '<small>Documentation built with <a href="https://docsify.js.org">Docsify</a>.</small>',
        '</p>',
        '</footer>'
    ].join('');
    hook.afterEach(function (html) {
        return html + footer;
    });
    hook.beforeEach(function (html) {
        var repoPath = 'https://github.com/yzhang921/cboard_doc',
            editTitle = 'Help improve document!';
        if (vm.route.path.indexOf('zh-cn') != -1) {
            repoPath = 'https://gitee.com/peter_zhang921/cboard_docsify';
            editTitle = '帮助改善文档!';
        }

        var url = repoPath + '/blob/master/' + vm.route.file;
        var editHtml = '[:memo: ' + editTitle +  '](' + url + ')\n';

        return editHtml
            + html
            + '\n----\n'
            + editHtml
    });
}