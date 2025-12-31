# API Requirements – 揪團購買系統

> 本文件說明前端畫面所需的 API 規格，
> 目的在於讓後端能清楚了解各頁面需要哪些 API、資料結構與行為邏輯。

---

## 一、系統範圍說明

本系統為「揪團系統」平台，主要包含以下功能頁面：

- 揪團購買列表
- 揪團商品詳情頁
- 結帳頁（包含宅配資訊、發票資訊、商品數量）
- 訂單列表頁（支援分頁與條件搜尋）

---

## 二、API 總覽

| 功能                 | Method | Path              |
| -------------------- | ------ | ----------------- |
| 取得公告與注意事項   | GET    | /api/announcement |
| 取得進行中的揪團清單 | GET    | /api/partyup      |
| 取得揪團購買詳細資料 | GET    | /api/partyup/id   |
| 建立訂單（結帳）     | POST   | /api/orders       |
| 取得使用者的訂單紀錄 | GET    | /api/orders       |

---

## 三、揪團列表頁面（Partyup List Page）

### 使用情境

- 使用者瀏覽揪團清單
- 進入頁面會顯示公告彈窗與注意事項

---

### 取得公告與注意事項

- Method: GET
- Path: /api/announcements
- 說明：取得公告與注意事項

#### Response

```json
{
  "announcement": "最新推出:  !",
  "note": "購物流程:
        1.線上輸入購買產品數量  >2.自行選定取貨日期(宅配請提前一日出貨) > 3.索取發票> 4.依日期至倉儲取貨
        其他說明:1.如購買錯誤時，請盡速與承辦人聯繫取消訂單，商品已出貨則無法取消2.取貨日最快為下單後2天，若有特殊需求請與承辦人聯繫3.所需提袋數量請下單時一併選定4.有需要使用載具請於結帳時主動出示，若填寫錯誤則會印出紙本發票
        5.**發票請盡量使用載具**"
}

```

---

### 揪團列表

- Method: GET
- Path: /api/partyup
- 說明：取得/搜尋進行中的揪團列表以及資訊

#### Query Params（可選）

| 欄位        | 型別   | 必填 | 說明                                    |
| ----------- | ------ | ---- | --------------------------------------- |
| searchKey   | string | 否   | 商品、揪團名稱 (搜尋用)                 |
| partyStatus | number | 否   | 揪團狀態(ex:1-進行中)(沒有帶的話就全撈) |
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
      "party_status": 1, //上架中
      "product_options": [
        {
          "id": "a22523",
          "img_url": "",
          "prod_name": "佛羅倫斯系列之毛巾",
          "party_price": 260,
          "original_price": 320
        },
        {
          "id": "a22523",
          "img_url": "",
          "prod_name": "佛羅倫斯系列之浴巾",
          "party_price": 380,
          "original_price": 400
        }
      ],
      "pagination": {
        "page": 1,
        "page_size": 10,
        "total": 30
      }
    }
  ]
}
```

---

### 取得揪團的詳細資訊

- Method: GET
- Path: /api/partyup
- 說明：取得揪團購買的詳細資訊

#### Query Params

| 欄位 | 型別   | 必填 | 說明          |
| ---- | ------ | ---- | ------------- |
| id   | string | 是   | 揪團購買的 id |

#### Response

```json
{
  "id": "g223",
  "party_name": "毛巾團購",
  "participants": 236,
  "period": "2025/11/1~2025/11/30",
  "party_status": 1, //上架中
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
  "other_prd_images": ["https://....", ""],
  "product_summary": "",
  "product_spec": "",
  "note": "",
  "requires_shipping_info": false //是否需要宅配資訊
}
```

---

## 四、結帳頁面（Checkout Page）

### 使用情境

- 使用者選擇商品數量後進入結帳頁
- 填寫宅配資訊
- 確認金額並送出訂單

---

### 建立訂單（結帳）

- Method: POST
- Path: /api/orders
- 說明：建立新訂單

#### Request Body

| 欄位                               | 型別   | 必填 | 說明                           |
| ---------------------------------- | ------ | ---- | ------------------------------ |
| cart                               | array  | 是   | 欲結帳的揪團商品清單           |
| cart[].partyId                     | string | 是   | 揪團的 id                      |
| cart[].buyItems                    | array  | 是   | 購買的揪團商品清單             |
| cart[].buyItems[].productId        | string | 是   | 商品選項的 ID                  |
| cart[].buyItems[].qty              | number | 是   | 購買數量                       |
| cart[].shippingInfo                | object | 否   | 宅配資訊(需要宅配資訊時為必填) |
| cart[].shippingInfo.name           | string | 是   | 收件人姓名                     |
| cart[].shippingInfo.phone          | string | 是   | 收件人電話                     |
| cart[].shippingInfo.address        | string | 是   | 收件地址                       |

```json
{
  "cart": [
    {
      "partyId": "g2223", //第一個揪團商品結帳
      "buyItems": [
        {
          "productId": "P001",
          "qty": 2
        }
      ],
      "shippingInfo": {
        //需要宅配資訊的才會帶
        "name": "Steve Lin",
        "phone": "0912345678",
        "address": "台北市中山區..."
      }
    },
    {
      "partyId": "d2223", //第二個揪團商品結帳
      "buyItems": [
        {
          "productId": "P001",
          "qty": 2
        },
        {
          "productId": "P002",
          "qty": 2
        }
      ]
    }
  ]
}
```

#### Response

```json
{
  "data": {
    "message":"訂購成功"
  }
}
```

---

## 五、揪團紀錄頁面（Order List Page）

### 使用情境

- 使用者查看自己的歷史訂單
- 支援分頁
- 可依訂單編號或日期區間搜尋

---

### 取得使用者的訂單紀錄

- Method: GET
- Path: /api/orders
- 說明：取得使用者的訂單紀錄

#### Query Params

| 欄位      | 型別   | 必填 | 說明             |
| --------- | ------ | ---- | ---------------- |
| page      | number | 是   | 目前的分頁       |
| pageSize  | number | 是   | 一個分頁顯示幾筆 |
| searchKey | string | 否   | 要查詢的商品名稱 |
| orderId   | number | 否   | 要查詢的訂單編號 |
| startDate | string | 否   | 要查詢的日期區間 |
| endDate   | string | 否   | 要查詢的日期區間 |

#### Response

```json
{
  "orderList": [
    {
      "orderId": "ORD-20250808-001",
      "created_at": "2025-12-22 10:30",
      "pickup_date": "2026-01-02 10:30",
      "pickup_method": "自取", //或宅配
      "order_status": "已領取",
      "total_amount": 3690,
      "party_name": "毛巾團購",
      "buy_items": [
        {
          "image_url": "https://...",
          "name": "佛羅倫斯之浴巾",
          "qty": 2,
          "price": 130
        }
      ],
      "shipping_info": {
        "trackingNumber": "907344452512",
        "shippingFee": 240,
        "name": "王爸爸",
        "phone": "0922366777",
        "address": "台中市XX區OO里OO路66號"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 30
  }
}
```

---

> 備註：本文件僅描述前端所需資料格式，實際實作方式由後端自行決定。
