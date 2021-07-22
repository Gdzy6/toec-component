import ElementMap from './element-map'
import { isFunction } from 'element-ui/src/utils/types'

const InputMap = [
  'el-input',
  'el-input-number',
  'toec-input-auto-complete',
  'toec-input-auto-complete-with-desc'
]

function getRule(item) {
  // console.log("getRule");
  // 目前仅对input进行校验
  const { rule, isRequired, compType, title, validator } = item

  // rule可能是多条，比如说需要对非空进行校验，对长度校验，还可能需要用正则校验
  // 每条校验的message都不一样，所以返回的可能是一个array

  const ruleArray = []

  // 1. 对必要的字段进行转换
  if (rule || isRequired) {
    // 1).required
    if (isRequired || (rule && rule.required)) {
      const ruleRequired = {}
      ruleRequired.required = true
      // 针对必填项进行提示
      // if (compType.includes('input') || compType.includes('DatePicker')) {
      //   ruleRequired.message = `请输入${title}`
      //   ruleRequired.trigger = 'blur'
      // } else
      if (
        compType.includes('select') ||
        compType.includes('checkbox') ||
        compType.includes('radio')
      ) {
        ruleRequired.message = `请选择${title}`
        ruleRequired.trigger = 'change'
      } else {
        ruleRequired.message = `请输入${title}`
        ruleRequired.trigger = 'blur'
      }
      ruleArray.push(ruleRequired)
    }
    // 2)对最大长度进行提示
    if (compType.includes('input') && rule && rule.max) {
      const ruleMaxLen = {}
      ruleMaxLen.max = rule.max
      ruleMaxLen.message = `${title}长度不能大于${Number(rule.max)}`
      ruleMaxLen.trigger = 'blur'
      ruleArray.push(ruleMaxLen)
    }

    // 3)正则表达式校验, 可能附带其他的transform和复杂校验
    if (
      compType.includes('input') &&
      rule &&
      (rule.type || rule.pattern || rule.transform || rule.validator)
    ) {
      const ruleRegExp = {}
      if (rule.type) {
        ruleRegExp.type = rule.type
      }
      if (rule.pattern) {
        ruleRegExp.pattern = rule.pattern
      }
      if (rule.transform) {
        ruleRegExp.transform = rule.transform
      }
      if (rule.validator) {
        ruleRegExp.validator = rule.validator
      }
      if (rule.message) {
        ruleRegExp.message = rule.message
      }
      // else {
      //   ruleRegExp.message = `请输入正确格式的${title}`;
      // }
      ruleRegExp.trigger = 'blur'
      ruleArray.push(ruleRegExp)
    }
  }

  return ruleArray
}

function getStyle(item, widthType) {
  // 如果item.formItemWidth有效，则进行每个item的width属性绑定
  let curWidth = '220px'
  if (widthType === 'wide') {
    curWidth = widthType === 'wide' ? '420px' : '220px'
  } else {
    curWidth = widthType
  }

  item.props.style = 'width:' + curWidth
  // item.props = { style: 'width:' + curWidth }
  // if (!item.props) {
  // item.props = Object.assign({}, { style: 'width: ' + curWidth }, item.props)
  // }
  // return { style: 'width: ' + curWidth }
}

// 整form禁用
function disabledHandler(item) {
  item.props.disabled = true
}

export function computeFormItem(config, form, widthType, disabled) {
  console.log('computeFormItem', config, form, widthType)
  const item = {
    ...config
  }
  // 计算组件真实对应的名称并传入一些默认配置
  const res = ElementMap[item.compType || 'input']
  item.compType = res.component ? res.component : 'el-input'
  item.props = Object.assign({}, res.props, item.props)

  // 处理样式
  if (widthType) {
    getStyle(item, widthType)
  }

  // 处理是否全form禁用
  if (disabled) {
    disabledHandler(item)
  }

  /**
   * 处理表单联动：1)A为XXX时，B为一个范围的值或者某个特定值；2)A为XXX时，B显示，否则不显示
   * 第一种，直接通过getOptions, 写成函数按不同的条件return不同的值即可
   * 第二种，直接是通过ifRender这个函数来进行标识即可。
   */

  // 专门为select，增加了联动处理
  if (isFunction(item.getOptions)) {
    Object.assign(item, item.getOptions(form))
  }

  // 专为select做处理
  if (
    item.compType.includes('select') ||
    item.compType.includes('input-append') ||
    item.compType.includes('checkbox') ||
    item.compType.includes('radio') ||
    item.compType === 'base-date-picker' ||
    item.compType === 'base-single-date-picker' ||
    item.compType === 'base-delete-icon' ||
    item.compType === 'base-radio-group-date-picker'
  ) {
    Object.assign(item.props, {
      formData: form
    })
    Object.assign(item.props, {
      formKey: item.key
    })
    if (item.compType === 'base-select-input') {
      // formData传入后赋值
      const key1 = item.key
      // item.props.formData[key1] = ''
      // form[key1] = ''
      Object.assign(item.props, {
        inputKey: item.inputKey
      })
      Object.assign(item.props, {
        selectKey: item.selectKey
      })
    }
  }

  if (item.compType === 'three-select-item') {
    //需要对formData进行字段的赋值
    Object.assign(item.props.formData, {
      provinceCode: ''
    })
    Object.assign(item.props.formData, {
      cityCode: ''
    })
    Object.assign(item.props.formData, {
      districtCode: ''
    })
  }
  item._ifRender = isFunction(item.ifRender) ? !!item.ifRender(form) : true

  // 防止表单提交时存在多余key
  if (!item._ifRender) {
    delete form[item.key]
  }

  // 处理校验
  item._rule = getRule(item)
  // console.log(item, "***********");

  // 设置内容宽度
  if (item.contentWidth) {
    const temp =
      typeof item.contentWidth === 'number'
        ? `${item.contentWidth}px`
        : item.contentWidth
    item.props.style = {
      width: temp
    }
  }
  return item
}
