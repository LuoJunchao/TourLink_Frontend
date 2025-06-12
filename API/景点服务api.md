---
title: tourlink
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

# tourlink

Base URLs:

# Authentication

# AttractionController

## GET getAllAttractions

GET /api/attractions

> 返回示例

> 200 Response

```json
[
  {
    "attractionId": 0,
    "province": "",
    "name": "",
    "starLevel": "",
    "rating": 0,
    "price": 0,
    "salesVolume": 0,
    "region": "",
    "isFree": false,
    "recommendedPlayTime": "",
    "viewCount": 0,
    "mainImage": "",
    "averageRating": 0,
    "reviewCount": 0
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
|*anonymous*|[[ListAttractionSummary](#schemalistattractionsummary)]|false|none||none|
|» attractionId|integer(int64)|false|none||none|
|» province|string|false|none||none|
|» name|string|false|none||none|
|» starLevel|string|false|none||none|
|» rating|number|false|none||none|
|» price|number|false|none||none|
|» salesVolume|integer|false|none||none|
|» region|string|false|none||none|
|» isFree|boolean|false|none||none|
|» recommendedPlayTime|string|false|none||none|
|» viewCount|integer|false|none||none|
|» mainImage|string|false|none||主图片，用于列表展示|
|» averageRating|number|false|none||兼容旧代码|
|» reviewCount|integer|false|none||none|

## POST createAttraction

POST /api/attractions

> Body 请求参数

```json
{
  "province": "string",
  "name": "string",
  "starLevel": "string",
  "rating": 5,
  "price": 0,
  "salesVolume": 0,
  "region": "string",
  "coordinates": "string",
  "description": "string",
  "isFree": true,
  "address": "string",
  "tags": [
    "string"
  ],
  "recommendedPlayTime": "string",
  "images": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AttractionRequest](#schemaattractionrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "attractionId": 0,
  "province": "",
  "name": "",
  "starLevel": "",
  "rating": 0,
  "price": 0,
  "salesVolume": 0,
  "region": "",
  "coordinates": "",
  "description": "",
  "isFree": false,
  "address": "",
  "tags": [
    ""
  ],
  "recommendedPlayTime": "",
  "createdTime": "",
  "updatedTime": "",
  "viewCount": 0,
  "isActive": false,
  "isFeatured": false,
  "images": [
    ""
  ],
  "averageRating": 0,
  "reviewCount": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionResponse](#schemaresponseentityattractionresponse)|

## GET getAttractionsPaged

GET /api/attractions/paged

> 返回示例

> 200 Response

```json
{
  "content": [
    {
      "attractionId": 0,
      "province": "",
      "name": "",
      "starLevel": "",
      "rating": 0,
      "price": 0,
      "salesVolume": 0,
      "region": "",
      "isFree": false,
      "recommendedPlayTime": "",
      "viewCount": 0,
      "mainImage": "",
      "averageRating": 0,
      "reviewCount": 0
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityPageAttractionSummary](#schemaresponseentitypageattractionsummary)|

## GET getAttractionById

GET /api/attractions/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "attractionId": 0,
  "province": "",
  "name": "",
  "starLevel": "",
  "rating": 0,
  "price": 0,
  "salesVolume": 0,
  "region": "",
  "coordinates": "",
  "description": "",
  "isFree": false,
  "address": "",
  "tags": [
    ""
  ],
  "recommendedPlayTime": "",
  "createdTime": "",
  "updatedTime": "",
  "viewCount": 0,
  "isActive": false,
  "isFeatured": false,
  "images": [
    ""
  ],
  "averageRating": 0,
  "reviewCount": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionResponse](#schemaresponseentityattractionresponse)|

## PUT updateAttraction

PUT /api/attractions/{id}

> Body 请求参数

```json
{
  "province": "string",
  "name": "string",
  "starLevel": "string",
  "rating": 5,
  "price": 0,
  "salesVolume": 0,
  "region": "string",
  "coordinates": "string",
  "description": "string",
  "isFree": true,
  "address": "string",
  "tags": [
    "string"
  ],
  "recommendedPlayTime": "string",
  "images": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|body|body|[AttractionRequest](#schemaattractionrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "attractionId": 0,
  "province": "",
  "name": "",
  "starLevel": "",
  "rating": 0,
  "price": 0,
  "salesVolume": 0,
  "region": "",
  "coordinates": "",
  "description": "",
  "isFree": false,
  "address": "",
  "tags": [
    ""
  ],
  "recommendedPlayTime": "",
  "createdTime": "",
  "updatedTime": "",
  "viewCount": 0,
  "isActive": false,
  "isFeatured": false,
  "images": [
    ""
  ],
  "averageRating": 0,
  "reviewCount": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionResponse](#schemaresponseentityattractionresponse)|

## DELETE deleteAttraction

DELETE /api/attractions/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

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

## GET searchAttractions

GET /api/attractions/search

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "content": [
    {
      "attractionId": 0,
      "province": "",
      "name": "",
      "starLevel": "",
      "rating": 0,
      "price": 0,
      "salesVolume": 0,
      "region": "",
      "isFree": false,
      "recommendedPlayTime": "",
      "viewCount": 0,
      "mainImage": "",
      "averageRating": 0,
      "reviewCount": 0
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityPageAttractionSummary](#schemaresponseentitypageattractionsummary)|

## GET getFeaturedAttractions

GET /api/attractions/featured

> 返回示例

> 200 Response

```json
[
  {
    "attractionId": 0,
    "province": "",
    "name": "",
    "starLevel": "",
    "rating": 0,
    "price": 0,
    "salesVolume": 0,
    "region": "",
    "isFree": false,
    "recommendedPlayTime": "",
    "viewCount": 0,
    "mainImage": "",
    "averageRating": 0,
    "reviewCount": 0
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
|*anonymous*|[[ListAttractionSummary](#schemalistattractionsummary)]|false|none||none|
|» attractionId|integer(int64)|false|none||none|
|» province|string|false|none||none|
|» name|string|false|none||none|
|» starLevel|string|false|none||none|
|» rating|number|false|none||none|
|» price|number|false|none||none|
|» salesVolume|integer|false|none||none|
|» region|string|false|none||none|
|» isFree|boolean|false|none||none|
|» recommendedPlayTime|string|false|none||none|
|» viewCount|integer|false|none||none|
|» mainImage|string|false|none||主图片，用于列表展示|
|» averageRating|number|false|none||兼容旧代码|
|» reviewCount|integer|false|none||none|

## GET getTopRatedAttractions

GET /api/attractions/top-rated

> 返回示例

> 200 Response

```json
{
  "content": [
    {
      "attractionId": 0,
      "province": "",
      "name": "",
      "starLevel": "",
      "rating": 0,
      "price": 0,
      "salesVolume": 0,
      "region": "",
      "isFree": false,
      "recommendedPlayTime": "",
      "viewCount": 0,
      "mainImage": "",
      "averageRating": 0,
      "reviewCount": 0
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityPageAttractionSummary](#schemaresponseentitypageattractionsummary)|

## GET getMostViewedAttractions

GET /api/attractions/most-viewed

> 返回示例

> 200 Response

```json
{
  "content": [
    {
      "attractionId": 0,
      "province": "",
      "name": "",
      "starLevel": "",
      "rating": 0,
      "price": 0,
      "salesVolume": 0,
      "region": "",
      "isFree": false,
      "recommendedPlayTime": "",
      "viewCount": 0,
      "mainImage": "",
      "averageRating": 0,
      "reviewCount": 0
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityPageAttractionSummary](#schemaresponseentitypageattractionsummary)|

## GET 获取景点标签信息

GET /api/attractions/{id}/tags

该接口专为微服务间通信设计，返回景点的标签信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |景点ID|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": {
    "attractionId": 0,
    "attractionName": "",
    "tags": [
      ""
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseAttractionTagsDTO](#schemaresponseentityapiresponseattractiontagsdto)|

## GET 批量获取多个景点的标签信息

GET /api/attractions/batch/tags

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|ids|query|string| 是 |景点ID列表，以逗号分隔|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": [
    {
      "attractionId": 0,
      "attractionName": "",
      "tags": [
        ""
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseListAttractionTagsDTO](#schemaresponseentityapiresponselistattractiontagsdto)|

# Excel导入控制器

## POST 导入景点数据

POST /api/attractions/import/excel

> Body 请求参数

```yaml
file: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» file|body|string(binary)| 是 |Excel文件|

> 返回示例

> 200 Response

```json
{
  "totalCount": 0,
  "successCount": 0,
  "failCount": 0,
  "errors": [
    ""
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityImportResultDTO](#schemaresponseentityimportresultdto)|

## GET 下载景点导入模板

GET /api/attractions/import/template

> 返回示例

> 200 Response

```json
{
  "inputStream": {},
  "readable": false,
  "open": false,
  "file": {
    "path": "",
    "name": "",
    "parent": "",
    "parentFile": {
      "path": "",
      "name": "",
      "parent": "",
      "parentFile": {},
      "absolute": false,
      "absolutePath": "",
      "absoluteFile": {},
      "canonicalPath": "",
      "canonicalFile": {},
      "directory": false,
      "file": false,
      "hidden": false,
      "lastModified": 0,
      "writable": false,
      "readable": false,
      "executable": false,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "absolute": false,
    "absolutePath": "",
    "absoluteFile": {
      "path": "",
      "name": "",
      "parent": "",
      "parentFile": {},
      "absolute": false,
      "absolutePath": "",
      "absoluteFile": {},
      "canonicalPath": "",
      "canonicalFile": {},
      "directory": false,
      "file": false,
      "hidden": false,
      "lastModified": 0,
      "writable": false,
      "readable": false,
      "executable": false,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "canonicalPath": "",
    "canonicalFile": {
      "path": "",
      "name": "",
      "parent": "",
      "parentFile": {},
      "absolute": false,
      "absolutePath": "",
      "absoluteFile": {},
      "canonicalPath": "",
      "canonicalFile": {},
      "directory": false,
      "file": false,
      "hidden": false,
      "lastModified": 0,
      "writable": false,
      "readable": false,
      "executable": false,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "directory": false,
    "file": false,
    "hidden": false,
    "lastModified": 0,
    "writable": false,
    "readable": false,
    "executable": false,
    "totalSpace": 0,
    "freeSpace": 0,
    "usableSpace": 0
  },
  "uRL": "",
  "uRI": {
    "string": "",
    "absolute": false,
    "opaque": false,
    "rawSchemeSpecificPart": "",
    "rawAuthority": "",
    "rawUserInfo": "",
    "rawPath": "",
    "rawQuery": "",
    "rawFragment": ""
  },
  "filename": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityResource](#schemaresponseentityresource)|

# 景点标签控制器

## GET 获取景点标签信息

GET /api/attractions/tags/{attractionId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |景点ID|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": {
    "attractionId": 0,
    "attractionName": "",
    "tags": [
      ""
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseAttractionTagsDTO](#schemaresponseentityapiresponseattractiontagsdto)|

## GET 批量获取多个景点的标签信息

GET /api/attractions/tags/batch

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|ids|query|string| 是 |景点ID列表，以逗号分隔|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": [
    {
      "attractionId": 0,
      "attractionName": "",
      "tags": [
        ""
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseListAttractionTagsDTO](#schemaresponseentityapiresponselistattractiontagsdto)|

## GET 获取景点标签信息

GET /api/social/attraction-tags/{attractionId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |景点ID|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": {
    "attractionId": 0,
    "attractionName": "",
    "tags": [
      ""
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseAttractionTagsDTO](#schemaresponseentityapiresponseattractiontagsdto)|

## GET 批量获取多个景点的标签信息

GET /api/social/attraction-tags/batch

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|ids|query|string| 是 |景点ID列表，以逗号分隔|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": [
    {
      "attractionId": 0,
      "attractionName": "",
      "tags": [
        ""
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseListAttractionTagsDTO](#schemaresponseentityapiresponselistattractiontagsdto)|

# AttractionReviewController

## GET getAllReviews

GET /api/attraction-reviews

> 返回示例

> 200 Response

```json
[
  {
    "reviewId": 0,
    "attraction": {
      "attractionId": 0,
      "province": "",
      "name": "",
      "starLevel": "",
      "rating": 0,
      "averageRating": 0,
      "price": 0,
      "salesVolume": 0,
      "region": "",
      "coordinates": "",
      "description": "",
      "isFree": false,
      "address": "",
      "tags": [
        ""
      ],
      "recommendedPlayTime": "",
      "createdTime": "",
      "updatedTime": "",
      "viewCount": 0,
      "reviewCount": 0,
      "isActive": false,
      "isFeatured": false,
      "images": [
        ""
      ],
      "reviews": [
        {
          "reviewId": 0,
          "attraction": {
            "attractionId": 0,
            "province": "",
            "name": "",
            "starLevel": "",
            "rating": 0,
            "averageRating": 0,
            "price": 0,
            "salesVolume": 0,
            "region": "",
            "coordinates": "",
            "description": "",
            "isFree": false,
            "address": "",
            "tags": [
              ""
            ],
            "recommendedPlayTime": "",
            "createdTime": "",
            "updatedTime": "",
            "viewCount": 0,
            "reviewCount": 0,
            "isActive": false,
            "isFeatured": false,
            "images": [
              ""
            ],
            "reviews": [
              {
                "reviewId": 0,
                "attraction": {},
                "userId": 0,
                "title": "",
                "content": "",
                "rating": 0,
                "createdTime": "",
                "updatedTime": "",
                "likeCount": 0
              }
            ]
          },
          "userId": 0,
          "title": "",
          "content": "",
          "rating": 0,
          "createdTime": "",
          "updatedTime": "",
          "likeCount": 0
        }
      ]
    },
    "userId": 0,
    "title": "",
    "content": "",
    "rating": 0,
    "createdTime": "",
    "updatedTime": "",
    "likeCount": 0
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
|*anonymous*|[[ListAttractionReview](#schemalistattractionreview)]|false|none||none|
|» reviewId|integer(int64)|false|none||none|
|» attraction|object|false|none||none|
|» userId|integer(int64)|false|none||none|
|» title|string|false|none||none|
|» content|string|false|none||none|
|» rating|number|false|none||none|
|» createdTime|string|false|none||none|
|» updatedTime|string|false|none||none|
|» likeCount|integer|false|none||none|

## POST createReview

POST /api/attraction-reviews

> Body 请求参数

```json
{
  "reviewId": 0,
  "attraction": {},
  "userId": 0,
  "title": "string",
  "content": "string",
  "rating": 0,
  "createdTime": "string",
  "updatedTime": "string",
  "likeCount": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AttractionReview](#schemaattractionreview)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "reviewId": 0,
  "attraction": {
    "attractionId": 0,
    "province": "",
    "name": "",
    "starLevel": "",
    "rating": 0,
    "averageRating": 0,
    "price": 0,
    "salesVolume": 0,
    "region": "",
    "coordinates": "",
    "description": "",
    "isFree": false,
    "address": "",
    "tags": [
      ""
    ],
    "recommendedPlayTime": "",
    "createdTime": "",
    "updatedTime": "",
    "viewCount": 0,
    "reviewCount": 0,
    "isActive": false,
    "isFeatured": false,
    "images": [
      ""
    ],
    "reviews": [
      {
        "reviewId": 0,
        "attraction": {
          "attractionId": 0,
          "province": "",
          "name": "",
          "starLevel": "",
          "rating": 0,
          "averageRating": 0,
          "price": 0,
          "salesVolume": 0,
          "region": "",
          "coordinates": "",
          "description": "",
          "isFree": false,
          "address": "",
          "tags": [
            ""
          ],
          "recommendedPlayTime": "",
          "createdTime": "",
          "updatedTime": "",
          "viewCount": 0,
          "reviewCount": 0,
          "isActive": false,
          "isFeatured": false,
          "images": [
            ""
          ],
          "reviews": [
            {
              "reviewId": 0,
              "attraction": {},
              "userId": 0,
              "title": "",
              "content": "",
              "rating": 0,
              "createdTime": "",
              "updatedTime": "",
              "likeCount": 0
            }
          ]
        },
        "userId": 0,
        "title": "",
        "content": "",
        "rating": 0,
        "createdTime": "",
        "updatedTime": "",
        "likeCount": 0
      }
    ]
  },
  "userId": 0,
  "title": "",
  "content": "",
  "rating": 0,
  "createdTime": "",
  "updatedTime": "",
  "likeCount": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionReview](#schemaresponseentityattractionreview)|

## GET getReviewById

GET /api/attraction-reviews/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "reviewId": 0,
  "attraction": {
    "attractionId": 0,
    "province": "",
    "name": "",
    "starLevel": "",
    "rating": 0,
    "averageRating": 0,
    "price": 0,
    "salesVolume": 0,
    "region": "",
    "coordinates": "",
    "description": "",
    "isFree": false,
    "address": "",
    "tags": [
      ""
    ],
    "recommendedPlayTime": "",
    "createdTime": "",
    "updatedTime": "",
    "viewCount": 0,
    "reviewCount": 0,
    "isActive": false,
    "isFeatured": false,
    "images": [
      ""
    ],
    "reviews": [
      {
        "reviewId": 0,
        "attraction": {
          "attractionId": 0,
          "province": "",
          "name": "",
          "starLevel": "",
          "rating": 0,
          "averageRating": 0,
          "price": 0,
          "salesVolume": 0,
          "region": "",
          "coordinates": "",
          "description": "",
          "isFree": false,
          "address": "",
          "tags": [
            ""
          ],
          "recommendedPlayTime": "",
          "createdTime": "",
          "updatedTime": "",
          "viewCount": 0,
          "reviewCount": 0,
          "isActive": false,
          "isFeatured": false,
          "images": [
            ""
          ],
          "reviews": [
            {
              "reviewId": 0,
              "attraction": {},
              "userId": 0,
              "title": "",
              "content": "",
              "rating": 0,
              "createdTime": "",
              "updatedTime": "",
              "likeCount": 0
            }
          ]
        },
        "userId": 0,
        "title": "",
        "content": "",
        "rating": 0,
        "createdTime": "",
        "updatedTime": "",
        "likeCount": 0
      }
    ]
  },
  "userId": 0,
  "title": "",
  "content": "",
  "rating": 0,
  "createdTime": "",
  "updatedTime": "",
  "likeCount": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionReview](#schemaresponseentityattractionreview)|

## DELETE deleteReview

DELETE /api/attraction-reviews/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

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

## GET getReviewsByAttraction

GET /api/attraction-reviews/attraction/{attractionId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
[
  {
    "reviewId": 0,
    "attraction": {
      "attractionId": 0,
      "province": "",
      "name": "",
      "starLevel": "",
      "rating": 0,
      "averageRating": 0,
      "price": 0,
      "salesVolume": 0,
      "region": "",
      "coordinates": "",
      "description": "",
      "isFree": false,
      "address": "",
      "tags": [
        ""
      ],
      "recommendedPlayTime": "",
      "createdTime": "",
      "updatedTime": "",
      "viewCount": 0,
      "reviewCount": 0,
      "isActive": false,
      "isFeatured": false,
      "images": [
        ""
      ],
      "reviews": [
        {
          "reviewId": 0,
          "attraction": {
            "attractionId": 0,
            "province": "",
            "name": "",
            "starLevel": "",
            "rating": 0,
            "averageRating": 0,
            "price": 0,
            "salesVolume": 0,
            "region": "",
            "coordinates": "",
            "description": "",
            "isFree": false,
            "address": "",
            "tags": [
              ""
            ],
            "recommendedPlayTime": "",
            "createdTime": "",
            "updatedTime": "",
            "viewCount": 0,
            "reviewCount": 0,
            "isActive": false,
            "isFeatured": false,
            "images": [
              ""
            ],
            "reviews": [
              {
                "reviewId": 0,
                "attraction": {},
                "userId": 0,
                "title": "",
                "content": "",
                "rating": 0,
                "createdTime": "",
                "updatedTime": "",
                "likeCount": 0
              }
            ]
          },
          "userId": 0,
          "title": "",
          "content": "",
          "rating": 0,
          "createdTime": "",
          "updatedTime": "",
          "likeCount": 0
        }
      ]
    },
    "userId": 0,
    "title": "",
    "content": "",
    "rating": 0,
    "createdTime": "",
    "updatedTime": "",
    "likeCount": 0
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
|*anonymous*|[[ListAttractionReview](#schemalistattractionreview)]|false|none||none|
|» reviewId|integer(int64)|false|none||none|
|» attraction|object|false|none||none|
|» userId|integer(int64)|false|none||none|
|» title|string|false|none||none|
|» content|string|false|none||none|
|» rating|number|false|none||none|
|» createdTime|string|false|none||none|
|» updatedTime|string|false|none||none|
|» likeCount|integer|false|none||none|

# AttractionFavoriteController

## GET getUserFavorites

GET /api/attraction-favorites/user/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
[
  {
    "favoriteId": 0,
    "attraction": {
      "attractionId": 0,
      "province": "",
      "name": "",
      "starLevel": "",
      "rating": 0,
      "averageRating": 0,
      "price": 0,
      "salesVolume": 0,
      "region": "",
      "coordinates": "",
      "description": "",
      "isFree": false,
      "address": "",
      "tags": [
        ""
      ],
      "recommendedPlayTime": "",
      "createdTime": "",
      "updatedTime": "",
      "viewCount": 0,
      "reviewCount": 0,
      "isActive": false,
      "isFeatured": false,
      "images": [
        ""
      ],
      "reviews": [
        {
          "reviewId": 0,
          "attraction": {
            "attractionId": 0,
            "province": "",
            "name": "",
            "starLevel": "",
            "rating": 0,
            "averageRating": 0,
            "price": 0,
            "salesVolume": 0,
            "region": "",
            "coordinates": "",
            "description": "",
            "isFree": false,
            "address": "",
            "tags": [
              ""
            ],
            "recommendedPlayTime": "",
            "createdTime": "",
            "updatedTime": "",
            "viewCount": 0,
            "reviewCount": 0,
            "isActive": false,
            "isFeatured": false,
            "images": [
              ""
            ],
            "reviews": [
              {
                "reviewId": 0,
                "attraction": {},
                "userId": 0,
                "title": "",
                "content": "",
                "rating": 0,
                "createdTime": "",
                "updatedTime": "",
                "likeCount": 0
              }
            ]
          },
          "userId": 0,
          "title": "",
          "content": "",
          "rating": 0,
          "createdTime": "",
          "updatedTime": "",
          "likeCount": 0
        }
      ]
    },
    "userId": 0,
    "createdTime": ""
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
|*anonymous*|[[ListAttractionFavorite](#schemalistattractionfavorite)]|false|none||none|
|» favoriteId|integer(int64)|false|none||none|
|» attraction|object|false|none||none|
|» userId|integer(int64)|false|none||none|
|» createdTime|string|false|none||none|

## GET isFavorite

GET /api/attraction-favorites/attraction/{attractionId}/user/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |none|
|userId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
true
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|boolean|

## POST addFavoriteByIds

POST /api/attraction-favorites/attraction/{attractionId}/user/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |none|
|userId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "favoriteId": 0,
  "attraction": {
    "attractionId": 0,
    "province": "",
    "name": "",
    "starLevel": "",
    "rating": 0,
    "averageRating": 0,
    "price": 0,
    "salesVolume": 0,
    "region": "",
    "coordinates": "",
    "description": "",
    "isFree": false,
    "address": "",
    "tags": [
      ""
    ],
    "recommendedPlayTime": "",
    "createdTime": "",
    "updatedTime": "",
    "viewCount": 0,
    "reviewCount": 0,
    "isActive": false,
    "isFeatured": false,
    "images": [
      ""
    ],
    "reviews": [
      {
        "reviewId": 0,
        "attraction": {
          "attractionId": 0,
          "province": "",
          "name": "",
          "starLevel": "",
          "rating": 0,
          "averageRating": 0,
          "price": 0,
          "salesVolume": 0,
          "region": "",
          "coordinates": "",
          "description": "",
          "isFree": false,
          "address": "",
          "tags": [
            ""
          ],
          "recommendedPlayTime": "",
          "createdTime": "",
          "updatedTime": "",
          "viewCount": 0,
          "reviewCount": 0,
          "isActive": false,
          "isFeatured": false,
          "images": [
            ""
          ],
          "reviews": [
            {
              "reviewId": 0,
              "attraction": {},
              "userId": 0,
              "title": "",
              "content": "",
              "rating": 0,
              "createdTime": "",
              "updatedTime": "",
              "likeCount": 0
            }
          ]
        },
        "userId": 0,
        "title": "",
        "content": "",
        "rating": 0,
        "createdTime": "",
        "updatedTime": "",
        "likeCount": 0
      }
    ]
  },
  "userId": 0,
  "createdTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionFavorite](#schemaresponseentityattractionfavorite)|

## DELETE removeFavorite

DELETE /api/attraction-favorites/attraction/{attractionId}/user/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |none|
|userId|path|integer| 是 |none|

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

## POST addFavorite

POST /api/attraction-favorites

> Body 请求参数

```json
{
  "favoriteId": 0,
  "attraction": {},
  "userId": 0,
  "createdTime": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AttractionFavorite](#schemaattractionfavorite)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "favoriteId": 0,
  "attraction": {
    "attractionId": 0,
    "province": "",
    "name": "",
    "starLevel": "",
    "rating": 0,
    "averageRating": 0,
    "price": 0,
    "salesVolume": 0,
    "region": "",
    "coordinates": "",
    "description": "",
    "isFree": false,
    "address": "",
    "tags": [
      ""
    ],
    "recommendedPlayTime": "",
    "createdTime": "",
    "updatedTime": "",
    "viewCount": 0,
    "reviewCount": 0,
    "isActive": false,
    "isFeatured": false,
    "images": [
      ""
    ],
    "reviews": [
      {
        "reviewId": 0,
        "attraction": {
          "attractionId": 0,
          "province": "",
          "name": "",
          "starLevel": "",
          "rating": 0,
          "averageRating": 0,
          "price": 0,
          "salesVolume": 0,
          "region": "",
          "coordinates": "",
          "description": "",
          "isFree": false,
          "address": "",
          "tags": [
            ""
          ],
          "recommendedPlayTime": "",
          "createdTime": "",
          "updatedTime": "",
          "viewCount": 0,
          "reviewCount": 0,
          "isActive": false,
          "isFeatured": false,
          "images": [
            ""
          ],
          "reviews": [
            {
              "reviewId": 0,
              "attraction": {},
              "userId": 0,
              "title": "",
              "content": "",
              "rating": 0,
              "createdTime": "",
              "updatedTime": "",
              "likeCount": 0
            }
          ]
        },
        "userId": 0,
        "title": "",
        "content": "",
        "rating": 0,
        "createdTime": "",
        "updatedTime": "",
        "likeCount": 0
      }
    ]
  },
  "userId": 0,
  "createdTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionFavorite](#schemaresponseentityattractionfavorite)|

# AttractionPopularityController

## GET getPopularity

GET /api/attraction-popularity/{attractionId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "popularityId": 0,
  "attractionId": 0,
  "viewCount": 0,
  "likeCount": 0,
  "shareCount": 0,
  "updatedTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionPopularity](#schemaresponseentityattractionpopularity)|

## POST incrementViewCount

POST /api/attraction-popularity/{attractionId}/view

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "popularityId": 0,
  "attractionId": 0,
  "viewCount": 0,
  "likeCount": 0,
  "shareCount": 0,
  "updatedTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionPopularity](#schemaresponseentityattractionpopularity)|

## POST incrementLikeCount

POST /api/attraction-popularity/{attractionId}/like

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "popularityId": 0,
  "attractionId": 0,
  "viewCount": 0,
  "likeCount": 0,
  "shareCount": 0,
  "updatedTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionPopularity](#schemaresponseentityattractionpopularity)|

## POST incrementShareCount

POST /api/attraction-popularity/{attractionId}/share

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|attractionId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "popularityId": 0,
  "attractionId": 0,
  "viewCount": 0,
  "likeCount": 0,
  "shareCount": 0,
  "updatedTime": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityAttractionPopularity](#schemaresponseentityattractionpopularity)|

# 标签导入控制器

## POST 导入标签数据

POST /api/tags/import/excel

> Body 请求参数

```yaml
file: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» file|body|string(binary)| 是 |Excel文件|

> 返回示例

> 200 Response

```json
{
  "totalCount": 0,
  "successCount": 0,
  "failCount": 0,
  "errors": [
    ""
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityImportResultDTO](#schemaresponseentityimportresultdto)|

## GET 下载标签导入模板

GET /api/tags/import/template

> 返回示例

> 200 Response

```json
{
  "inputStream": {},
  "readable": false,
  "open": false,
  "file": {
    "path": "",
    "name": "",
    "parent": "",
    "parentFile": {
      "path": "",
      "name": "",
      "parent": "",
      "parentFile": {},
      "absolute": false,
      "absolutePath": "",
      "absoluteFile": {},
      "canonicalPath": "",
      "canonicalFile": {},
      "directory": false,
      "file": false,
      "hidden": false,
      "lastModified": 0,
      "writable": false,
      "readable": false,
      "executable": false,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "absolute": false,
    "absolutePath": "",
    "absoluteFile": {
      "path": "",
      "name": "",
      "parent": "",
      "parentFile": {},
      "absolute": false,
      "absolutePath": "",
      "absoluteFile": {},
      "canonicalPath": "",
      "canonicalFile": {},
      "directory": false,
      "file": false,
      "hidden": false,
      "lastModified": 0,
      "writable": false,
      "readable": false,
      "executable": false,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "canonicalPath": "",
    "canonicalFile": {
      "path": "",
      "name": "",
      "parent": "",
      "parentFile": {},
      "absolute": false,
      "absolutePath": "",
      "absoluteFile": {},
      "canonicalPath": "",
      "canonicalFile": {},
      "directory": false,
      "file": false,
      "hidden": false,
      "lastModified": 0,
      "writable": false,
      "readable": false,
      "executable": false,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "directory": false,
    "file": false,
    "hidden": false,
    "lastModified": 0,
    "writable": false,
    "readable": false,
    "executable": false,
    "totalSpace": 0,
    "freeSpace": 0,
    "usableSpace": 0
  },
  "uRL": "",
  "uRI": {
    "string": "",
    "absolute": false,
    "opaque": false,
    "rawSchemeSpecificPart": "",
    "rawAuthority": "",
    "rawUserInfo": "",
    "rawPath": "",
    "rawQuery": "",
    "rawFragment": ""
  },
  "contentAsByteArray": [
    0
  ],
  "filename": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityResource](#schemaresponseentityresource)|

# 数据模型

<h2 id="tocS_ListAttractionSummary">ListAttractionSummary</h2>

<a id="schemalistattractionsummary"></a>
<a id="schema_ListAttractionSummary"></a>
<a id="tocSlistattractionsummary"></a>
<a id="tocslistattractionsummary"></a>

```json
{
  "attractionId": 0,
  "province": "string",
  "name": "string",
  "starLevel": "string",
  "rating": 0,
  "price": 0,
  "salesVolume": 0,
  "region": "string",
  "isFree": true,
  "recommendedPlayTime": "string",
  "viewCount": 0,
  "mainImage": "string",
  "averageRating": 0,
  "reviewCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|attractionId|integer(int64)|false|none||none|
|province|string|false|none||none|
|name|string|false|none||none|
|starLevel|string|false|none||none|
|rating|number|false|none||none|
|price|number|false|none||none|
|salesVolume|integer|false|none||none|
|region|string|false|none||none|
|isFree|boolean|false|none||none|
|recommendedPlayTime|string|false|none||none|
|viewCount|integer|false|none||none|
|mainImage|string|false|none||主图片，用于列表展示|
|averageRating|number|false|none||兼容旧代码|
|reviewCount|integer|false|none||none|

<h2 id="tocS_AttractionSummary">AttractionSummary</h2>

<a id="schemaattractionsummary"></a>
<a id="schema_AttractionSummary"></a>
<a id="tocSattractionsummary"></a>
<a id="tocsattractionsummary"></a>

```json
{
  "attractionId": 0,
  "province": "string",
  "name": "string",
  "starLevel": "string",
  "rating": 0,
  "price": 0,
  "salesVolume": 0,
  "region": "string",
  "isFree": true,
  "recommendedPlayTime": "string",
  "viewCount": 0,
  "mainImage": "string",
  "averageRating": 0,
  "reviewCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|attractionId|integer(int64)|false|none||none|
|province|string|false|none||none|
|name|string|false|none||none|
|starLevel|string|false|none||none|
|rating|number|false|none||none|
|price|number|false|none||none|
|salesVolume|integer|false|none||none|
|region|string|false|none||none|
|isFree|boolean|false|none||none|
|recommendedPlayTime|string|false|none||none|
|viewCount|integer|false|none||none|
|mainImage|string|false|none||主图片，用于列表展示|
|averageRating|number|false|none||兼容旧代码|
|reviewCount|integer|false|none||none|

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
|ascending|boolean|false|none||Returns whether sorting for this property shall be ascending.|
|descending|boolean|false|none||Returns whether sorting for this property shall be descending.|

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
|paged|boolean|false|none||Returns whether the current{@link Pageable} contains pagination information.|
|unpaged|boolean|false|none||Returns whether the current{@link Pageable} does not contain pagination information.|
|pageNumber|integer|false|none||Returns the page to be returned.|
|pageSize|integer|false|none||Returns the number of items to be returned.|
|offset|integer(int64)|false|none||Returns the offset to be taken according to the underlying page and page size.|
|sort|[[Sort](#schemasort)]|false|none||Returns the sorting parameters.|

<h2 id="tocS_ResponseEntityPageAttractionSummary">ResponseEntityPageAttractionSummary</h2>

<a id="schemaresponseentitypageattractionsummary"></a>
<a id="schema_ResponseEntityPageAttractionSummary"></a>
<a id="tocSresponseentitypageattractionsummary"></a>
<a id="tocsresponseentitypageattractionsummary"></a>

```json
{
  "content": "new ArrayList<>()",
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
|content|[[AttractionSummary](#schemaattractionsummary)]|false|none||none|
|pageable|[Pageable](#schemapageable)|false|none||none|
|total|integer(int64)|false|none||none|
|empty|boolean|false|none||Returns whether the current{@link Streamable} is empty.|
|number|integer|false|none||none|
|size|integer|false|none||none|
|numberOfElements|integer|false|none||none|
|sort|[[Sort](#schemasort)]|false|none||none|
|first|boolean|false|none||none|
|last|boolean|false|none||none|
|totalPages|integer|false|none||none|
|totalElements|integer(int64)|false|none||none|

<h2 id="tocS_ResponseEntityAttractionResponse">ResponseEntityAttractionResponse</h2>

<a id="schemaresponseentityattractionresponse"></a>
<a id="schema_ResponseEntityAttractionResponse"></a>
<a id="tocSresponseentityattractionresponse"></a>
<a id="tocsresponseentityattractionresponse"></a>

```json
{
  "attractionId": 0,
  "province": "string",
  "name": "string",
  "starLevel": "string",
  "rating": 0,
  "price": 0,
  "salesVolume": 0,
  "region": "string",
  "coordinates": "string",
  "description": "string",
  "isFree": true,
  "address": "string",
  "tags": [
    "string"
  ],
  "recommendedPlayTime": "string",
  "createdTime": "string",
  "updatedTime": "string",
  "viewCount": 0,
  "isActive": true,
  "isFeatured": true,
  "images": [
    "string"
  ],
  "averageRating": 0,
  "reviewCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|attractionId|integer(int64)|false|none||none|
|province|string|false|none||none|
|name|string|false|none||none|
|starLevel|string|false|none||none|
|rating|number|false|none||none|
|price|number|false|none||none|
|salesVolume|integer|false|none||none|
|region|string|false|none||none|
|coordinates|string|false|none||none|
|description|string|false|none||none|
|isFree|boolean|false|none||none|
|address|string|false|none||none|
|tags|[string]|false|none||none|
|recommendedPlayTime|string|false|none||none|
|createdTime|string|false|none||none|
|updatedTime|string|false|none||none|
|viewCount|integer|false|none||none|
|isActive|boolean|false|none||none|
|isFeatured|boolean|false|none||none|
|images|[string]|false|none||none|
|averageRating|number|false|none||兼容旧代码|
|reviewCount|integer|false|none||none|

<h2 id="tocS_AttractionRequest">AttractionRequest</h2>

<a id="schemaattractionrequest"></a>
<a id="schema_AttractionRequest"></a>
<a id="tocSattractionrequest"></a>
<a id="tocsattractionrequest"></a>

```json
{
  "province": "string",
  "name": "string",
  "starLevel": "string",
  "rating": 5,
  "price": 0,
  "salesVolume": 0,
  "region": "string",
  "coordinates": "string",
  "description": "string",
  "isFree": true,
  "address": "string",
  "tags": [
    "string"
  ],
  "recommendedPlayTime": "string",
  "images": [
    "string"
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|province|string|true|none||省份|
|name|string|true|none||名称|
|starLevel|string|false|none||星级|
|rating|number|false|none||评分|
|price|number|false|none||价格|
|salesVolume|integer|false|none||销量|
|region|string|false|none||省/市/区|
|coordinates|string|false|none||坐标|
|description|string|false|none||简介|
|isFree|boolean|false|none||是否免费|
|address|string|false|none||具体地址|
|tags|[string]|false|none||标签|
|recommendedPlayTime|string|false|none||推荐游玩时间（字符串格式，如"3-4小时"）|
|images|[string]|false|none||图片|

<h2 id="tocS_AttractionTagsDTO">AttractionTagsDTO</h2>

<a id="schemaattractiontagsdto"></a>
<a id="schema_AttractionTagsDTO"></a>
<a id="tocSattractiontagsdto"></a>
<a id="tocsattractiontagsdto"></a>

```json
{
  "attractionId": 0,
  "attractionName": "string",
  "tags": [
    "string"
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|attractionId|integer(int64)|false|none||none|
|attractionName|string|false|none||none|
|tags|[string]|false|none||none|

<h2 id="tocS_ResponseEntityApiResponseAttractionTagsDTO">ResponseEntityApiResponseAttractionTagsDTO</h2>

<a id="schemaresponseentityapiresponseattractiontagsdto"></a>
<a id="schema_ResponseEntityApiResponseAttractionTagsDTO"></a>
<a id="tocSresponseentityapiresponseattractiontagsdto"></a>
<a id="tocsresponseentityapiresponseattractiontagsdto"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "attractionId": 0,
    "attractionName": "string",
    "tags": [
      "string"
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AttractionTagsDTO](#schemaattractiontagsdto)|false|none||none|

<h2 id="tocS_ResponseEntityApiResponseListAttractionTagsDTO">ResponseEntityApiResponseListAttractionTagsDTO</h2>

<a id="schemaresponseentityapiresponselistattractiontagsdto"></a>
<a id="schema_ResponseEntityApiResponseListAttractionTagsDTO"></a>
<a id="tocSresponseentityapiresponselistattractiontagsdto"></a>
<a id="tocsresponseentityapiresponselistattractiontagsdto"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": [
    {
      "attractionId": 0,
      "attractionName": "string",
      "tags": [
        "string"
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[[AttractionTagsDTO](#schemaattractiontagsdto)]|false|none||none|

<h2 id="tocS_ResponseEntityImportResultDTO">ResponseEntityImportResultDTO</h2>

<a id="schemaresponseentityimportresultdto"></a>
<a id="schema_ResponseEntityImportResultDTO"></a>
<a id="tocSresponseentityimportresultdto"></a>
<a id="tocsresponseentityimportresultdto"></a>

```json
{
  "totalCount": 0,
  "successCount": 0,
  "failCount": 0,
  "errors": "new ArrayList<>()"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|totalCount|integer|false|none||总记录数|
|successCount|integer|false|none||成功导入数|
|failCount|integer|false|none||失败数|
|errors|[string]|false|none||错误信息列表|

<h2 id="tocS_InputStream">InputStream</h2>

<a id="schemainputstream"></a>
<a id="schema_InputStream"></a>
<a id="tocSinputstream"></a>
<a id="tocsinputstream"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_File">File</h2>

<a id="schemafile"></a>
<a id="schema_File"></a>
<a id="tocSfile"></a>
<a id="tocsfile"></a>

```json
{
  "path": "string",
  "name": "string",
  "parent": "string",
  "parentFile": {
    "path": "string",
    "name": "string",
    "parent": "string",
    "parentFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "absolute": true,
    "absolutePath": "string",
    "absoluteFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "canonicalPath": "string",
    "canonicalFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "directory": true,
    "file": true,
    "hidden": true,
    "lastModified": 0,
    "writable": true,
    "readable": true,
    "executable": true,
    "totalSpace": 0,
    "freeSpace": 0,
    "usableSpace": 0
  },
  "absolute": true,
  "absolutePath": "string",
  "absoluteFile": {
    "path": "string",
    "name": "string",
    "parent": "string",
    "parentFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "absolute": true,
    "absolutePath": "string",
    "absoluteFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "canonicalPath": "string",
    "canonicalFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "directory": true,
    "file": true,
    "hidden": true,
    "lastModified": 0,
    "writable": true,
    "readable": true,
    "executable": true,
    "totalSpace": 0,
    "freeSpace": 0,
    "usableSpace": 0
  },
  "canonicalPath": "string",
  "canonicalFile": {
    "path": "string",
    "name": "string",
    "parent": "string",
    "parentFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "absolute": true,
    "absolutePath": "string",
    "absoluteFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "canonicalPath": "string",
    "canonicalFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "directory": true,
    "file": true,
    "hidden": true,
    "lastModified": 0,
    "writable": true,
    "readable": true,
    "executable": true,
    "totalSpace": 0,
    "freeSpace": 0,
    "usableSpace": 0
  },
  "directory": true,
  "file": true,
  "hidden": true,
  "lastModified": 0,
  "writable": true,
  "readable": true,
  "executable": true,
  "totalSpace": 0,
  "freeSpace": 0,
  "usableSpace": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|path|string|false|none||This abstract pathname's normalized pathname string. A normalized<br />pathname string uses the default name-separator character and does not<br />contain any duplicate or redundant separators.|
|name|string|false|none||Returns the name of the file or directory denoted by this abstract<br />pathname.  This is just the last name in the pathname's name<br />sequence.  If the pathname's name sequence is empty, then the empty<br />string is returned.|
|parent|string|false|none||Returns the pathname string of this abstract pathname's parent, or<br />{@code null} if this pathname does not name a parent directory.<br /><br /><p> The <em>parent</em> of an abstract pathname consists of the<br />pathname's prefix, if any, and each name in the pathname's name<br />sequence except for the last.  If the name sequence is empty then<br />the pathname does not name a parent directory.|
|parentFile|[File](#schemafile)|false|none||Returns the abstract pathname of this abstract pathname's parent,<br />or{@code null} if this pathname does not name a parent<br />directory.<br /><br /><p> The <em>parent</em> of an abstract pathname consists of the<br />pathname's prefix, if any, and each name in the pathname's name<br />sequence except for the last.  If the name sequence is empty then<br />the pathname does not name a parent directory.|
|absolute|boolean|false|none||Tests whether this abstract pathname is absolute.  The definition of<br />absolute pathname is system dependent.  On UNIX systems, a pathname is<br />absolute if its prefix is{@code "/"}.  On Microsoft Windows systems, a<br />pathname is absolute if its prefix is a drive specifier followed by<br />{@code "\\"}, or if its prefix is{@code "\\\\"}.|
|absolutePath|string|false|none||Returns the absolute pathname string of this abstract pathname.<br /><br /><p> If this abstract pathname is already absolute, then the pathname<br />string is simply returned as if by the{@link #getPath}<br />method.  If this abstract pathname is the empty abstract pathname then<br />the pathname string of the current user directory, which is named by the<br />system property{@code user.dir}, is returned.  Otherwise this<br />pathname is resolved in a system-dependent way.  On UNIX systems, a<br />relative pathname is made absolute by resolving it against the current<br />user directory.  On Microsoft Windows systems, a relative pathname is made absolute<br />by resolving it against the current directory of the drive named by the<br />pathname, if any; if not, it is resolved against the current user<br />directory.|
|absoluteFile|[File](#schemafile)|false|none||Returns the abstract pathname of this abstract pathname's parent,<br />or{@code null} if this pathname does not name a parent<br />directory.<br /><br /><p> The <em>parent</em> of an abstract pathname consists of the<br />pathname's prefix, if any, and each name in the pathname's name<br />sequence except for the last.  If the name sequence is empty then<br />the pathname does not name a parent directory.|
|canonicalPath|string|false|none||Returns the canonical pathname string of this abstract pathname.<br /><br /><p> A canonical pathname is both absolute and unique.  The precise<br />definition of canonical form is system-dependent.  This method first<br />converts this pathname to absolute form if necessary, as if by invoking the<br />{@link #getAbsolutePath} method, and then maps it to its unique form in a<br />system-dependent way.  This typically involves removing redundant names<br />such as{@code "."} and{@code ".."} from the pathname, resolving<br />symbolic links (on UNIX platforms), and converting drive letters to a<br />standard case (on Microsoft Windows platforms).<br /><br /><p> Every pathname that denotes an existing file or directory has a<br />unique canonical form.  Every pathname that denotes a nonexistent file<br />or directory also has a unique canonical form.  The canonical form of<br />the pathname of a nonexistent file or directory may be different from<br />the canonical form of the same pathname after the file or directory is<br />created.  Similarly, the canonical form of the pathname of an existing<br />file or directory may be different from the canonical form of the same<br />pathname after the file or directory is deleted.|
|canonicalFile|[File](#schemafile)|false|none||Returns the abstract pathname of this abstract pathname's parent,<br />or{@code null} if this pathname does not name a parent<br />directory.<br /><br /><p> The <em>parent</em> of an abstract pathname consists of the<br />pathname's prefix, if any, and each name in the pathname's name<br />sequence except for the last.  If the name sequence is empty then<br />the pathname does not name a parent directory.|
|directory|boolean|false|none||Tests whether the file denoted by this abstract pathname is a<br />directory.<br /><br /><p> Where it is required to distinguish an I/O exception from the case<br />that the file is not a directory, or where several attributes of the<br />same file are required at the same time, then the{@link<br />    * java.nio.file.Files#readAttributes(Path,Class,LinkOption[])<br />    * Files.readAttributes} method may be used.|
|file|boolean|false|none||Tests whether the file denoted by this abstract pathname is a normal<br />file.  A file is <em>normal</em> if it is not a directory and, in<br />addition, satisfies other system-dependent criteria.  Any non-directory<br />file created by a Java application is guaranteed to be a normal file.<br /><br /><p> Where it is required to distinguish an I/O exception from the case<br />that the file is not a normal file, or where several attributes of the<br />same file are required at the same time, then the{@link<br />    * java.nio.file.Files#readAttributes(Path,Class,LinkOption[])<br />    * Files.readAttributes} method may be used.|
|hidden|boolean|false|none||Tests whether the file named by this abstract pathname is a hidden<br />file.  The exact definition of <em>hidden</em> is system-dependent.  On<br />UNIX systems, a file is considered to be hidden if its name begins with<br />a period character ({@code '.'}).  On Microsoft Windows systems, a file is<br />considered to be hidden if it has been marked as such in the filesystem.|
|lastModified|integer|false|none||Sets the last-modified time of the file or directory named by this<br />abstract pathname.<br /><br /><p> All platforms support file-modification times to the nearest second,<br />but some provide more precision.  The argument will be truncated to fit<br />the supported precision.  If the operation succeeds and no intervening<br />operations on the file take place, then the next invocation of the<br />{@link #lastModified} method will return the (possibly<br />truncated){@code time} argument that was passed to this method.|
|writable|boolean|false|none||A convenience method to set the owner's write permission for this abstract<br />pathname. On some platforms it may be possible to start the Java virtual<br />machine with special privileges that allow it to modify files that<br />disallow write operations.<br /><br /><p> An invocation of this method of the form{@code file.setWritable(arg)}<br />behaves in exactly the same way as the invocation<br /><br /><pre>{@code<br />    *     file.setWritable(arg, true)<br />    * }</pre>|
|readable|boolean|false|none||A convenience method to set the owner's read permission for this abstract<br />pathname. On some platforms it may be possible to start the Java virtual<br />machine with special privileges that allow it to read files that are<br />marked as unreadable.<br /><br /><p>An invocation of this method of the form{@code file.setReadable(arg)}<br />behaves in exactly the same way as the invocation<br /><br /><pre>{@code<br />    *     file.setReadable(arg, true)<br />    * }</pre>|
|executable|boolean|false|none||A convenience method to set the owner's execute permission for this<br />abstract pathname. On some platforms it may be possible to start the Java<br />virtual machine with special privileges that allow it to execute files<br />that are not marked executable.<br /><br /><p>An invocation of this method of the form{@code file.setExcutable(arg)}<br />behaves in exactly the same way as the invocation<br /><br /><pre>{@code<br />    *     file.setExecutable(arg, true)<br />    * }</pre>|
|totalSpace|integer(int64)|false|none||Returns the size of the partition <a href="#partName">named</a> by this<br />abstract pathname. If the total number of bytes in the partition is<br />greater than{@link Long#MAX_VALUE}, then{@code Long.MAX_VALUE} will be<br />returned.|
|freeSpace|integer(int64)|false|none||Returns the number of unallocated bytes in the partition <a<br />href="#partName">named</a> by this abstract path name.  If the<br />number of unallocated bytes in the partition is greater than<br />{@link Long#MAX_VALUE}, then{@code Long.MAX_VALUE} will be returned.<br /><br /><p> The returned number of unallocated bytes is a hint, but not<br />a guarantee, that it is possible to use most or any of these<br />bytes.  The number of unallocated bytes is most likely to be<br />accurate immediately after this call.  It is likely to be made<br />inaccurate by any external I/O operations including those made<br />on the system outside of this virtual machine.  This method<br />makes no guarantee that write operations to this file system<br />will succeed.|
|usableSpace|integer(int64)|false|none||Returns the number of bytes available to this virtual machine on the<br />partition <a href="#partName">named</a> by this abstract pathname.  If<br />the number of available bytes in the partition is greater than<br />{@link Long#MAX_VALUE}, then{@code Long.MAX_VALUE} will be returned.<br />When possible, this method checks for write permissions and other<br />operating system restrictions and will therefore usually provide a more<br />accurate estimate of how much new data can actually be written than<br />{@link #getFreeSpace}.<br /><br /><p> The returned number of available bytes is a hint, but not a<br />guarantee, that it is possible to use most or any of these bytes.  The<br />number of available bytes is most likely to be accurate immediately<br />after this call.  It is likely to be made inaccurate by any external<br />I/O operations including those made on the system outside of this<br />virtual machine.  This method makes no guarantee that write operations<br />to this file system will succeed.|

<h2 id="tocS_URI">URI</h2>

<a id="schemauri"></a>
<a id="schema_URI"></a>
<a id="tocSuri"></a>
<a id="tocsuri"></a>

```json
{
  "string": "string",
  "absolute": true,
  "opaque": true,
  "rawSchemeSpecificPart": "string",
  "rawAuthority": "string",
  "rawUserInfo": "string",
  "rawPath": "string",
  "rawQuery": "string",
  "rawFragment": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|string|string|false|none||The string form of this URI.|
|absolute|boolean|false|none||Tells whether or not this URI is absolute.<br /><br /><p> A URI is absolute if, and only if, it has a scheme component. </p>|
|opaque|boolean|false|none||Tells whether or not this URI is opaque.<br /><br /><p> A URI is opaque if, and only if, it is absolute and its<br />scheme-specific part does not begin with a slash character ('/').<br />An opaque URI has a scheme, a scheme-specific part, and possibly<br />a fragment; all other components are undefined. </p>|
|rawSchemeSpecificPart|string|false|none||Returns the raw scheme-specific part of this URI.  The scheme-specific<br />part is never undefined, though it may be empty.<br /><br /><p> The scheme-specific part of a URI only contains legal URI<br />characters. </p>|
|rawAuthority|string|false|none||Returns the raw authority component of this URI.<br /><br /><p> The authority component of a URI, if defined, only contains the<br />commercial-at character ({@code '@'}) and characters in the<br /><i>unreserved</i>, <i>punct</i>, <i>escaped</i>, and <i>other</i><br />categories.  If the authority is server-based then it is further<br />constrained to have valid user-information, host, and port<br />components. </p>|
|rawUserInfo|string|false|none||Returns the raw user-information component of this URI.<br /><br /><p> The user-information component of a URI, if defined, only contains<br />characters in the <i>unreserved</i>, <i>punct</i>, <i>escaped</i>, and<br /><i>other</i> categories. </p>|
|rawPath|string|false|none||Returns the raw path component of this URI.<br /><br /><p> The path component of a URI, if defined, only contains the slash<br />character ({@code '/'}), the commercial-at character ({@code '@'}),<br />and characters in the <i>unreserved</i>, <i>punct</i>, <i>escaped</i>,<br />and <i>other</i> categories. </p>|
|rawQuery|string|false|none||Returns the raw query component of this URI.<br /><br /><p> The query component of a URI, if defined, only contains legal URI<br />characters. </p>|
|rawFragment|string|false|none||Returns the raw fragment component of this URI.<br /><br /><p> The fragment component of a URI, if defined, only contains legal URI<br />characters. </p>|

<h2 id="tocS_ResponseEntityResource">ResponseEntityResource</h2>

<a id="schemaresponseentityresource"></a>
<a id="schema_ResponseEntityResource"></a>
<a id="tocSresponseentityresource"></a>
<a id="tocsresponseentityresource"></a>

```json
{
  "inputStream": {},
  "readable": true,
  "open": true,
  "file": {
    "path": "string",
    "name": "string",
    "parent": "string",
    "parentFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "absolute": true,
    "absolutePath": "string",
    "absoluteFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "canonicalPath": "string",
    "canonicalFile": {
      "path": "string",
      "name": "string",
      "parent": "string",
      "parentFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "absolute": true,
      "absolutePath": "string",
      "absoluteFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "canonicalPath": "string",
      "canonicalFile": {
        "path": "string",
        "name": "string",
        "parent": "string",
        "parentFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "absolute": true,
        "absolutePath": "string",
        "absoluteFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "canonicalPath": "string",
        "canonicalFile": {
          "path": null,
          "name": null,
          "parent": null,
          "parentFile": null,
          "absolute": null,
          "absolutePath": null,
          "absoluteFile": null,
          "canonicalPath": null,
          "canonicalFile": null,
          "directory": null,
          "file": null,
          "hidden": null,
          "lastModified": null,
          "writable": null,
          "readable": null,
          "executable": null,
          "totalSpace": null,
          "freeSpace": null,
          "usableSpace": null
        },
        "directory": true,
        "file": true,
        "hidden": true,
        "lastModified": 0,
        "writable": true,
        "readable": true,
        "executable": true,
        "totalSpace": 0,
        "freeSpace": 0,
        "usableSpace": 0
      },
      "directory": true,
      "file": true,
      "hidden": true,
      "lastModified": 0,
      "writable": true,
      "readable": true,
      "executable": true,
      "totalSpace": 0,
      "freeSpace": 0,
      "usableSpace": 0
    },
    "directory": true,
    "file": true,
    "hidden": true,
    "lastModified": 0,
    "writable": true,
    "readable": true,
    "executable": true,
    "totalSpace": 0,
    "freeSpace": 0,
    "usableSpace": 0
  },
  "uRL": "string",
  "uRI": {
    "string": "string",
    "absolute": true,
    "opaque": true,
    "rawSchemeSpecificPart": "string",
    "rawAuthority": "string",
    "rawUserInfo": "string",
    "rawPath": "string",
    "rawQuery": "string",
    "rawFragment": "string"
  },
  "contentAsByteArray": [
    0
  ],
  "filename": "string",
  "description": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|inputStream|[InputStream](#schemainputstream)|false|none||java.io.InputStream|
|readable|boolean|false|none||none|
|open|boolean|false|none||none|
|file|[File](#schemafile)|false|none||Returns the abstract pathname of this abstract pathname's parent,<br />or{@code null} if this pathname does not name a parent<br />directory.<br /><br /><p> The <em>parent</em> of an abstract pathname consists of the<br />pathname's prefix, if any, and each name in the pathname's name<br />sequence except for the last.  If the name sequence is empty then<br />the pathname does not name a parent directory.|
|uRL|string|false|none||none|
|uRI|[URI](#schemauri)|false|none||java.net.URI|
|contentAsByteArray|[integer]|false|none||none|
|filename|string¦null|false|none||none|
|description|string|false|none||none|

<h2 id="tocS_Attraction">Attraction</h2>

<a id="schemaattraction"></a>
<a id="schema_Attraction"></a>
<a id="tocSattraction"></a>
<a id="tocsattraction"></a>

```json
{
  "attractionId": 0,
  "province": "string",
  "name": "string",
  "starLevel": "string",
  "rating": 0,
  "averageRating": 0,
  "price": 0,
  "salesVolume": 0,
  "region": "string",
  "coordinates": "string",
  "description": "string",
  "isFree": false,
  "address": "string",
  "tags": "new ArrayList<>()",
  "recommendedPlayTime": "string",
  "createdTime": "string",
  "updatedTime": "string",
  "viewCount": 0,
  "reviewCount": 0,
  "isActive": true,
  "isFeatured": false,
  "images": "new ArrayList<>()",
  "reviews": "new ArrayList<>()"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|attractionId|integer(int64)|false|none||none|
|province|string|false|none||省份|
|name|string|false|none||名称|
|starLevel|string|false|none||星级|
|rating|number|false|none||评分|
|averageRating|number|false|none||平均评分（用于兼容之前的代码）|
|price|number|false|none||价格|
|salesVolume|integer|false|none||销量|
|region|string|false|none||省/市/区|
|coordinates|string|false|none||坐标|
|description|string|false|none||简介|
|isFree|boolean|false|none||是否免费|
|address|string|false|none||具体地址|
|tags|[string]|false|none||标签 (使用JSON存储)|
|recommendedPlayTime|string|false|none||推荐游玩时间（字符串格式，如"3-4小时"）|
|createdTime|string|false|none||创建时间|
|updatedTime|string|false|none||更新时间|
|viewCount|integer|false|none||浏览次数|
|reviewCount|integer|false|none||评论数（用于兼容之前的代码）|
|isActive|boolean|false|none||是否激活|
|isFeatured|boolean|false|none||是否推荐|
|images|[string]|false|none||图片 URL 列表使用 @Convert 存储为 JSON 字符串|
|reviews|[[AttractionReview](#schemaattractionreview)]|false|none||none|

<h2 id="tocS_AttractionReview">AttractionReview</h2>

<a id="schemaattractionreview"></a>
<a id="schema_AttractionReview"></a>
<a id="tocSattractionreview"></a>
<a id="tocsattractionreview"></a>

```json
{
  "reviewId": 0,
  "attraction": {},
  "userId": 0,
  "title": "string",
  "content": "string",
  "rating": 0,
  "createdTime": "string",
  "updatedTime": "string",
  "likeCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|reviewId|integer(int64)|false|none||none|
|attraction|object|false|none||none|
|userId|integer(int64)|false|none||none|
|title|string|false|none||none|
|content|string|false|none||none|
|rating|number|false|none||none|
|createdTime|string|false|none||none|
|updatedTime|string|false|none||none|
|likeCount|integer|false|none||none|

<h2 id="tocS_ListAttractionReview">ListAttractionReview</h2>

<a id="schemalistattractionreview"></a>
<a id="schema_ListAttractionReview"></a>
<a id="tocSlistattractionreview"></a>
<a id="tocslistattractionreview"></a>

```json
{
  "reviewId": 0,
  "attraction": {},
  "userId": 0,
  "title": "string",
  "content": "string",
  "rating": 0,
  "createdTime": "string",
  "updatedTime": "string",
  "likeCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|reviewId|integer(int64)|false|none||none|
|attraction|object|false|none||none|
|userId|integer(int64)|false|none||none|
|title|string|false|none||none|
|content|string|false|none||none|
|rating|number|false|none||none|
|createdTime|string|false|none||none|
|updatedTime|string|false|none||none|
|likeCount|integer|false|none||none|

<h2 id="tocS_ResponseEntityAttractionReview">ResponseEntityAttractionReview</h2>

<a id="schemaresponseentityattractionreview"></a>
<a id="schema_ResponseEntityAttractionReview"></a>
<a id="tocSresponseentityattractionreview"></a>
<a id="tocsresponseentityattractionreview"></a>

```json
{
  "reviewId": 0,
  "attraction": {},
  "userId": 0,
  "title": "string",
  "content": "string",
  "rating": 0,
  "createdTime": "string",
  "updatedTime": "string",
  "likeCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|reviewId|integer(int64)|false|none||none|
|attraction|object|false|none||none|
|userId|integer(int64)|false|none||none|
|title|string|false|none||none|
|content|string|false|none||none|
|rating|number|false|none||none|
|createdTime|string|false|none||none|
|updatedTime|string|false|none||none|
|likeCount|integer|false|none||none|

<h2 id="tocS_ListAttractionFavorite">ListAttractionFavorite</h2>

<a id="schemalistattractionfavorite"></a>
<a id="schema_ListAttractionFavorite"></a>
<a id="tocSlistattractionfavorite"></a>
<a id="tocslistattractionfavorite"></a>

```json
{
  "favoriteId": 0,
  "attraction": {},
  "userId": 0,
  "createdTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|favoriteId|integer(int64)|false|none||none|
|attraction|object|false|none||none|
|userId|integer(int64)|false|none||none|
|createdTime|string|false|none||none|

<h2 id="tocS_ResponseEntityAttractionFavorite">ResponseEntityAttractionFavorite</h2>

<a id="schemaresponseentityattractionfavorite"></a>
<a id="schema_ResponseEntityAttractionFavorite"></a>
<a id="tocSresponseentityattractionfavorite"></a>
<a id="tocsresponseentityattractionfavorite"></a>

```json
{
  "favoriteId": 0,
  "attraction": {},
  "userId": 0,
  "createdTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|favoriteId|integer(int64)|false|none||none|
|attraction|object|false|none||none|
|userId|integer(int64)|false|none||none|
|createdTime|string|false|none||none|

<h2 id="tocS_AttractionFavorite">AttractionFavorite</h2>

<a id="schemaattractionfavorite"></a>
<a id="schema_AttractionFavorite"></a>
<a id="tocSattractionfavorite"></a>
<a id="tocsattractionfavorite"></a>

```json
{
  "favoriteId": 0,
  "attraction": {},
  "userId": 0,
  "createdTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|favoriteId|integer(int64)|false|none||none|
|attraction|object|false|none||none|
|userId|integer(int64)|false|none||none|
|createdTime|string|false|none||none|

<h2 id="tocS_ResponseEntityAttractionPopularity">ResponseEntityAttractionPopularity</h2>

<a id="schemaresponseentityattractionpopularity"></a>
<a id="schema_ResponseEntityAttractionPopularity"></a>
<a id="tocSresponseentityattractionpopularity"></a>
<a id="tocsresponseentityattractionpopularity"></a>

```json
{
  "popularityId": 0,
  "attractionId": 0,
  "viewCount": 0,
  "likeCount": 0,
  "shareCount": 0,
  "updatedTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|popularityId|integer(int64)|false|none||none|
|attractionId|integer(int64)|false|none||none|
|viewCount|integer|false|none||none|
|likeCount|integer|false|none||none|
|shareCount|integer|false|none||none|
|updatedTime|string|false|none||none|

