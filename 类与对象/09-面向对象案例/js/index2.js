window.addEventListener('load', function () {
    // var that

    class Tab {
        constructor(id) {
            // that = this;
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tabadd');
            this.ul = this.main.querySelector('ul');
            this.tabscon = this.main.querySelector('.tabscon');


            // console.log(this.add); 
            this.init();
        }
        //获取li 和 section
        updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.span = this.main.querySelectorAll('.fisrstnav li span:first-child');
            this.close = this.main.querySelector('.icon-guanbi');
        }

        //初始化功能
        init() {
            this.updateNode();
            // document.addEventListener('click', this.clear, true);
            // this.add.addEventListener('click', this.addTab.bind(this.add, this));
            //bind()会创建一个新的函数，如果用的是addEventListener来注册事件，因为addEventListener可以绑定多个事件不会产生覆盖，所以这个add会随着
            //你点击次数得增多，绑定得事件就会越多，就会产生点击一次添加多个选项卡得现象
            this.add.onclick = this.addTab.bind(this.add, this);

            for (var i = 0; i < this.lis.length; i++) {
                // 给lis对象创建了一个属性值index
                this.lis[i].index = i;
                //点击执行方法,toggleTab不需要加括号
                //改变toggleTab得内部this指向为this.lis[i]，再将init内部得this（指向得是对象）作为参数
                this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
                this.lis[i].children[1].onclick = this.removeTab.bind(this.lis[i].children[1], this);
                // this.lis[i].addEventListener('click', this.toggleTab.bind(this.lis[i], this));
                // this.lis[i].children[1].addEventListener('click', this.removeTab.bind(this.lis[i].children[1], this));
                //给span和sections添加双击事件,双击就进行修改
                this.span[i].addEventListener('dblclick', this.modifyTab);
                this.sections[i].addEventListener('dblclick', this.modifyTab);

            }
        }

        //1,点击选项卡切换选项卡功能
        //that接收this参数
        toggleTab(that) {

            //这里的this指向的是它的调用者(点击后的li)，不再是该对象
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
            if (that.tabscon.children[0].innerText == "请点击选项卡") {
                that.tabscon.children[0].style.display = 'none';
            }

            // console.log(this.click());

        }

        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }

        //2,新增选项卡功能
        addTab(that) {

            if (that.lis.length >= 8) {
                alert('选项卡已满');

            } else {
                var count = Math.random();
                that.clearClass();
                that.ul.insertAdjacentHTML('beforeend', '<li  class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>');
                that.tabscon.insertAdjacentHTML('beforeend', '<section class="conactive">' + count + '</section>');
                that.init();
            }
        }
        //3,点差号删除选项卡
        removeTab(that, e) {
            console.log(that);
            var index = this.parentNode.index;
            //阻止事件冒泡
            e.stopPropagation();
            //删除指定元素的li
            that.lis[index].remove();
            that.sections[index].remove();
            //删除后更新数据
            that.init();
            //删除选中状态的li让前一个li成为被选中状态，如果不是删除被选中状态的则不执行任何操作
            if (document.querySelector('.liactive')) return;
            index--;
            //手动进行点击操作
            that.lis[index] && that.lis[index].click();

        }
        //4,修改选项卡名称和对应内容
        modifyTab() {

            var str1 = this.innerHTML;
            //阻止双击选中功能
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            //添加input
            this.innerHTML = '<input type="text">';
            //原本的内容放到input
            var input = this.children[0]
            input.value = str1;
            //让input里面的文字被选中
            input.select();
            //input失去焦点后input的value给到span
            input.onblur = function () {
                this.parentNode.innerHTML = this.value;
            };
            //按回车返回内容
            input.onkeyup = function (e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            };
        }



        //5,点击选项卡之外，清空被选中状态
        // clear() {
        //     if (!(that.lis[this.index].click())) {
        //         that.clearClass();
        //     }
        // }

    }

    new Tab('#tab');
})