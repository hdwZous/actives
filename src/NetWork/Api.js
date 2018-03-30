module.exports = {
  // 奖品商店-查询奖品列表接口
  GET_REWARD_LIST: '/rpu/shop/awardsku/getSkus',

  //设置奖品-查询活动信息接口
  GET_CONFIG_REWARD_INFO: 'ryu/shop/act/getActT',

  //设置奖品-保存活动信息接口
  GET_CONFIG_REWARD_SAVE: 'ryu/shop/act/saveActT',

  //设置奖品-选择奖品-奖品列表查询接口
  GET_CONFIG_SELECT_WARD_INFO: '/ryu/shop/act/getAwardSkus',

  //奖品商店-查询奖品列表接口
  GET_SHOP_WARD_INFO: '/ryu/shop/awardsku/getSkus',

  //奖品商店-申请奖品接口
  GET_SHOP_WARD_APPLY: '/ryu/shop/awardsku/applyAward',

  //奖品商店-奖品详情接口
  GET_SHOP_WARD_DETAIL: '/ryu/shop/awardsku/getSkuById',

  //奖品商店-上传图片
  GET_SHOP_UPLOAD: '/ryu/shop/upload/img',

  //消费信息详情-消费信息查询接口
  GET_CONSUMPTION_INFO: '/ryu/shop/consumption/getConsumptionInfo',

  //活动组件详情-活动信息查询接口
  GET_ACTIVE_COMPONENT_INFO: '/ryu/shop/act/getDetail',

  //活动组件详情-参与名单查询接口
  GET_ACTIVE_COMPONENT_LIST: '/ryu/shop/act/getActRecord',

  //查询活动费用接口
  GET_ACTIVE_COST_LIST: '/ryu/shop/act/getActCost',

  //配置完成-完成（查询费用是否够用）
  GET_ACTIVE_COST_CHECK: '/ryu/shop/act/checkAct',

  //设置规则-查询活动规则接口
  GET_ACTIVE_RULE_INFO: '/ryu/shop/act/getActRule',

  //设置规则-刷新接口
  GET_ACTIVE_RULE_REFRESH: '/ryu/shop/support/getUserTags',

  //设置规则-保存
  GET_ACTIVE_RULE_SAVE: '/ryu/shop/act/saveActRule',

  //获取actKeys
  GET_ACTIVE_ACTKEYS: '/ryu/shop/act/getActsByPageId',

  //智能定价-设置奖品-查询活动信息接口
  GET_SMART_ACTIVE_PRICE_INFO: '/ryu/shop/act/intelligencePrice/getActT',

  //智能定价-设置奖品-保存活动信息接口
  GET_SMART_ACTIVE_PRICE_SAVE: '/ryu/shop/act/intelligencePrice/saveAct',

  //智能定价-设置规则-查询规则信息接口
  GET_FIXED_SET_RULE_INFO: '/ryu/shop/act/intelligencePrice/getRuleT',

  //智能定价-设置规则-保存规则信息接口
  GET_FIXED_SET_RULE_SAVE: '/ryu/shop/act/intelligencePrice/saveRule',
}
