function my_footer(hook) {
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
    })
}