# API Requirements – 員工團購系統

> 本文件說明前端畫面所需的 API 規格，
> 目的在於讓後端能清楚了解各頁面需要哪些 API、資料結構與行為邏輯。

---

## 一、系統範圍說明

本系統為「員工團購」平台，主要包含以下功能頁面：

- 商品列表／商品詳情頁
- 結帳頁（包含宅配資訊、發票資訊、商品數量）
- 訂單列表頁（支援分頁與條件搜尋）

---

## 二、API 總覽

| 功能                           | Method | Path                 |
| ------------------------------ | ------ | -------------------- |
| 取得公告與注意事項             | GET    | /api/announcement    |
| 取得進行中的團購清單           | GET    | /api/groupBuy        |
| 取得商品列表                   | GET    | /api/products        |
| 取得特定團購主題的商品庫存數量 | GET    | /api/products/stocks |
| 建立訂單（結帳）               | POST   | /api/orders          |
| 取得訂單列表                   | GET    | /api/orders          |

---

## 三、商品頁面（Product Page）

### 使用情境

- 使用者瀏覽可購買的員購商品
- 增減商品商品數量可查詢庫存
- 進入頁面會顯示公告彈窗與注意事項

---

### 取得公告與注意事項

- Method: GET
- Path: /api/announcements
- 說明：取得公告與注意事項

#### Response

```json
{
  "announcement": "「員購與團購」係公司照顧同仁之福利，僅供同仁及家人使用，若有「轉售員購或團購等牟利行為」，查證屬實，將依情節輕重，提報申誡以上之懲處。
 員購負責人員: 陳栢津 #6209  ",
  "note": "購物流程:
        1.線上輸入購買產品數量  >2.自行選定取貨日期(宅配請提前一日出貨) > 3.索取發票> 4.依日期至倉儲取貨
        其他說明:1.如購買錯誤時，請盡速與承辦人聯繫取消訂單，商品已出貨則無法取消2.取貨日最快為下單後2天，若有特殊需求請與承辦人聯繫3.所需提袋數量請下單時一併選定4.有需要使用載具請於結帳時主動出示，若填寫錯誤則會印出紙本發票
        5.**發票請盡量使用載具**"
}

```

---

### 取得進行中的團購列表

- Method: GET
- Path: /api/group-buys
- 說明：取得進行中的團購列表

#### Query Params（可選）

#### Response

```json
{
  "products": [
    {
      "groupBuyId": "g223",
      "groupName": "牛之饗宴"
    }
  ]
}
```

---

---

### 取得商品列表

- Method: GET
- Path: /api/products
- 說明：取得可購買的商品列表

#### Query Params

| 欄位       | 型別   | 必填 | 說明        |
| ---------- | ------ | ---- | ----------- |
| groupBuyId | string | 是   | 團購主題 id |

#### Response

```json
{
  "products": [
    {
      "productId": "P001",
      "productName": "鳳梨酥",
      "price": 124,
      "stockQty": 12
    }
  ]
}
```

---

### 取得商品庫存

- Method: GET
- Path: /api/products/stocks
- 說明：取得特定團購主題的商品庫存數量

### Query Parms

| 欄位       | 型別   | 必填 | 說明        |
| ---------- | ------ | ---- | ----------- |
| groupBuyId | string | 是   | 團購主題 id |

#### Response

```json
[
  {
    "productId": "P001",
    "stockQty": 20
  },
  {
    "productId": "P002",
    "stockQty": 10
  }
]
```

---

## 四、結帳頁面（Checkout Page）

### 使用情境

- 使用者選擇商品數量後進入結帳頁
- 填寫宅配資訊與發票資訊
- 確認金額並送出訂單

---

### 取得發票領取地點

- Method: POST
- Path: /api/invoices
- 說明：取得發票領取地點

#### Request Body

#### Response

```json
{
  "data": [{ "option": "央廚", "value": "1" }]
}
```

---

### 建立訂單（結帳）

- Method: POST
- Path: /api/orders
- 說明：建立新訂單

#### Request Body

| 欄位                      | 型別   | 必填 | 說明                             |
| ------------------------- | ------ | ---- | -------------------------------- |
| groupBuyId                | string | 是   | 團購主題的 id                    |
| buyItems                  | array  | 是   | 訂單商品清單                     |
| buyItems[].productId      | string | 是   | 商品 ID                          |
| buyItems[].quantity       | number | 是   | 購買數量                         |
| pickUpDate                | string | 是   | 取貨日期                         |
| pickUpMethod              | string | 是   | 取貨方式(宅配、央廚、新生店...)  |
| shippingInfo              | object | 否   | 宅配資訊(取貨方式為宅配時為必填) |
| shippingInfo.name         | string | 是   | 收件人姓名                       |
| shippingInfo.phone        | string | 是   | 收件人電話                       |
| shippingInfo.address      | string | 是   | 收件地址                         |
| shippingInfo.deliveryTime | string | 是   | 希望到貨時段                     |
| invoice                   | object | 否   | 發票資訊                         |
| invoice.location          | string | 是   | 發票領取地點                     |
| invoice.donationCode      | string | 否   | 愛心碼                           |
| invoice.carrierId         | string | 否   | 載具                             |

```json
{
  "groupBuyId": "g2223",
  "buyItems": [
    {
      "productId": "P001",
      "quantity": 2
    }
  ],
  "pickUpDate": "2025/12/25",
  "pickUpMethod": "1", //ex:宅配的value
  "bagQty": 2,
  "shippingInfo": {
    "name": "Steve Lin",
    "phone": "0912345678",
    "address": "台北市中山區...",
    "deliveryTime": "13:00以後"
  },
  "invoice": {
    "location": "",
    "donationCode": "",
    "carrierId": "/ABCD1234"
  }
}
```

#### Response

```json
{
  "data": {}
}
```

---

## 五、訂單列表頁面（Order List Page）


### 使用情境

- 使用者查看自己的歷史訂單
- 支援分頁
- 可依訂單編號或日期區間搜尋

---

### 取得訂單列表

- Method: GET
- Path: /api/orders
- 說明：取得訂單列表

#### Query Params

| 欄位      | 型別   | 必填 | 說明             |
| --------- | ------ | ---- | ---------------- |
| page      | number | 是   | 目前的分頁       |
| pageSize  | number | 是   | 一個分頁顯示幾筆 |
| orderId   | number | 否   | 要查詢的訂單編號 |
| startDate | string | 否   | 要查詢的日期區間 |
| endDate   | string | 否   | 要查詢的日期區間 |

#### Response

```json
{
  "orderList": [
    {
      "orderId": "ORD-20250808-001",
      "createdAt": "2025-12-22 10:30",
      "pickUpMethod": "央廚",
      "orderStatus": "成立",
      "totalAmount": 1280,
      "bagQty": 1,
      "pickUpDate": "2025-12-22",
      "groupBuyName":"牛之饗宴",
      "groupBuyPeriod":"2025/12/02~2025/12/03",
      "buyItems": [
        {
          "name": "小籠包",
          "qty": 2,
          "price": 130
        }
      ],
      "shippingInfo": {
        "trackingNumber": "907344452512",
        "shippingFee": 240,
        "name":"王爸爸",
        "address":"台中市XX區OO里OO路66號",
      },
      "invoice": {
        "carrierId": "",
        "donationCode": "",
        "invoiceNumber": "VF77576717",
        "invoiceDate": "20251223"
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
