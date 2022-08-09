const LazyLoad = {
    // install方法
    install(Vue, options) {
        // 代替图片的loading图
        let defaultSrc = options.default;
        Vue.directive('lazy', {
            // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
            bind(el, binding) {
                LazyLoad.init(el, binding.value, defaultSrc);
            },
            // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
            inserted(el) {
                // 兼容处理
                if ('IntersectionObserver' in window) {
                    LazyLoad.observe(el);
                } else {
                    LazyLoad.listenerScroll(el);
                }

            },
        })
    },
    // 初始化
    init(el, val, def) {
        // data-src 储存真实src
        el.setAttribute('data-src', val);
        // 设置src为loading图
        el.setAttribute('src', def);
    },
    // 利用IntersectionObserver监听el
    observe(el) {
        let io = new IntersectionObserver(entries => {
            let realSrc = el.dataset.src;
            if (entries[0].isIntersecting) {
                if (realSrc) {
                    el.src = realSrc;
                    el.removeAttribute('data-src');
                }
            }
        });
        io.observe(el);
    },
    // 监听scroll事件
    listenerScroll(el) {
        let handler = LazyLoad.throttle(LazyLoad.load, 300);
        LazyLoad.load(el);
        window.addEventListener('scroll', () => {
            handler(el);
        });
    },
    // 加载真实图片
    load(el) {
        let windowHeight = document.documentElement.clientHeight
        let elTop = el.getBoundingClientRect().top;
        let elBtm = el.getBoundingClientRect().bottom;
        let realSrc = el.dataset.src;
        if (elTop - windowHeight < 0 && elBtm > 0) {
            if (realSrc) {
                el.src = realSrc;
                el.removeAttribute('data-src');
            }
        }
    },
    // 节流
    throttle(fn, delay) {
        let timer;
        let prevTime;
        return function (...args) {
            let currTime = Date.now();
            let context = this;
            if (!prevTime) prevTime = currTime;
            clearTimeout(timer);

            if (currTime - prevTime > delay) {
                prevTime = currTime;
                fn.apply(context, args);
                clearTimeout(timer);
                return;
            }

            timer = setTimeout(function () {
                prevTime = Date.now();
                timer = null;
                fn.apply(context, args);
            }, delay);
        }
    }

}
export default LazyLoad;