# Github 合作简单介绍

---

* **fork**一下：首先在项目主页上点击Fork，然后你的github主页上就会多一个项目仓库。 这里解释一下**很多使用者一直没有搞清楚github上fork和star的区别**，看到一个喜欢的项目会满心欢喜的fork到自己的主页，殊不知这种fork只是原作者项目当前状态的一个快照，fork到自己的账号之后，原作者一直更新代码，但是**你的这个fork工程是不会自动和原项目同步的**，之后你的代码都是过时的了。GitHub的fork工程目的是项目协作，因为你没有原作者项目上push代码的权限，fork到自己的账号之后才会有提交和push到自己namespace下面的权限，相反Star才是一个隐藏的收藏功能，任何时候都能够看自己之前点过star项目最新状态。
* **git clone**: 这个项目到本地。要修改别人的项目当然要下载到本地。
```git
# checkout 出来当前分支
git checkout branch-0.2
```
* **git add remote**: 进入你clone下来的项目根目录，执行下面代码给自己的git 仓库增加官方remote，以便后续同步项目，注意这一步暂时在IDEA里面貌似不支持，只能在git bash里面敲命令
```git
$ git remote add upstream git@github.com:yzhang921/CBoard.git
$ git remote -v
origin https://github.com/Fine0830/CBoard.git (fetch)
origin https://github.com/Fine0830/CBoard.git (push)
upstream git@github.com:yzhang921/CBoard.git (fetch)
upstream git@github.com:yzhang921/CBoard.git (push)
$ git fetch upstream
$ git checkout -b upstream-branch-0.2 upstream/branch-0.2
这个时候你本地应该就有三个分支了
origin/master
origin/branch-0.2
upstream/upstream-branch-0.2
```
* **发现bug或者要新增需求之前在官方地址上面创建对应issue**，提交的时候在注释里面带上\#issueNo方便跟踪代码，效果图如下
![image](https://cloud.githubusercontent.com/assets/6037522/21224486/72f656ce-c307-11e6-8ea3-ffdd394a18a5.png)
* 每次修改代码的时候切换到自己的分支，修改代码，完善功能git commit
```git
git checkout branch-0.2
... ...修改 commit
... ...
```

**修改完之后先别着急push到自己的项目**，而是先把upstream上面的代码更新之后合并之后再push，这样push到自己的github远程之后，可以直接发起一个没有冲突的pull request，方便项目维护者快速合并，否则维护者很难处理你修改代码和官方的逻辑冲突，操作如下
当前所在分支为合并的目标分支
```
git merge upstream-branch-0.2
```
* 解决冲突之后，测试项目是否正常，然后就可以push了
* 发起pull request

# 代码风格

* 代码的可读性与性能为第一原则
* 代码风格和原有代码风格保持一致，千万不要出现\t，Tab缩进



