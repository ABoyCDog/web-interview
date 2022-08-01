// 简单实现一下vue-router

export default class VueRouter {
    constructor({ routes }) {
        this.routes = routes;
        this.history = new History();
        this.path = window.location.hash; // 注意需要初始化
        this.history.listen((path) => {
            // 每次变化的path
            this.path = path;
            this.vm.$forceUpdate();
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

                const router = parent.$options.router;
                const path = router.path;

                const matchRoute = router.routes.find(route => {
                    return route.path.replace(/^\//, '') === path.replace(/\#/, '');
                })

                const matchedComponent = matchRoute.component;

                // let comp = {
                //     template: '<div>我是router-view</div>'
                // };


                return createElement(
                    // comp,
                    matchedComponent,
                );
            }
    })
}