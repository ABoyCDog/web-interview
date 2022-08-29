# px、em、rem等单位区别
+ px: 像素pixel，相对长度单位，相对显示器屏幕像素而言的。想要转换为物理长度的话需要指定精度DPI（Dots Per Inch），window系统默认96dpi、Apple系统默认72dpi
+ em: 相对长度单位，相对当前对象内文本的字体尺寸。最初是指字母M的宽度，故名em。现指的是字符宽度的倍数，用法类似百分比，如：0.8em, 1.2em,2em等。通常1em=16px。
+ rem: root-em，相对长度单位，1rem等于html元素上设置的字体大小。只需要改变html上设置的font-size大小就可以改变rem的大小
+ rem是相对于html根元素的字体大小，em则是相对父元素的字体大小，em最多取到小数点后三位