
# 🌐 智能旅游路径规划系统 API 文档

### 注意事项：
在网关配置完成后下面的/api前面要加上/routing

## 🛤 1. 导入车站 / 机场信息

### POST `/api/import/stations`

导入车站或机场信息 CSV 数据。每次调用时请指定类型（`TRAIN` 或 `FLIGHT`）。

#### 请求参数（Form-Data）

| 参数名  | 类型     | 是否必须 | 描述                 |
| ---- | ------ | ---- | ------------------ |
| file | File   | ✅    | 要导入的 CSV 文件        |
| type | String | ✅    | `TRAIN` 或 `FLIGHT` |

#### 示例请求

使用 Postman 发送 Form-Data 格式的请求：

```text
Key: file        | Value: xxx.csv (文件选择)
Key: type        | Value: TRAIN
```

#### 示例响应

```json
{
  "code": 200,
  "message": "导入成功",
  "data": {
    "imported": 132
  }
}
```

---

## 📍 2. 获取推荐路径规划（遗传算法）

### POST `/api/path/plan`

根据用户偏好和城市信息，生成推荐的旅游路径（按天分配景点，考虑游玩时间段、标签偏好、评分、价格、销量、交通距离等因素）。

### 请求体（JSON）

```json
{
  "fromCity": "上海",
  "toCity": "成都",
  "maxDays": 2,
  "preference": {
    "tagWeights": {
      "文化": 0.5,
      "自然": 0.8,
      "娱乐": 0.3
    },
    "selectedTags": ["自然", "文化"]
  }
}
```

### 响应体（JSON）

```json
{
  "routes": [
    {
      "day": 1,
      "spots": [
        {
          "spot": {
            "id": 101,
            "name": "成都大熊猫基地",
            "price": 50.0,
            "rating": 4.7,
            "sales": 1234,
            "timeSlots": ["100", "110"],
            "latitude": 30.123,
            "longitude": 104.456,
            "tags": ["自然", "动物"]
          },
          "assignedTimeSlot": "上午"
        },
        {
          "spot": {
            "id": 102,
            "name": "锦里古街",
            "price": 0.0,
            "rating": 4.5,
            "sales": 4567,
            "timeSlots": ["010"],
            "latitude": 30.222,
            "longitude": 104.333,
            "tags": ["文化", "购物"]
          },
          "assignedTimeSlot": "下午"
        }
      ]
    },
    {
      "day": 2,
      "spots": [...]
    }
  ],
  "transport": {
    "fromStation": "上海虹桥站",
    "toStation": "成都东站",
    "type": "TRAIN",
    "distanceKm": 1900.1,
    "estimatedPrice": 905.0
  }
}
```

---

## 📦 实体说明

### `PathPlanRequest`

| 字段名        | 类型             | 描述   |
| ---------- | -------------- | ---- |
| fromCity   | String         | 出发城市 |
| toCity     | String         | 目标城市 |
| maxDays    | int  | 旅游时间 |
| preference | UserPreference | 用户偏好 |

### `UserPreference`

| 字段名          | 类型                   | 描述              |
| ------------ | -------------------- | --------------- |
| tagWeights   | Map\<String, Double> | 用户对标签的打分偏好（归一化） |
| selectedTags | List<String>         | 主动选择的偏好标签       |

### `PathPlanResponse`

| 字段名       | 类型                 | 描述                     |
| --------- | ------------------ | ---------------------- |
| routes    | List<PlannedRoute> | 每日推荐路线                 |
| transport | TransportPlan      | 城际交通推荐（起点与终点站点 + 估算价格） |

### `PlannedRoute`

| 字段名   | 类型                | 描述            |
| ----- | ----------------- | ------------- |
| day   | int               | 第几天           |
| spots | List<PlannedSpot> | 当天的景点推荐（含时间段） |

### `PlannedSpot`

| 字段名              | 类型     | 描述          |
| ---------------- | ------ | ----------- |
| spot             | Spot   | 推荐的景点实体信息   |
| assignedTimeSlot | String | 推荐时间段（如：上午） |

### `Spot`

| 字段名       | 类型           | 描述             |
| --------- | ------------ | -------------- |
| id        | Long         | 景点 ID          |
| name      | String       | 名称             |
| price     | Double       | 票价             |
| rating    | Double       | 评分             |
| sales     | Integer      | 销量             |
| timeSlots | List<String> | 推荐时间段（如 "100"） |
| latitude  | Double       | 纬度             |
| longitude | Double       | 经度             |
| tags      | List<String> | 所属标签           |

### `TransportEstimate`

| 字段名            | 类型     | 描述                 |
| -------------- | ------ | ------------------ |
| fromStation    | String | 出发地车站/机场名          |
| toStation      | String | 目的地车站/机场名          |
| type           | String | `TRAIN` 或 `FLIGHT` |
| estimatedDistance   | Double | 估算距离（单位：公里）        |
| estimatedPrice | Double | 估算费用（单位：元）         |

---

### 📥 景点导入 API 文档（内部接口）

### POST `/api/import/spots`

---

#### ✅ 请求体格式（application/json）

```json
[
  {
    "id": 1001,
    "name": "都江堰",
    "price": 70.0,
    "rating": 4.8,
    "sales": 5400,
    "timeSlots": ["100", "010"],
    "latitude": 30.992,
    "longitude": 103.605,
    "tags": ["文化", "自然"]
  },
  {
    "id": 1002,
    "name": "武侯祠",
    "price": 60.0,
    "rating": 4.6,
    "sales": 4300,
    "timeSlots": ["010", "001"],
    "latitude": 30.643,
    "longitude": 104.043,
    "tags": ["历史", "人文"]
  }
]
```

---

#### 🔁 响应示例

```json
{
  "code": 200,
  "message": "导入成功",
  "imported": 2
}
```

