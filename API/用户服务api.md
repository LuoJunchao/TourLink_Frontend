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

# 认证控制器

## POST 用户注册

POST /api/auth/register

> Body 请求参数

```json
{
  "username": "string",
  "password": "string",
  "email": "user@example.com",
  "phoneNumber": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[RegisterRequest](#schemaregisterrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": {
    "userId": 0,
    "username": "",
    "token": "",
    "roles": [
      ""
    ],
    "expiresIn": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseAuthResponse](#schemaresponseentityapiresponseauthresponse)|

## POST 用户登录

POST /api/auth/login

> Body 请求参数

```json
{
  "username": "string",
  "password": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[LoginRequest](#schemaloginrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": {
    "userId": 0,
    "username": "",
    "token": "",
    "roles": [
      ""
    ],
    "expiresIn": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseAuthResponse](#schemaresponseentityapiresponseauthresponse)|

# UserController

## POST createUser

POST /api/users

> Body 请求参数

```json
{
  "username": "string",
  "password": "string",
  "email": "user@example.com",
  "phoneNumber": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserRequest](#schemauserrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "username": "",
  "email": "",
  "phoneNumber": "",
  "createdAt": "",
  "updatedAt": "",
  "lastLogin": "",
  "isActive": false,
  "viewCount": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserResponse](#schemaresponseentityuserresponse)|

## GET getAllUsers

GET /api/users

> 返回示例

> 200 Response

```json
[
  {
    "id": 0,
    "username": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0
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
|*anonymous*|[[ListUserResponse](#schemalistuserresponse)]|false|none||none|
|» id|integer(int64)|false|none||none|
|» username|string|false|none||none|
|» email|string|false|none||none|
|» phoneNumber|string|false|none||none|
|» createdAt|string|false|none||none|
|» updatedAt|string|false|none||none|
|» lastLogin|string|false|none||none|
|» isActive|boolean|false|none||none|
|» viewCount|integer|false|none||none|

## GET getUserById

GET /api/users/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "username": "",
  "email": "",
  "phoneNumber": "",
  "createdAt": "",
  "updatedAt": "",
  "lastLogin": "",
  "isActive": false,
  "viewCount": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserResponse](#schemaresponseentityuserresponse)|

## PUT updateUser

PUT /api/users/{id}

> Body 请求参数

```json
{
  "username": "string",
  "password": "string",
  "email": "user@example.com",
  "phoneNumber": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|body|body|[UserRequest](#schemauserrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "username": "",
  "email": "",
  "phoneNumber": "",
  "createdAt": "",
  "updatedAt": "",
  "lastLogin": "",
  "isActive": false,
  "viewCount": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserResponse](#schemaresponseentityuserresponse)|

## DELETE deleteUser

DELETE /api/users/{id}

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

## GET getUserBlogs

GET /api/users/{id}/blogs

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
[
  0
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET getUserFavorites

GET /api/users/{id}/favorites

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
[
  0
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET getUserReviews

GET /api/users/{id}/reviews

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
[
  0
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST addFavorite

POST /api/users/{id}/favorites/{attractionId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|attractionId|path|integer| 是 |none|

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

## DELETE removeFavorite

DELETE /api/users/{id}/favorites/{attractionId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|attractionId|path|integer| 是 |none|

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

## POST incrementViewCount

POST /api/users/{id}/view

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

## GET 获取用户基本信息DTO

GET /api/users/{id}/basic

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |用户ID|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": {
    "id": 0,
    "username": "",
    "email": "",
    "avatarUrl": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseUserBasicDTO](#schemaresponseentityapiresponseuserbasicdto)|

## GET 批量获取多个用户的基本信息DTO

GET /api/users/batch/basic

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|ids|query|string| 是 |用户ID列表，以逗号分隔|

> 返回示例

> 200 Response

```json
{
  "success": false,
  "code": "",
  "message": "",
  "data": [
    {
      "id": 0,
      "username": "",
      "email": "",
      "avatarUrl": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityApiResponseListUserBasicDTO](#schemaresponseentityapiresponselistuserbasicdto)|

# UserRoleController

## POST createUserRole

POST /api/user-roles

> Body 请求参数

```json
{
  "id": 0,
  "user": {},
  "roleType": "VISITOR"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserRole](#schemauserrole)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0,
    "blogIds": [
      0
    ],
    "favoriteAttractionIds": [
      0
    ],
    "reviewIds": [
      0
    ]
  },
  "roleType": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserRole](#schemaresponseentityuserrole)|

## GET getUserRoleById

GET /api/user-roles/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0,
    "blogIds": [
      0
    ],
    "favoriteAttractionIds": [
      0
    ],
    "reviewIds": [
      0
    ]
  },
  "roleType": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserRole](#schemaresponseentityuserrole)|

## PUT updateUserRole

PUT /api/user-roles/{id}

> Body 请求参数

```json
{
  "id": 0,
  "user": {},
  "roleType": "VISITOR"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|body|body|[UserRole](#schemauserrole)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0,
    "blogIds": [
      0
    ],
    "favoriteAttractionIds": [
      0
    ],
    "reviewIds": [
      0
    ]
  },
  "roleType": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserRole](#schemaresponseentityuserrole)|

## DELETE deleteUserRole

DELETE /api/user-roles/{id}

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

## GET getUserRolesByUserId

GET /api/user-roles/user/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
[
  {
    "id": 0,
    "user": {
      "id": 0,
      "username": "",
      "password": "",
      "email": "",
      "phoneNumber": "",
      "createdAt": "",
      "updatedAt": "",
      "lastLogin": "",
      "isActive": false,
      "viewCount": 0,
      "blogIds": [
        0
      ],
      "favoriteAttractionIds": [
        0
      ],
      "reviewIds": [
        0
      ]
    },
    "roleType": ""
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
|*anonymous*|[[ListUserRole](#schemalistuserrole)]|false|none||none|
|» id|integer(int64)|false|none||none|
|» user|object|false|none||none|
|» roleType|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|roleType|VISITOR|
|roleType|USER|
|roleType|ADMIN|

## POST assignRoleToUser

POST /api/user-roles/user/{userId}/role/{roleType}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|integer| 是 |none|
|roleType|path|string| 是 | VISITOR :VISITOR|

#### 详细说明

**roleType**:  VISITOR :VISITOR
USER :USER
ADMIN :管理员

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0,
    "blogIds": [
      0
    ],
    "favoriteAttractionIds": [
      0
    ],
    "reviewIds": [
      0
    ]
  },
  "roleType": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserRole](#schemaresponseentityuserrole)|

## DELETE removeRoleFromUser

DELETE /api/user-roles/user/{userId}/role/{roleType}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|integer| 是 |none|
|roleType|path|string| 是 | VISITOR :VISITOR|

#### 详细说明

**roleType**:  VISITOR :VISITOR
USER :USER
ADMIN :管理员

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

# UserProfileController

## POST createUserProfile

POST /api/user-profiles

> Body 请求参数

```json
{
  "id": 0,
  "user": {},
  "realName": "string",
  "phoneNumber": "string",
  "email": "string",
  "avatar": "string",
  "bio": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserProfile](#schemauserprofile)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0,
    "blogIds": [
      0
    ],
    "favoriteAttractionIds": [
      0
    ],
    "reviewIds": [
      0
    ]
  },
  "realName": "",
  "phoneNumber": "",
  "email": "",
  "avatar": "",
  "bio": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserProfile](#schemaresponseentityuserprofile)|

## GET getUserProfileById

GET /api/user-profiles/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0,
    "blogIds": [
      0
    ],
    "favoriteAttractionIds": [
      0
    ],
    "reviewIds": [
      0
    ]
  },
  "realName": "",
  "phoneNumber": "",
  "email": "",
  "avatar": "",
  "bio": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserProfile](#schemaresponseentityuserprofile)|

## PUT updateUserProfile

PUT /api/user-profiles/{id}

> Body 请求参数

```json
{
  "id": 0,
  "user": {},
  "realName": "string",
  "phoneNumber": "string",
  "email": "string",
  "avatar": "string",
  "bio": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|body|body|[UserProfile](#schemauserprofile)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0,
    "blogIds": [
      0
    ],
    "favoriteAttractionIds": [
      0
    ],
    "reviewIds": [
      0
    ]
  },
  "realName": "",
  "phoneNumber": "",
  "email": "",
  "avatar": "",
  "bio": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserProfile](#schemaresponseentityuserprofile)|

## DELETE deleteUserProfile

DELETE /api/user-profiles/{id}

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

## GET getUserProfileByUserId

GET /api/user-profiles/user/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "username": "",
    "password": "",
    "email": "",
    "phoneNumber": "",
    "createdAt": "",
    "updatedAt": "",
    "lastLogin": "",
    "isActive": false,
    "viewCount": 0,
    "blogIds": [
      0
    ],
    "favoriteAttractionIds": [
      0
    ],
    "reviewIds": [
      0
    ]
  },
  "realName": "",
  "phoneNumber": "",
  "email": "",
  "avatar": "",
  "bio": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityUserProfile](#schemaresponseentityuserprofile)|

# 数据模型

<h2 id="tocS_AuthResponse">AuthResponse</h2>

<a id="schemaauthresponse"></a>
<a id="schema_AuthResponse"></a>
<a id="tocSauthresponse"></a>
<a id="tocsauthresponse"></a>

```json
{
  "userId": 0,
  "username": "string",
  "token": "string",
  "roles": [
    "string"
  ],
  "expiresIn": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|userId|integer(int64)|false|none||none|
|username|string|false|none||none|
|token|string|false|none||none|
|roles|[string]|false|none||none|
|expiresIn|integer(int64)|false|none||none|

<h2 id="tocS_ResponseEntityApiResponseAuthResponse">ResponseEntityApiResponseAuthResponse</h2>

<a id="schemaresponseentityapiresponseauthresponse"></a>
<a id="schema_ResponseEntityApiResponseAuthResponse"></a>
<a id="tocSresponseentityapiresponseauthresponse"></a>
<a id="tocsresponseentityapiresponseauthresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "userId": 0,
    "username": "string",
    "token": "string",
    "roles": [
      "string"
    ],
    "expiresIn": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AuthResponse](#schemaauthresponse)|false|none||none|

<h2 id="tocS_RegisterRequest">RegisterRequest</h2>

<a id="schemaregisterrequest"></a>
<a id="schema_RegisterRequest"></a>
<a id="tocSregisterrequest"></a>
<a id="tocsregisterrequest"></a>

```json
{
  "username": "string",
  "password": "string",
  "email": "user@example.com",
  "phoneNumber": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|true|none||none|
|password|string|true|none||none|
|email|string(email)|false|none||none|
|phoneNumber|string|false|none||none|

<h2 id="tocS_LoginRequest">LoginRequest</h2>

<a id="schemaloginrequest"></a>
<a id="schema_LoginRequest"></a>
<a id="tocSloginrequest"></a>
<a id="tocsloginrequest"></a>

```json
{
  "username": "string",
  "password": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|true|none||none|
|password|string|true|none||none|

<h2 id="tocS_ResponseEntityUserResponse">ResponseEntityUserResponse</h2>

<a id="schemaresponseentityuserresponse"></a>
<a id="schema_ResponseEntityUserResponse"></a>
<a id="tocSresponseentityuserresponse"></a>
<a id="tocsresponseentityuserresponse"></a>

```json
{
  "id": 0,
  "username": "string",
  "email": "string",
  "phoneNumber": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "lastLogin": "string",
  "isActive": true,
  "viewCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|username|string|false|none||none|
|email|string|false|none||none|
|phoneNumber|string|false|none||none|
|createdAt|string|false|none||none|
|updatedAt|string|false|none||none|
|lastLogin|string|false|none||none|
|isActive|boolean|false|none||none|
|viewCount|integer|false|none||none|

<h2 id="tocS_UserRequest">UserRequest</h2>

<a id="schemauserrequest"></a>
<a id="schema_UserRequest"></a>
<a id="tocSuserrequest"></a>
<a id="tocsuserrequest"></a>

```json
{
  "username": "string",
  "password": "string",
  "email": "user@example.com",
  "phoneNumber": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|true|none||none|
|password|string|true|none||none|
|email|string(email)|false|none||none|
|phoneNumber|string|false|none||none|

<h2 id="tocS_ListUserResponse">ListUserResponse</h2>

<a id="schemalistuserresponse"></a>
<a id="schema_ListUserResponse"></a>
<a id="tocSlistuserresponse"></a>
<a id="tocslistuserresponse"></a>

```json
{
  "id": 0,
  "username": "string",
  "email": "string",
  "phoneNumber": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "lastLogin": "string",
  "isActive": true,
  "viewCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|username|string|false|none||none|
|email|string|false|none||none|
|phoneNumber|string|false|none||none|
|createdAt|string|false|none||none|
|updatedAt|string|false|none||none|
|lastLogin|string|false|none||none|
|isActive|boolean|false|none||none|
|viewCount|integer|false|none||none|

<h2 id="tocS_UserBasicDTO">UserBasicDTO</h2>

<a id="schemauserbasicdto"></a>
<a id="schema_UserBasicDTO"></a>
<a id="tocSuserbasicdto"></a>
<a id="tocsuserbasicdto"></a>

```json
{
  "id": 0,
  "username": "string",
  "email": "string",
  "avatarUrl": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|username|string|false|none||none|
|email|string|false|none||none|
|avatarUrl|string|false|none||none|

<h2 id="tocS_ResponseEntityApiResponseUserBasicDTO">ResponseEntityApiResponseUserBasicDTO</h2>

<a id="schemaresponseentityapiresponseuserbasicdto"></a>
<a id="schema_ResponseEntityApiResponseUserBasicDTO"></a>
<a id="tocSresponseentityapiresponseuserbasicdto"></a>
<a id="tocsresponseentityapiresponseuserbasicdto"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "username": "string",
    "email": "string",
    "avatarUrl": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[UserBasicDTO](#schemauserbasicdto)|false|none||none|

<h2 id="tocS_ResponseEntityApiResponseListUserBasicDTO">ResponseEntityApiResponseListUserBasicDTO</h2>

<a id="schemaresponseentityapiresponselistuserbasicdto"></a>
<a id="schema_ResponseEntityApiResponseListUserBasicDTO"></a>
<a id="tocSresponseentityapiresponselistuserbasicdto"></a>
<a id="tocsresponseentityapiresponselistuserbasicdto"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": [
    {
      "id": 0,
      "username": "string",
      "email": "string",
      "avatarUrl": "string"
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
|data|[[UserBasicDTO](#schemauserbasicdto)]|false|none||none|

<h2 id="tocS_User">User</h2>

<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "username": "string",
  "password": "string",
  "email": "string",
  "phoneNumber": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "lastLogin": "string",
  "isActive": true,
  "viewCount": 0,
  "blogIds": [
    0
  ],
  "favoriteAttractionIds": [
    0
  ],
  "reviewIds": [
    0
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|username|string|false|none||none|
|password|string|false|none||none|
|email|string|false|none||none|
|phoneNumber|string|false|none||none|
|createdAt|string|false|none||none|
|updatedAt|string|false|none||none|
|lastLogin|string|false|none||none|
|isActive|boolean|false|none||none|
|viewCount|integer|false|none||none|
|blogIds|[integer]|false|none||none|
|favoriteAttractionIds|[integer]|false|none||none|
|reviewIds|[integer]|false|none||none|

<h2 id="tocS_ResponseEntityUserRole">ResponseEntityUserRole</h2>

<a id="schemaresponseentityuserrole"></a>
<a id="schema_ResponseEntityUserRole"></a>
<a id="tocSresponseentityuserrole"></a>
<a id="tocsresponseentityuserrole"></a>

```json
{
  "id": 0,
  "user": {},
  "roleType": "VISITOR"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|user|object|false|none||none|
|roleType|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|roleType|VISITOR|
|roleType|USER|
|roleType|ADMIN|

<h2 id="tocS_UserRole">UserRole</h2>

<a id="schemauserrole"></a>
<a id="schema_UserRole"></a>
<a id="tocSuserrole"></a>
<a id="tocsuserrole"></a>

```json
{
  "id": 0,
  "user": {},
  "roleType": "VISITOR"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|user|object|false|none||none|
|roleType|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|roleType|VISITOR|
|roleType|USER|
|roleType|ADMIN|

<h2 id="tocS_ListUserRole">ListUserRole</h2>

<a id="schemalistuserrole"></a>
<a id="schema_ListUserRole"></a>
<a id="tocSlistuserrole"></a>
<a id="tocslistuserrole"></a>

```json
{
  "id": 0,
  "user": {},
  "roleType": "VISITOR"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|user|object|false|none||none|
|roleType|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|roleType|VISITOR|
|roleType|USER|
|roleType|ADMIN|

<h2 id="tocS_ResponseEntityUserProfile">ResponseEntityUserProfile</h2>

<a id="schemaresponseentityuserprofile"></a>
<a id="schema_ResponseEntityUserProfile"></a>
<a id="tocSresponseentityuserprofile"></a>
<a id="tocsresponseentityuserprofile"></a>

```json
{
  "id": 0,
  "user": {},
  "realName": "string",
  "phoneNumber": "string",
  "email": "string",
  "avatar": "string",
  "bio": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|user|object|false|none||none|
|realName|string|false|none||none|
|phoneNumber|string|false|none||none|
|email|string|false|none||none|
|avatar|string|false|none||none|
|bio|string|false|none||none|

<h2 id="tocS_UserProfile">UserProfile</h2>

<a id="schemauserprofile"></a>
<a id="schema_UserProfile"></a>
<a id="tocSuserprofile"></a>
<a id="tocsuserprofile"></a>

```json
{
  "id": 0,
  "user": {},
  "realName": "string",
  "phoneNumber": "string",
  "email": "string",
  "avatar": "string",
  "bio": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|user|object|false|none||none|
|realName|string|false|none||none|
|phoneNumber|string|false|none||none|
|email|string|false|none||none|
|avatar|string|false|none||none|
|bio|string|false|none||none|

