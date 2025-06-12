---
title: TourLink
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# TourLink

Base URLs:

# Authentication

# ViewController

## POST 用户查看博客

POST /api/views

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|query|integer| 是 |博客|
|userId|query|string| 是 |用户|

> 返回示例

> 200 Response

```json
{
  "blogId": 0,
  "userId": "",
  "totalViews": 0,
  "isFirstView": false,
  "viewTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityViewResponse](#schemaresponseentityviewresponse)|

## GET 查询博客的总浏览次数

GET /api/views/count

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|query|integer| 是 |博客|

> 返回示例

> 200 Response

```json
0
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|integer|

# 数据模型

<h2 id="tocS_ResponseEntityViewResponse">ResponseEntityViewResponse</h2>

<a id="schemaresponseentityviewresponse"></a>
<a id="schema_ResponseEntityViewResponse"></a>
<a id="tocSresponseentityviewresponse"></a>
<a id="tocsresponseentityviewresponse"></a>

```json
{
  "blogId": 0,
  "userId": "string",
  "totalViews": 0,
  "isFirstView": true,
  "viewTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|blogId|integer(int64)|false|none||none|
|userId|string|false|none||none|
|totalViews|integer|false|none||none|
|isFirstView|boolean|false|none||none|
|viewTime|string|false|none||none|

