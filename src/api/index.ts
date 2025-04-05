export enum PrizeDrawApiEnum {
  createRule = 'createRule',
  findAllRule = 'findAllRule',
  findPageRule = 'findPageRule',
  findOneRule = 'findOneRule',
  updateRule = 'updateRule',
  removeRule = 'removeRule',
  createGroup = 'createGroup',
  findAllGroup = 'findAllGroup',
  findOneGroup = 'findOneGroup',
  updateGroup = 'updateGroup',
  removeGroup = 'removeGroup',

  startPriceDraw = 'startPriceDraw', // 开始抽奖
}

export enum VerifyBotApiEnum {
  createWhiteList = 'createWhiteList',
  findAllWhiteList = 'findAllWhiteList',
  removeWhiteList = 'removeWhiteList'
}

export enum SystemJobApiEnum {
  getJobList = 'getJobList',
  getJob = 'getJob',
  createJob = 'createJob',
  updateJob = 'updateJob',
  removeJob = 'removeJob',
  changeJobStatus = 'changeJobStatus',
  runJob = 'runJob',
}