# flex 1代表什么
+ flex是flex-grow、flex-shrink、flex-basis的简写，默认值为0 1 auto
+ flex-shrink代表项目的缩小比例，默认为1，所以如果空间不足，项目将缩小
+ flex-basis属性定义了在分配多余的空间之前，项目占据的主轴空间（main size）

# 说说flex布局
+ 采用flex布局的元素成为flex容器（flex container），布局内的子元素称为容器的项目（flex item），默认水平横向为主轴（main axis），纵向为交叉轴（cross axis）。主轴开始位置叫做main start，也就是主轴与边框的交汇处，终点位置叫做main end，交叉轴也一样，cross start和cross end。
+ 项目默认按照主轴排列，项目占据主轴空间叫做main size，占据纵轴空间叫做cross size
+ 容器的6个属性：
    - flex-direction：决定主轴的方向，属性有row（默认水平主轴）、row-reverse、column、column-reverse
    - flex-wrap: 决定是否项目换行，属性有no-warp（默认不换行）、wrap、wrap-reverse
    - flex-flow: 是direction和wrap的合并简写形式
    - justify-content：决定项目在主轴上的排列方式，属性有flex-start、flex-end、center、space-around、space-between
    - align-item: 决定项目在纵轴上的排列方式（对齐方式），属性有flex-start、flex-end、center、baseline（项目第一行文字的基线对齐）、strech（默认，如果项目未设置高度或设为auto，则项目将占满容器的高度）
    - align-content: 决定多行项目的情况，非多行不起作用。属性有flex-start、flex-end、center、space-between、space-around、strech
+ 项目的6个属性：
    - order：定义项目的排列顺序。数值越小，排列越靠前，默认为0。
    - flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    - flex-shrink：定义项目的缩小比例，默认为1，即空间不足则项目将会被缩小。（如果空间不足的情况下，其中有一个设置flex-shrink为0，而其他都设置为1，则0那个不缩小，其他都缩小）
    - flex-basis：定义项目在分配多余空间之前所占据的主轴空间（main size），
    - align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
