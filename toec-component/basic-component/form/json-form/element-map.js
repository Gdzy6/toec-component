export default {
  // 默认输入类型
  input: {
    // 对应到 Element 中的组件 tag
    component: "el-input",
    // 传递给 Element 组件的默认 props
    props: {
      clearable: true,
      style: {
        width: "220px"
      }
    }
  },
  tag: {
    // 对应到 Element 中的组件 tag
    component: "el-tag",
    // 传递给 Element 组件的默认 props
    props: {
      effect: "plain",
      style: {
        width: "220px"
      }
    }
  },

  checkbox: {
    component: "el-checkbox",
    props: {
      clearable: true
    }
  },
  // 数字输入框
  inputNumber: {
    component: "el-input-number",
    props: {
      clearable: true
    }
  },
  // 多行文本
  textarea: {
    component: "el-input",
    props: {
      type: "textarea",
      rows: 1,
      style: {
        width: "220px"
      },
      "show-word-limit": true
    }
  },
  datePicker: {
    component: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "timestamp"
    }
  },
  switch: {
    component: "el-switch",
    props: {
      activeValue: "0",
      inactiveValue: "1",
      activeColor: "#13ce66",
      inactiveColor: "#ff4949"
    }
  },

  // 自定义的组件
  // 删除按钮，带确认
  deleteButton: {
    component: "base-delete-button"
  },
  // 确认xxxx操作按钮，带确认框
  confirmButton: {
    component: "base-confirm-button"
  },
  // // 自动搜索的input
  // inputAutoComplete: {
  //   component: 'base-input-auto-complete'
  // },
  // // 自动搜索input，带附加描述
  // inputAutoCompleteWithDesc: {
  //   component: 'base-input-auto-complete-with-desc'
  // },
  // // 具备过滤功能的select
  // selectFilterNoDesc: {
  //   component: 'base-select-filter-no-desc'
  // },
  // // 具备过滤功能的select，多选
  // selectMultipleFilter: {
  //   component: 'base-select-multiple-filter'
  // },
  // // 具备过滤功能的select，带描述
  // selectWithDescFilter: {
  //   component: 'base-select-with-desc-filter'
  // },
  select: {
    component: "base-select",
    props: {
      placeholder: "全部",
      clearable: true,
      style: {
        width: "220px"
      }
    }
  },
  selectInput: {
    component: "base-select-input",
    props: {
      clearable: true,
      style: {
        width: "220px"
      }
    }
  },
  threeSelectItem: {
    component: "three-select-item",
    props: {
      style: {
        width: "550px"
      }
    }
  },
  checkboxButton: {
    component: "base-checkbox-button"
  },
  checkboxGroup: {
    component: "base-checkbox-group"
  },
  radioGroupButton: {
    component: "base-radio-group-button"
  },
  radioGroup: {
    component: "base-radio-group"
  },
  inputAppend: {
    component: "base-input-append"
  },
  deleteIcon: {
    component: "base-delete-icon"
  },

  // 上传文件
  upload: {
    component: "base-upload-file"
  },
  // 上传图片
  uploadImg: {
    component: "base-upload-img"
  },
  // 日期时间选择器，可以自动进行时间格式转换
  startEndDatePicker: {
    component: "base-date-picker"
  },
  singleDatePicker: {
    component: "base-single-date-picker",
    props: {
      timeFormat: "timestamp"
    }
  },
  compactSubForm: {
    component: "compact-json-form"
  },
  tree: {
    component: "el-tree"
  },
  radioGroupDatePicker: {
    component: "base-radio-group-date-picker"
  }
};
