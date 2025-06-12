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

# CommentController

## POST addComment

POST /api/comments

> Body 请求参数

```json
{
  "blogId": 0,
  "content": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|header|string| 是 |none|
|body|body|[CommentRequest](#schemacommentrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "commentId": 0,
  "userId": "",
  "content": "",
  "commentTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityCommentResponse](#schemaresponseentitycommentresponse)|

## GET getCommentsByBlogId

GET /api/comments/blog/{blogId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|path|integer| 是 |none|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "content": [
    {
      "commentId": 0,
      "userId": "",
      "content": "",
      "commentTime": ""
    }
  ],
  "pageable": {
    "paged": false,
    "unpaged": false,
    "pageNumber": 0,
    "pageSize": 0,
    "offset": 0,
    "sort": [
      {
        "direction": "",
        "property": "",
        "ignoreCase": false,
        "nullHandling": "",
        "ascending": false,
        "descending": false
      }
    ]
  },
  "total": 0,
  "empty": false,
  "number": 0,
  "size": 0,
  "numberOfElements": 0,
  "sort": [
    {
      "direction": "",
      "property": "",
      "ignoreCase": false,
      "nullHandling": "",
      "ascending": false,
      "descending": false
    }
  ],
  "first": false,
  "last": false,
  "totalPages": 0,
  "totalElements": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityPageCommentResponse](#schemaresponseentitypagecommentresponse)|

## DELETE deleteComment

DELETE /api/comments/{commentId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|commentId|path|integer| 是 |none|
|userId|header|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET getCommentCount

GET /api/comments/blog/{blogId}/count

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|path|integer| 是 |none|

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

<h2 id="tocS_Sort">Sort</h2>

<a id="schemasort"></a>
<a id="schema_Sort"></a>
<a id="tocSsort"></a>
<a id="tocssort"></a>

```json
{
  "direction": "ASC",
  "property": "string",
  "ignoreCase": true,
  "nullHandling": "NATIVE",
  "ascending": true,
  "descending": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|direction|string|false|none||none|
|property|string|false|none||none|
|ignoreCase|boolean|false|none||none|
|nullHandling|string|false|none||none|
|ascending|boolean|false|none||none|
|descending|boolean|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|direction|ASC|
|direction|DESC|
|nullHandling|NATIVE|
|nullHandling|NULLS_FIRST|
|nullHandling|NULLS_LAST|

<h2 id="tocS_Pageable">Pageable</h2>

<a id="schemapageable"></a>
<a id="schema_Pageable"></a>
<a id="tocSpageable"></a>
<a id="tocspageable"></a>

```json
{
  "paged": true,
  "unpaged": true,
  "pageNumber": 0,
  "pageSize": 0,
  "offset": 0,
  "sort": [
    {
      "direction": "ASC",
      "property": "string",
      "ignoreCase": true,
      "nullHandling": "NATIVE",
      "ascending": true,
      "descending": true
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|paged|boolean|false|none||none|
|unpaged|boolean|false|none||none|
|pageNumber|integer|false|none||none|
|pageSize|integer|false|none||none|
|offset|integer(int64)|false|none||none|
|sort|[[Sort](#schemasort)]|false|none||none|

<h2 id="tocS_ResponseEntityCommentResponse">ResponseEntityCommentResponse</h2>

<a id="schemaresponseentitycommentresponse"></a>
<a id="schema_ResponseEntityCommentResponse"></a>
<a id="tocSresponseentitycommentresponse"></a>
<a id="tocsresponseentitycommentresponse"></a>

```json
{
  "commentId": 0,
  "userId": "string",
  "content": "string",
  "commentTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|commentId|integer(int64)|false|none||none|
|userId|string|false|none||none|
|content|string|false|none||none|
|commentTime|string|false|none||none|

<h2 id="tocS_CommentRequest">CommentRequest</h2>

<a id="schemacommentrequest"></a>
<a id="schema_CommentRequest"></a>
<a id="tocScommentrequest"></a>
<a id="tocscommentrequest"></a>

```json
{
  "blogId": 0,
  "content": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|blogId|integer(int64)|true|none||none|
|content|string|true|none||none|

<h2 id="tocS_CommentResponse">CommentResponse</h2>

<a id="schemacommentresponse"></a>
<a id="schema_CommentResponse"></a>
<a id="tocScommentresponse"></a>
<a id="tocscommentresponse"></a>

```json
{
  "commentId": 0,
  "userId": "string",
  "content": "string",
  "commentTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|commentId|integer(int64)|false|none||none|
|userId|string|false|none||none|
|content|string|false|none||none|
|commentTime|string|false|none||none|

<h2 id="tocS_ResponseEntityPageCommentResponse">ResponseEntityPageCommentResponse</h2>

<a id="schemaresponseentitypagecommentresponse"></a>
<a id="schema_ResponseEntityPageCommentResponse"></a>
<a id="tocSresponseentitypagecommentresponse"></a>
<a id="tocsresponseentitypagecommentresponse"></a>

```json
{
  "content": [
    {
      "commentId": 0,
      "userId": "string",
      "content": "string",
      "commentTime": "string"
    }
  ],
  "pageable": {
    "paged": true,
    "unpaged": true,
    "pageNumber": 0,
    "pageSize": 0,
    "offset": 0,
    "sort": [
      {
        "direction": "ASC",
        "property": "string",
        "ignoreCase": true,
        "nullHandling": "NATIVE",
        "ascending": true,
        "descending": true
      }
    ]
  },
  "total": 0,
  "empty": true,
  "number": 0,
  "size": 0,
  "numberOfElements": 0,
  "sort": [
    {
      "direction": "ASC",
      "property": "string",
      "ignoreCase": true,
      "nullHandling": "NATIVE",
      "ascending": true,
      "descending": true
    }
  ],
  "first": true,
  "last": true,
  "totalPages": 0,
  "totalElements": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|content|[[CommentResponse](#schemacommentresponse)]|false|none||none|
|pageable|[Pageable](#schemapageable)|false|none||none|
|total|integer(int64)|false|none||none|
|empty|boolean|false|none||none|
|number|integer|false|none||none|
|size|integer|false|none||none|
|numberOfElements|integer|false|none||none|
|sort|[[Sort](#schemasort)]|false|none||none|
|first|boolean|false|none||none|
|last|boolean|false|none||none|
|totalPages|integer|false|none||none|
|totalElements|integer(int64)|false|none||none|

