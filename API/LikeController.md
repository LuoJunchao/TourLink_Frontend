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

# LikeController

## POST likeBlog

POST /api/likes

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|query|integer| 是 |none|
|userId|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "blogId": 0,
  "userId": "",
  "liked": false,
  "likeTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityLikeResponse](#schemaresponseentitylikeresponse)|

## DELETE unlikeBlog

DELETE /api/likes

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|query|integer| 是 |none|
|userId|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "blogId": 0,
  "userId": "",
  "liked": false,
  "likeTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityLikeResponse](#schemaresponseentitylikeresponse)|

## GET getLikeCount

GET /api/likes/count

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|query|integer| 是 |none|

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

<h2 id="tocS_ResponseEntityLikeResponse">ResponseEntityLikeResponse</h2>

<a id="schemaresponseentitylikeresponse"></a>
<a id="schema_ResponseEntityLikeResponse"></a>
<a id="tocSresponseentitylikeresponse"></a>
<a id="tocsresponseentitylikeresponse"></a>

```json
{
  "blogId": 0,
  "userId": "string",
  "liked": true,
  "likeTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|blogId|integer(int64)|false|none||none|
|userId|string|false|none||none|
|liked|boolean|false|none||true 表示点赞成功，false 表示取消点赞|
|likeTime|string|false|none||none|

