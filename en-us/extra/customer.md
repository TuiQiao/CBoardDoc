## 谁在使用CBoard
<div class="bs-callout bs-callout-info" id="callout-focus-demo">
    <h4>欢迎登记</h4>
    <p>如果你们公司正在使用或者准备使用CBoard请在下面留下贵公司的公司名和公司主页，让我们的团队知道辛苦没有白费。</p>
    <a href="https://github.com/yzhang921/CBoard/issues/122"><button type="button" class="btn btn-primary btn-sm"><i class="fa fa-mail-forward"></i> 跳转登记页</button></a>
</div>

<table class="table">
    <thead>
    <tr>
        <th>NO.</th>
        <th>公司名称</th>
        <th>主页</th>
        <th>备注</th>
    </tr>
    </thead>
    <tbody>

    <tr v-for="(c, index) in list">
        <td>{{index + 1}}</td>
        <td>{{c.name}}</td>
        <td><a :href="c.site">{{c.site}}<a></td>
        <td><a :href="c.link">{{c.note}}</a></td>
    </tr>

    </tbody>
</table>

<script>
  new Vue({
    el: '#main',
    data: {
        list: [
              {name: '酷狗音乐', site: 'http://www.kugou.com'},
              {name: '交通银行卡中心', site: 'http://www.bankcomm.com/'},
              {name: '中国建设银行托管', site: 'http://www.ccb.com/'},
              {name: '沪江教育', site: 'https://www.hujiang.com/'},
              {name: '用友建筑', site: 'https://cc.yonyoucloud.com', note: 'UBoard，数据可视化的神器', link:'https://www.jianshu.com/p/f16114e93638'},
              {name: '腾讯OMG内容商业化中心大数据平台', site: 'https://www.tencent.com/'},
              {name: '用友HDA智能决策云平台', site: 'http://hda.yonyouhit.com'},
              {name: '创维', site: 'http://www.skyworth.com'},
              {name: '易企秀', site: 'http://www.eqxiu.com'},
              {name: '华为', site: 'https://www.huawei.com/en/', note: '无线网络研发工具开发三部'},
              {name: '上海汉得信息技术有限公司', site: 'http://www.hand-china.com/'},
              {name: '什么值得买', site: 'http://www.smzdm.com/'},
              {name: '浪潮信息', site: 'http://www.inspur.com/'},
              {name: '微赛体育', site: 'https://www.wesai.com/'},
              {name: '邻盛企业PAAS平台', site: 'http://www.linksame.com'},
              {name: '红荔数据', site: 'http://www.redlichee.com'},
              {name: '深圳市设施之家科技有限公司', site: 'https://www.fm-community.com/'},
              {name: '深圳工作家网络科技有限公司', site: 'https:/www.iworker.cn/'},
              {name: '明动软件', site: 'http://www.minstone.com.cn/'},
              {name: '成都九鼎瑞信科技股份有限公司', site: 'http://www.evercreative.com.cn'},
              {name: '芮米科技', site: 'http://www.reemii.cn', note: '结合数据优化引擎来提升数据UI报表体验'},
              {name: '广联达众然', site: 'http://ysg.glodon.com', note: '行为分析看板'},
              {name: '简理财', site: 'http://www.jianlc.cn', note: 'kylin可视化'},
              {name: '深圳神盾信息', site: 'http://www.sundun.cn'},
              {name: '上海致宇', site: 'http://www.goupwith.com/'},
              {name: '农分期', site: 'http://www.nongfenqi.com'},
              {name: '数云普惠', site: 'http://www.digcredit.com/'},
              {name: '淘菜猫', site: 'http://www.taocaimall.com/'},
              {name: '轻轻家教', site: 'http://www.changingedu.com'},
              {name: '金色家园网', site: 'http://www.jiachengnet.com/'},
              {name: '湖南传拓智联网络科技有限公司', site: 'http://www.trasmart.com'},
              {name: '湖南金诚创新科技有限公司', site: ''},
              {name: 'Parisclub', site: 'http://parishop.ru/'},
              {name: '美利金融', site: 'http://www.mljr.com'},
              {name: '湘靖网络科技', site: 'http://www.vxiaoke360.com'}
        ]
    }
  })
</script>


## 用户反馈
<blockquote>
我们是创维酷开大数据部的，0.3.2版本已经在我们的正式环境中稳定运行。
报表优化的非常好，内部员工用起来明显感觉快了很多，并且功能比0.2版本要强大很多。
非常感谢您的无私，将自己项目开源出来，让我们能有幸地站在巨人的肩膀上，眺望更远的未来。
  <footer><a href="https://github.com/yzhang921/CBoard/issues/122#issuecomment-309935668">创维酷开大数据部</a></footer>
</blockquote>


<blockquote>
经过前期预研,最终选择了CBoard:1st_place_medal:---在对比了其它开源方案后(metabase/superset/Redash/zeppelin/Saiku,baidu/BIPlatform,ureport/EasyReport)
CBoard和我们的需求很匹配,节省了我们的大量时间, 现在可以站在CBoard的肩膀上做一些定制.
可以用CBoard替换掉现在公司正在使用的tableau和自己开发的页面了. 内部管Tableau叫TB,管CBoard叫CB
公司准备用CBoard+Palo(百度开源的分析型数据库)搭建"报表和多维分析"服务.
<footer><a href="https://github.com/yzhang921/CBoard/issues/122#issuecomment-343087697">沪江教育</a></footer>
</blockquote>


