/*
 *@FileDescription: 关于select组件的一些公用组件方法
 *@Author: LiXiang
 *@Date: 2021-04-14 17:38:32
 *@ReleaseNote:
 */
import {
  restfulGetSimple
} from "@/api/common/requestPost";
import {
  options
} from "runjs";

// 查询接口
const queryOptionsApi = url => restfulGetSimple(url, null);

/**
 * options变化赋值： 从srcArray中，根据LabelKey, valKey的值进行过滤，得到label,value的options数组
 * @param {*} srcArray: 数组信息
 * @param {*} labelKey: label的key
 * @param {*} valKey：label的key
 */
export const getOptionsArray = (srcArray, labelKey, valKey) => {
  const options = [];
  if (srcArray && srcArray.length > 0) {
    srcArray.forEach(item => {
      options.push({
        label: item[labelKey],
        value: item[valKey]
      });
    });
  }
  return options;
};

export const getOptionsObj = (srcArray, labelKey, valKey) => {
  const options = [];
  if (srcArray && srcArray.length > 0) {
    srcArray.forEach(item => {
      options.push({
        label: item[labelKey],
        value: item[valKey]
      });
    });
  }
  return {
    options: options
  };
};

// @ApiDescription: 查询options
export const getOptionsByUrl = (url, optionObj) => {
  if (url) {
    queryOptionsApi(url).then(respJson => {
      console.log("getOptionsByUrl:", optionObj, respJson);
      if (respJson.data) {
        optionObj.options = respJson.data;
      }
    });
  }
};
/* 处理单条数组数据转化成value label形式 */
export const getOptionstransformArray = (arrayList) => {
  let options = [];
  arrayList.forEach(item => {
    options.push({
      label: item,
      value: item
    });
  });
  return {
    options: options
  };
};
