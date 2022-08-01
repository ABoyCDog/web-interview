// 简单实现一下vue-router

export default class VueRouter {
    constructor({ routes }) {
        this.routes = routes;
        this.history = new History();
        this.history.listen((path) => {
            this.path = path;
        });
    }

    init(vm) {
        this.vm = vm;
    }
}

// 监听history变化
class History {
    listen(callback) {
        window.addEventListener('hashchange', () => {
            callback && callback(window.location.hash);
        })
    }
}

VueRouter.install = function(Vue) {

    // TODO
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router) {
                this.$options.router.init(this);
            }
        }
    });

    // router-view
    Vue.component('router-view', { 

            functional: true,

            render(createElement, {props, children, parent, data}) {
                return createElement(
                    'div'
                );
            }
    })
}