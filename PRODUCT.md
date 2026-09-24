# Social Card Studio v0.1

## 产品定义

Social Card Studio 是 Guizang Social Card Skill 的“最后一公里”Swiss 编辑器。Skill 或创作者先完成内容规划，编辑器负责版式切换、文案微调、图片替换和发布前导出。

它不是自由画布。固定版式负责守住字体、网格、配色和信息密度，用户只编辑真正会改变表达的内容。

## 数据模型

编辑状态以 Deck JSON 为唯一事实源：

```text
Deck
├── style / theme / footer
└── pages[]
    ├── recipe
    ├── legacy page fields (migration compatibility)
    └── components[]
        ├── type / span / visible
        └── data / items[]
```

HTML 画布是 JSON 的渲染结果。这让后续 Agent 可以直接生成 Deck JSON，也让用户切换版式时保留已有字段。

## v0.1 范围

当前版本实现完整的 `S01-S12`：封面、对比、文件对象、界面展示、问题警示、流程、结论、图片主视觉、KPI、排行、量化台账和能力矩阵。视觉变量限于 Skill 已验证的四个 Swiss 强调色。

新增页面先选择模板；已有页面通过右侧可视化模板图库切换。模板只是组件组合预设，页面内部可以继续添加、隐藏、删除和排序组件；公共字段和暂时未显示的条目继续保留。

### 组件编辑模型

页面使用 12 列自动布局。组件只能选择 4 / 6 / 8 / 12 列宽度，拖动只改变组件顺序，新增和删除不会改变字体、间距、颜色或导出尺寸。高密度组件拥有固定内容窗口，确保最终画布始终保持 1080 × 1440。

## 后续优先级

1. 增加版式容量与溢出提示。
2. 将图片、来源和数据字段继续拆成组件级属性。
3. 增加 1:1 与 21:9 画布，为同一 Deck 单独构图。
4. 将 Skill 产出的结构化计划导入为 Deck JSON。
5. 接入本地 Playwright 校验，最后再考虑 Agent 入口和 Live Photo。
