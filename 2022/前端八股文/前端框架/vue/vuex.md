# vuex相关
+ state：在组件中使用...mapState来获取state值；
+ mutations：在组件中使用...mapMutations来获取mutations中的方法；
+ actions：在组件中使用...mapActions(['subAsync'])来调用actions中对应的action方法；
+ getters：用于对store中的数据进行加工处理形成新的数据（不会修改state中的值，相当于计算属性）；在组件中使用可以通过...mapGetter调用getters中的值；

+ 要修改全局的state中的值，需要通过mutations来修改（只有mutations才允许直接修改state中的值）；
  - 组件中触发mutations中的函数，需要使用commit来调用mutations中的函数；
+ 若要执行异步操作，则需要使用actions函数；
  - actions函数中其实也是通过commit去触发mutations中的函数来改变state的值；
  - 在组件中要使用触发actions函数，需要通过dispatch来触发。