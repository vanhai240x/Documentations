# Dynamic Filter

## Interface
```
export interface IDynamicFilter {
  pagination: {
    pageSize: number;
    pageNumber: number;
    isPaging: boolean;
  };
  groupFilters: {
    filters: {
      operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'fc';
      field: string;
      value: string;
    }[];
    logic: { value: 'or' | 'and' };
  }[];
  sort: {
    predicate: string;
    reverse: boolean;
  }[];
}
```
Mỗi block `{ filters: {...}; logic: {...} }` này tương ứng với một trường cần filter.
Trong đó:
- `filters`: mảng chứa các giá trị filter.
  - `operator`: điều kiện filter:
    - `eq`: equal - so sánh bằng.
    - `neq`: not equal - so sánh khác.
    - `gt`: greater - lớn hơn.
    - `gte`: greater or equal - lớn hơn hoặc bằng.
    - `lt`: less - bé hơn.
    - `lte`: less or equal - bé hơn hoặc bằng.
    - `contains`: contains - chứa.
    - `fc`: first content - so sánh ký tự đầu tiên.
  - `field`: tên trường cần filter.
  - `value`: giá trị filter.
- `logic`: chứa điều kiện quan hệ giữa các giá trị trong mảng `filters`.
- `predicate`: tên trường cần sắp xếp.
- `reverse`: giá trị sắp sếp (`true` tương đương với 'desc', `false` tương đương với 'asc').


## Ví dụ
#### Làm việc với Searchbox: Tìm kiếm các dự án có chứa ký tự 'aria' theo tên hoặc mã dự án, sắp xếp theo ngày chỉnh sửa (LastModified).
```
{
  "pagination": {
    "pageSize": 10,
    "pageNumber": 1,
    "isPaging": true
  },
  "groupFilters": [
    {
      "filters": [
        {
          "operator": "contains",
          "field": "Project.Name",
          "value": "aria"
        },
        {
          "operator": "contains",
          "field": "Project.Code",
          "value": "aria"
        }
      ],
      "logic": {
        "value": "or"
      }
    }
  ],
  "sort": [
    {
      "predicate": "LastModified",
      "reverse": true
    }
  ]
}
```

#### Làm việc với Datetimepicker: Tìm kiếm các dự án được cập nhật từ ngày 01/09/2022 - 30/09/2022
```
{
  "pagination": {
    "pageSize": 10,
    "pageNumber": 1,
    "isPaging": true
  },
  "groupFilters": [
    {
      "filters": [
        {
          "operator": "gte",
          "field": "updateDate",
          "value": "2022-09-01"
        },
        {
          "operator": "lte",
          "field": "updateDate",
          "value": "2022-09-30"
        }
      ],
      "logic": {
        "value": "and"
      }
    }
  ],
  "sort": [
    {
      "predicate": "LastModified",
      "reverse": true
    }
  ]
}
```

#### Làm việc với Checkbox/Selectbox: Tìm kiếm các dự án theo mã dự án
```
{
  "pagination": {
    "pageSize": 10,
    "pageNumber": 1,
    "isPaging": true
  },
  "groupFilters": [
    {
      "filters": [
        {
          "operator": "eq",
          "field": "ProjectId",
          "value": "9e8e8c96-93db-42ff-b229-6813f5cbee96"
        },
        {
          "operator": "eq",
          "field": "ProjectId",
          "value": "7005f684-eefa-407f-8834-d12379a668db"
        }
      ],
      "logic": {
        "value": "or"
      }
    }
  ],
  "sort": [
    {
      "predicate": "LastModified",
      "reverse": true
    }
  ]
}
```

#### Làm việc với Searchbox và Selectbox: Tìm kiếm các dự án có chứa ký tự 'aria' và theo hạng mục (CategoryId) có id "13abd188".
```
{
  "pagination": {
    "pageSize": "10",
    "pageNumber": 1,
    "isPaging": true
  },
  "groupFilters": [
    {
      "filters": [
        {
          "operator": "contains",
          "field": "Project.Name",
          "value": "aria"
        },
      ],
      "logic": {
        "value": "or"
      }
    },
    {
      "filters": [
        {
          "operator": "eq",
          "field": "CategoryId",
          "value": "13abd188"
        },
      ],
      "logic": {
        "value": "or"
      }
    }
  ],
  "sort": [
    {
      "predicate": "LastModified",
      "reverse": true
    }
  ]
}
```