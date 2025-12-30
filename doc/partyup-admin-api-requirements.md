# API Requirements – 揪團後台

> 本文件說明前端畫面所需的 API 規格，
> 目的在於讓後端能清楚了解各頁面需要哪些 API、資料結構與行為邏輯。
> 為避免 CORS Preflight (OPTIONS) 請求可能產生的連線問題，本文件之更新動作統一採用 **POST** 方法。

---

## 一、系統範圍說明

本系統為「揪團後台」，主要包含以下功能頁面：

- 揪團清單
- 編輯揪團資訊
- 查看揪團訂單頁面
- 新增/編輯訂單彈窗

---

## 二、API 總覽

| 功能                        | Method | Path                    | 說明                               |
| --------------------------- | ------ | ----------------------- | ---------------------------------- |
| 取得/搜尋揪團清單           | GET    | `/api/partyup`          | 列表頁分頁與搜尋                   |
| 取得揪團詳細資訊 (或開新團) | GET    | `/api/partyup/id`       | 進入編輯頁或建立新團時取得基礎資料 |
| 更新/新增揪團資訊           | POST   | `/api/partyup/id`       | 儲存揪團的主體資訊與商品選項       |
| 取得揪團訂單清單            | GET    | `/api/partyup/orders`   | 列表顯示、搜尋與日期篩選           |
| 建立或更新單筆訂單          | POST   | `/api/partyup/order/id` | 新增訂單或修改特定訂單內容         |
| 批次變更訂單狀態            | POST   | `/api/partyup/orders`   | 批次更新訂單狀態（如：已領取）     |

---

## 三、揪團列表頁面（Partyup List Page）

### 使用情境

- 使用者瀏覽揪團清單

---

### 取得/搜尋揪團清單

- Method: GET
- Path: /api/partyup
- 說明：取得/搜尋進行中的揪團列表以及資訊

#### Query Params（可選）

| 欄位        | 型別   | 必填 | 說明                                    |
| ----------- | ------ | ---- | --------------------------------------- |
| searchKey   | string | 否   | 商品、揪團名稱 (搜尋用)                 |
| partyStatus | string | 否   | (ex: 1:上架中, 0:已下架) 若沒有帶則全撈 |
| startDate   | string | 否   | 搜尋起始日期                            |
| endDate     | string | 否   | 搜尋結束日期                            |
| page        | number | 是   | 目前的分頁                              |
| pageSize    | number | 是   | 一個分頁顯示幾筆                        |

#### Response

```json
{
  "partyup_list": [
    {
      "id": "g223",
      "party_name": "毛巾團購",
      "participants": 236,
      "period": "2025/11/1~2025/11/30",
      "partyStatus": "上架中",
      "pagination": {
        "page": 1,
        "page_size": 10,
        "total": 30
      }
    }
  ]
}
```

## 四、揪團資訊頁面（Partyup Detail Page）

### 使用情境

- 使用者瀏覽揪團資訊
- 使用者編輯揪團資訊
- 使用者新增揪團

---

### 取得揪團的詳細資訊 or 新增揪團

- Method: GET
- Path: /api/partyup/[id]
- 說明：取得揪團購買的詳細資訊 或 新增新的揪團

#### Query Params

| 欄位 | 型別   | 必填 | 說明                                                                                                                    |
| ---- | ------ | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| id   | string | 否   | 揪團購買的 id (如果有帶入 id 就是取回該揪團資訊，若沒有帶 id 就表示是成立新團，後端會建立一個新的揪團並回應此新團的 id) |

#### Response

```json
{
  "party_id": "g223",
  "party_name": "毛巾團購",
  "participants": 236,
  "period": "2025/11/1~2025/11/30",
  "party_status": 1, //是否仍上架中
  "requires_shipping_info": false, //是否需要宅配資訊
  "party_status_options": [
    //揪團狀態清單
    {
      "value": "已下架",
      "id": "0"
    },
    {
      "value": "上架中",
      "id": "1"
    }
  ],
  "product_options": [
    {
      "product_id": "a1235",
      "img_url": "",
      "prod_name": "佛羅倫斯系列之毛巾",
      "option_desc": "",
      "party_price": 260,
      "original_price": 320
    },
    {
      "product_id": "2342525",
      "img_url": "",
      "prod_name": "佛羅倫斯系列之浴巾",
      "option_desc": "",
      "party_price": 380,
      "original_price": 400
    }
  ],
  "other_prod_images": ["https://....", ""],
  "product_summary": "",
  "product_spec": "",
  "note": ""
}
```

---

### 更新揪團的資訊

- Method: POST
- Path: /api/partyup
- 說明：更新揪團的詳細資訊

#### Request Body

| 欄位                            | 型別          | 必填 | 說明                   |
| ------------------------------- | ------------- | ---- | ---------------------- |
| id                              | string        | 是   | 揪團 id                |
| party_name                      | string        | 是   | 揪團名稱               |
| startDate                       | string        | 是   | 揪團開始時間           |
| endDate                         | string        | 是   | 揪團結束時間           |
| partyStatus                     | number        | 是   | 揪團狀態(ex:1=>上架中) |
| requiresShippingInfo            | boolean       | 是   | 是否需要填宅配資訊     |
| productOptions                  | array         | 是   | 商品選項資訊           |
| productOptions[].prod_id        | string        | 是   | 商品選項名稱           |
| productOptions[].prod_name      | string        | 是   | 商品選項名稱           |
| productOptions[].option_desc    | string        | 是   | 商品選項描述           |
| productOptions[].party_price    | string        | 是   | 商品選項揪團價         |
| productOptions[].original_price | string        | 否   | 商品選項原價/市價      |
| otherProductImages              | array<string> | 否   | 其他商品圖片           |
| prodSummary                     | string        | 是   | 商品介紹               |
| prodSpec                        | string        | 是   | 商品規格               |
| note                            | string        | 是   | 揪團注意事項           |

```json
{
  "id": "g223",
  "party_name": "毛巾團購",
  "startDate": "2025/11/1",
  "endDate": "2025/11/30",
  "party_status": 1,
  "requiresShippingInfo": false,
  "productOptions": [
    {
      "product_id": "a1235",
      "prod_name": "佛羅倫斯系列之毛巾",
      "option_desc": "",
      "party_price": 260,
      "original_price": 320
    },
    {
      "product_id": "2342525",
      "prod_name": "佛羅倫斯系列之浴巾",
      "option_desc": "",
      "party_price": 380,
      "original_price": 400
    }
  ],
  "otherProductImages": ["https://....", ""],
  "prodSummary": "",
  "prodSpec": "",
  "note": ""
}
```

#### Response

```json
{
  "message": "揪團編輯(新增)成功"
}
```

---

## 四、揪團訂單頁面（Party Order List Page）

### 使用情境

- 使用者點擊查看揪團訂單的 tab
- 使用者點擊編輯訂單
- 使用者點擊新增訂單
- 使用者批次編輯訂單狀態

---

### 取得揪團訂單清單

- Method: GET
- Path: /api/partyup/GetOrderList
- 說明：取得/搜尋揪團訂單清單

---

#### Query Params（可選）

| 欄位      | 型別   | 必填 | 說明                                    |
| --------- | ------ | ---- | --------------------------------------- |
| partyId   | string | 是   | 揪團 id                                 |
| page      | number | 是   | 目前的分頁                              |
| pageSize  | number | 是   | 一個分頁顯示幾筆                        |
| searchKey | string | 否   | 商品名稱、揪團名稱、訂購人工號 (搜尋用) |
| status    | string | 否   | 訂單狀態(已成單、已領取...)             |
| startDate | string | 否   | 搜尋起始日期                            |
| endDate   | string | 否   | 搜尋結束日期                            |

#### Response

```json
{
  "order_list": [
    {
      "order_id": "TK92600677",
      "item_count": 3,
      "total_amount": 690,
      "order_date": "2025/12/3 12:43",
      "dept": "資訊部",
      "staff_id": "015550",
      "staff_name": "張阿爆",
      "order_status": "已領取"
    }
  ]
}
```

---

### 取得揪團訂單明細

- Method: GET
- Path: /api/partyup/order
- 說明：取得揪團訂單明細

#### Query Params（可選）

| 欄位    | 型別   | 必填 | 說明    |
| ------- | ------ | ---- | ------- |
| partyId | string | 是   | 揪團 id |
| orderId | string | 是   | 訂單 id |

#### Response

```json
{
  "order": [
    {
      "order_id": "TK92600677",
      "total_amount": 690,
      "order_date": "2025/12/3 12:43",
      "dept": "資訊部",
      "staff_id": "015550",
      "staff_name": "張阿爆",
      "order_status": 3, // 已領取(?)
      "order_status_options": [
        //訂單狀態清單
        {
          "value": "已成單",
          "id": "2"
        },
        {
          "value": "已領取",
          "id": "3"
        }
      ],
      "product_options": [
        {
          "prod_id": "a1235",
          "prod_name": "佛羅倫斯系列之毛巾",
          "party_price": 260,
          "prod_img": "https://..."
        },
        {
          "prod_id": "2342525",
          "prod_name": "佛羅倫斯系列之浴巾",
          "party_price": 380,
          "prod_img": "https://..."
        }
      ],
      "shippin_info": {
        //需要宅配資訊的才會帶
        "name": "Steve Lin",
        "phone": "0912345678",
        "address": "台北市中山區...",
        "tracking_number": "220908799" //宅配單號
      }
    }
  ]
}
```

---

### 建立訂單 || 更新訂單

- Method: POST
- Path: /api/partyup/order
- 說明：建立或更新訂單

#### Request Body

| 欄位                        | 型別   | 必填 | 說明                             |
| --------------------------- | ------ | ---- | -------------------------------- |
| partyId                     | string | 是   | 揪團的 id                        |
| orderId                     | string | 否   | 訂單 id (若為建立新訂單則不用填) |
| staffId                     | string | 是   | 購買者的員工編號                 |
| buyItems                    | array  | 是   | 訂單商品清單                     |
| buyItems[].productId        | string | 是   | 商品選項的 ID                    |
| buyItems[].qty              | number | 是   | 購買數量                         |
| shippingInfo                | object | 否   | 宅配資訊(需要宅配資訊時為必填)   |
| shippingInfo.name           | string | 是   | 收件人姓名                       |
| shippingInfo.phone          | string | 是   | 收件人電話                       |
| shippingInfo.address        | string | 是   | 收件地址                         |
| shippingInfo.trackingNumber | string | 否   | 宅配單號                         |

```json
{
  [
    {
      "partyId": "g2223", //第一個揪團商品結帳
      "orderId": "a2325325325",
      "staffId": "017332",
      "buyItems": [
        {
          "prod_id": "P001",
          "qty": 2
        }
      ],
      "shippinInfo": {//需要宅配資訊的才會帶
        "name": "Steve Lin",
        "phone": "0912345678",
        "address": "台北市中山區...",
      },
    }
  ]
}
```

---

### 批次變更訂單

- Method: POST
- Path: /api/partyup/orders
- 說明：批次變更揪團的訂單

#### Request Body

| 欄位                 | 型別   | 必填 | 說明                        |
| -------------------- | ------ | ---- | --------------------------- |
| partyId              | string | 是   | 揪團的 id                   |
| orders               | array  | 否   | 欲變更的訂單清單            |
| orders[].orderId     | string | 是   | 訂單 id                     |
| orders[].orderStatus | number | 是   | 訂單狀態(已領取, 已成單...) |

```json
{
  [
    {
      "partyId": "g2223",
      "orderId": "a2325325325",
      "orders": [
        {
          "orderId": "P001",
          "orderStatus": 2
        }
      ],
    }
  ]
}
```

```

---

> 備註：本文件僅描述前端所需資料格式，實際實作方式由後端自行決定。
```
