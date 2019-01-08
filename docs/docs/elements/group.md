### Group

构造一个组合，`Group`继承自`Element`。

```js
let group = new Group(options);
```

### options

除了支持元素的[基础属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value          | description  | default |
| ----------- | -------------- | ------------ | ------- |
| w           | Number         | 规定组合宽度 | --      |
| h           | Number         | 规定组合高度 | --      |
| clip        | String\|Object | 规定裁剪区域 | --      |

::: tip
组合可以不设置宽高，这样的组合称为虚拟组合，即没有边界的组合。
虚拟组合没有缓存，也无法绑定事件，可以对其子元素进行事件绑定来替代。
如果组合大小有限，建议设置宽高，缓存机制才能生效。
:::

::: tip
clip 的值和 Path 元素的 d 形式相同。
:::

### 实例属性

| property  | value   | description    | example |
| --------- | ------- | -------------- | ------- |
| isVritual | Bealoon | 是否为虚拟组合 | `false` |

### 实例方法

#### append(element)

- 描述：

  向画布中添加一个或多个元素

- 参数：

  - `{Element} element`
    ::: tip
    组合中的元素根据组合的位置定位
    :::

- 示例：
  ```js
  group.append(element, element2);
  ```

#### remove(element)

- 描述：

  从画布中去除一个或多个元素

- 参数：

  - `{Element} element`

::: tip
支持不传参数，`group.remove()`将删除所有的元素
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
