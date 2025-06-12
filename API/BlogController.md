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

# BlogController

## POST publishBlog

POST /api/social/blogs

> Body 请求参数

```json
{
  "userId": "string",
  "title": "string",
  "content": "stringstri",
  "images": [
    "string"
  ],
  "attractionIds": [
    0
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[BlogRequest](#schemablogrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "blogId": 0,
  "userId": "",
  "title": "",
  "content": "",
  "images": [
    ""
  ],
  "tags": [
    ""
  ],
  "publishTime": "",
  "viewCount": 0,
  "likeCount": 0,
  "shareCount": 0,
  "commentCount": 0,
  "hotScore": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityBlogResponse](#schemaresponseentityblogresponse)|

## GET getBlog

GET /api/social/blogs/{blogId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "blogId": 0,
  "userId": "",
  "title": "",
  "content": "",
  "images": [
    ""
  ],
  "tags": [
    ""
  ],
  "publishTime": "",
  "viewCount": 0,
  "likeCount": 0,
  "shareCount": 0,
  "commentCount": 0,
  "hotScore": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityBlogResponse](#schemaresponseentityblogresponse)|

## GET searchBlogs

GET /api/social/blogs/search

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 是 |none|
|searchType|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "content": [
    {
      "blogId": 0,
      "title": "",
      "userId": "",
      "publishTime": "",
      "likeCount": 0,
      "viewCount": 0,
      "commentCount": 0
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityPageBlogSummary](#schemaresponseentitypageblogsummary)|

## GET getUserBlogs

GET /api/social/blogs/user/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|string| 是 |none|

> 返回示例

> 200 Response

```json
[
  {
    "blogId": 0,
    "title": "",
    "userId": "",
    "publishTime": "",
    "likeCount": 0,
    "viewCount": 0,
    "commentCount": 0
  }
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[[ListBlogSummary](#schemalistblogsummary)]|false|none||none|
|» blogId|integer(int64)|false|none||none|
|» title|string|false|none||none|
|» userId|string|false|none||none|
|» publishTime|string|false|none||none|
|» likeCount|integer|false|none||none|
|» viewCount|integer|false|none||none|
|» commentCount|integer|false|none||none|

## GET getRecommendedBlogs

GET /api/social/blogs/recommend

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|query|string| 是 |none|
|strategy|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "content": [
    {
      "blogId": 0,
      "title": "",
      "userId": "",
      "publishTime": "",
      "likeCount": 0,
      "viewCount": 0,
      "commentCount": 0
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityPageBlogSummary](#schemaresponseentitypageblogsummary)|

## GET getBlogRanking

GET /api/social/blogs/ranking

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|sortBy|query|string| 是 |none|
|timeRange|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "content": [
    {
      "blogId": 0,
      "title": "",
      "userId": "",
      "publishTime": "",
      "likeCount": 0,
      "viewCount": 0,
      "commentCount": 0
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityPageBlogSummary](#schemaresponseentitypageblogsummary)|

## GET getBlogTags

GET /api/social/blogs/{blogId}/tags

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|blogId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
[
  ""
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

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

<h2 id="tocS_BlogRequest">BlogRequest</h2>

<a id="schemablogrequest"></a>
<a id="schema_BlogRequest"></a>
<a id="tocSblogrequest"></a>
<a id="tocsblogrequest"></a>

```json
{
  "userId": "string",
  "title": "string",
  "content": "stringstri",
  "images": [
    "string"
  ],
  "attractionIds": [
    0
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|userId|string|true|none||none|
|title|string|true|none||none|
|content|string|true|none||none|
|images|[string]|false|none||none|
|attractionIds|[integer]|false|none||none|

<h2 id="tocS_ResponseEntityBlogResponse">ResponseEntityBlogResponse</h2>

<a id="schemaresponseentityblogresponse"></a>
<a id="schema_ResponseEntityBlogResponse"></a>
<a id="tocSresponseentityblogresponse"></a>
<a id="tocsresponseentityblogresponse"></a>

```json
{
  "blogId": 0,
  "userId": "string",
  "title": "string",
  "content": "string",
  "images": [
    "string"
  ],
  "tags": [
    "string"
  ],
  "publishTime": "string",
  "viewCount": 0,
  "likeCount": 0,
  "shareCount": 0,
  "commentCount": 0,
  "hotScore": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|blogId|integer(int64)|false|none||none|
|userId|string|false|none||none|
|title|string|false|none||none|
|content|string|false|none||none|
|images|[string]|false|none||none|
|tags|[string]|false|none||none|
|publishTime|string|false|none||none|
|viewCount|integer|false|none||none|
|likeCount|integer|false|none||none|
|shareCount|integer|false|none||none|
|commentCount|integer|false|none||none|
|hotScore|number|false|none||none|

<h2 id="tocS_BlogSummary">BlogSummary</h2>

<a id="schemablogsummary"></a>
<a id="schema_BlogSummary"></a>
<a id="tocSblogsummary"></a>
<a id="tocsblogsummary"></a>

```json
{
  "blogId": 0,
  "title": "string",
  "userId": "string",
  "publishTime": "string",
  "likeCount": 0,
  "viewCount": 0,
  "commentCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|blogId|integer(int64)|false|none||none|
|title|string|false|none||none|
|userId|string|false|none||none|
|publishTime|string|false|none||none|
|likeCount|integer|false|none||none|
|viewCount|integer|false|none||none|
|commentCount|integer|false|none||none|

<h2 id="tocS_ResponseEntityPageBlogSummary">ResponseEntityPageBlogSummary</h2>

<a id="schemaresponseentitypageblogsummary"></a>
<a id="schema_ResponseEntityPageBlogSummary"></a>
<a id="tocSresponseentitypageblogsummary"></a>
<a id="tocsresponseentitypageblogsummary"></a>

```json
{
  "content": [
    {
      "blogId": 0,
      "title": "string",
      "userId": "string",
      "publishTime": "string",
      "likeCount": 0,
      "viewCount": 0,
      "commentCount": 0
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
|content|[[BlogSummary](#schemablogsummary)]|false|none||none|
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

<h2 id="tocS_ListBlogSummary">ListBlogSummary</h2>

<a id="schemalistblogsummary"></a>
<a id="schema_ListBlogSummary"></a>
<a id="tocSlistblogsummary"></a>
<a id="tocslistblogsummary"></a>

```json
{
  "blogId": 0,
  "title": "string",
  "userId": "string",
  "publishTime": "string",
  "likeCount": 0,
  "viewCount": 0,
  "commentCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|blogId|integer(int64)|false|none||none|
|title|string|false|none||none|
|userId|string|false|none||none|
|publishTime|string|false|none||none|
|likeCount|integer|false|none||none|
|viewCount|integer|false|none||none|
|commentCount|integer|false|none||none|

