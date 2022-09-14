// keepalive组件选项
var KeepAlive = {
    name: 'keep-alive',
    // 抽象组件的标志
    abstract: true,
    // keep-alive允许使用的props
    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },

    created: function created () {
      // 缓存组件vnode
      this.cache = Object.create(null);
      // 缓存组件名
      this.keys = [];
    },

    destroyed: function destroyed () {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },

    mounted: function mounted () {
      var this$1 = this;
      // 动态include和exclude
      // 对include exclue的监听
      this.$watch('include', function (val) {
        pruneCache(this$1, function (name) { return matches(val, name); });
      });
      this.$watch('exclude', function (val) {
        pruneCache(this$1, function (name) { return !matches(val, name); });
      });
    },
    // keep-alive的渲染函数
    render: function render () {
      // 拿到keep-alive下插槽的值
      var slot = this.$slots.default;
      // 第一个vnode节点
      var vnode = getFirstComponentChild(slot);
      // 拿到第一个组件实例
      var componentOptions = vnode && vnode.componentOptions;
      // keep-alive的第一个子组件实例存在
      if (componentOptions) {
        // check pattern
        //拿到第一个vnode节点的name
        var name = getComponentName(componentOptions);
        var ref = this;
        var include = ref.include;
        var exclude = ref.exclude;
        // 通过判断子组件是否满足缓存匹配
        if (
          // not included
          (include && (!name || !matches(include, name))) ||
          // excluded
          (exclude && name && matches(exclude, name))
        ) {
          return vnode
        }

        var ref$1 = this;
        var cache = ref$1.cache;
        var keys = ref$1.keys;
        var key = vnode.key == null
          ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
          : vnode.key;
          // 再次命中缓存
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          // make current key freshest
          remove(keys, key);
          keys.push(key);
        } else {
        // 初次渲染时，将vnode缓存
          cache[key] = vnode;
          keys.push(key);
          // prune oldest entry
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
        }
        // 为缓存组件打上标志
        vnode.data.keepAlive = true;
      }
      // 将渲染的vnode返回
      return vnode || (slot && slot[0])
    }
  };


  function getFirstComponentChild (children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        // 组件实例存在，则返回，理论上返回第一个组件vnode
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c
        }
      }
    }
  }
