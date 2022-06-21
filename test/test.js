const productInfo=
 [
          {
              "id": 11,
              "skuId": null,
              "rejectedQualitySwitch": 0,
              "rejectedQualityRatio": 0,
              "bearLossSwitch": 0,
              "bearLossRatio": 0,
              "version": null,
              "file": {
                  "id": null,
                  "uploadUrl": null,
                  "showUrl": null,
                  "fileName": null,
                  "contentMd5": null,
                  "version": null,
                  "describe": null,
                  "businessAttribute": null,
                  "businessId": null
              },
              "isSkuDetail": true,
              "baseName": "恒顺葱姜料酒 480ml/瓶55",
              "source": 1,
              "productId": 11,
              "productName": "恒顺葱姜料酒 480ml/瓶55",
              "disabled": false,
              "error": false,
              "nutrients": "",
              "nutrientsCity": "[]",
              "supplierId": null,
              "hasMakeUp": 1,
              "materialId": 11,
              "competitorPrice": "",
              "priceCity": [
                  {
                      "city_id": "2701",
                      "city_name": "乌鲁木齐市",
                      "price": 11
                  },
                  {
                      "city_id": "0201",
                      "city_name": "北京市",
                      "price": 11
                  }
              ],
              "originId": "1",
              "originIdCity": [],
              "storageValueId": 1,
              "storageValueIdRegion": [],
              "qualityPeriod": 0,
              "qualityPeriodRegion": [],
              "temperatureLayer": 1,
              "temperatureLayerCity": [],
              "isShowProductDateCity": [],
              "salePeriod": 0,
              "salePeriodRegion": [],
              "weightLower": 10,
              "weightCeiling": 110,
              "productionSide": 0,
              "productionSideRegion": [],
              "volume": "11,111,111",
              "volumeRegion": [],
              "weightRegion": [],
              "productRoleId": 1,
              "productRoleIdCity": [],
              "propertys": [],
              "cityPrice": [
                  {
                      "city_name": "乌鲁木齐市",
                      "value": 11
                  },
                  {
                      "city_name": "北京市",
                      "value": 11
                  }
              ],
              "cityExtend": {
                  "nutrients_city": "[]"
              },
              "shelfCosts": [],
              "productLinkProperty": [],
              "opLevelList": {},
              "isModify": "",
              "addRemark": "",
              "templateId": "",
              "templateOriginImageDetails": "",
              "templateOriginImageList": "",
              "templateOriginImagePreferentialChoice": "",
              "cityList": "",
              "templateName": "",
              "imageList": "",
              "vodFileid": "",
              "vodFilename": "",
              "vodFileidDetail": "",
              "vodFilenameDetail": "",
              "imageDetails": "",
              "imagePreferentialChoice": ""
          },
          {
              "id": 321,
              "skuId": 321,
              "rejectedQualitySwitch": 0,
              "rejectedQualityRatio": 0,
              "bearLossSwitch": 0,
              "bearLossRatio": 0,
              "version": 1,
              "file": {
                  "id": null,
                  "uploadUrl": null,
                  "showUrl": null,
                  "fileName": null,
                  "contentMd5": null,
                  "version": null,
                  "describe": null,
                  "businessAttribute": null,
                  "businessId": null
              },
              "isSkuDetail": true,
              "baseName": "可口可乐 330ml/罐",
              "source": 1,
              "productId": 321,
              "productName": "可口可乐 330ml/罐",
              "disabled": false,
              "error": false,
              "nutrients": "",
              "nutrientsCity": "[]",
              "supplierId": null,
              "hasMakeUp": 1,
              "materialId": 12,
              "competitorPrice": "",
              "priceCity": [
                  {
                      "city_id": "2701",
                      "city_name": "乌鲁木齐市",
                      "price": 11
                  },
                  {
                      "city_id": "0201",
                      "city_name": "北京市",
                      "price": 11
                  }
              ],
              "originId": "1",
              "originIdCity": [],
              "storageValueId": 1,
              "storageValueIdRegion": [],
              "qualityPeriod": 0,
              "qualityPeriodRegion": [],
              "temperatureLayer": 1,
              "temperatureLayerCity": [],
              "isShowProductDateCity": [],
              "salePeriod": 0,
              "salePeriodRegion": [],
              "weightLower": 10,
              "weightCeiling": 110,
              "productionSide": 0,
              "productionSideRegion": [],
              "volume": "11,11,11",
              "volumeRegion": [],
              "weightRegion": [],
              "productRoleId": 1,
              "productRoleIdCity": [],
              "propertys": [],
              "cityPrice": [
                  {
                      "city_name": "乌鲁木齐市",
                      "value": 11
                  },
                  {
                      "city_name": "北京市",
                      "value": 11
                  }
              ],
              "cityExtend": {
                  "nutrients_city": "[]"
              },
              "shelfCosts": [],
              "productLinkProperty": [],
              "opLevelList": {},
              "isModify": "",
              "addRemark": "",
              "templateId": "",
              "templateOriginImageDetails": "",
              "templateOriginImageList": "",
              "templateOriginImagePreferentialChoice": "",
              "cityList": "",
              "templateName": "",
              "imageList": "",
              "vodFileid": "",
              "vodFilename": "",
              "vodFileidDetail": "",
              "vodFilenameDetail": "",
              "imageDetails": "",
              "imagePreferentialChoice": ""
          }
]

const toHump = (name) => {
  return name.replace(/\_(\w)/g, function (all, letter) {
      return letter.toUpperCase();
  });
};

const dfs = (data) => {
  if (typeof data === 'object' && data === null) return;
  const params = {};
  for (const key in data) {
      const item = data[key];
      const humpKey = toHump(key);
      if (item?.constructor === Array) {
          // console.log('数组', item);
          for (let i = 0; i < item.length; i++) {
              params[humpKey] = dfs(item[i]);
          }
      } else if (item?.constructor === Object) {
          // console.log('对象');
          params[humpKey] = dfs(item);
      } else {
          params[humpKey] = item;
      }
  }
  return params;
};
const productInfoSkulist =[];
for (let i = 0; i < productInfo.length; i++) {
  const item = productInfo[i];
  const newItemToHump = dfs(item);
  productInfoSkulist.push(newItemToHump);
}

console.log(productInfoSkulist)