### Group

构造一个组合，`Group`继承自`Element`。

```js
let group = new Group(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value  | description     | default     |
| ----------- | ------ | --------------- | ----------- |
| x           | Number | 规定组合 x 坐标 | --          |
| y           | Number | 规定组合 y 坐标 | --          |
| w           | Number | 规定组合宽度    | `undefined` |
| h           | Number | 规定组合高度    | `undefined` |

::: tip
组合可以不设置宽高，这样的组合称为虚拟节点，即没有边界的组合
:::

### 实例方法

#### append(element)

- 描述：

  向画布中添加一个或多个图形

- 参数：

  - `{Element} element`
    ::: tip
    组合中的图形根据组合的位置定位
    :::

- 示例：
  ```js
  group.append(element, element2);
  ```

#### remove(element)

- 描述：

  从画布中去除一个或多个图形

- 参数：

  - `{Element} element`

::: tip
支持不传参数，`group.remove()`将删除所有的图形
:::

- 示例：

  ```js
  group.remove(element);
  ```

### example

```js
let circle = new Circle({
  r: 50,
  y: 50,
  x: 50
});
let group = new Group({
  x: 100,
  y: 100,
  w: 550,
  h: 550,
  stroke: "#ddd"
});
group.append(circle);
group.append(group);
```

<!-- <ClientOnly><c-circle></c-circle></ClientOnly> -->
