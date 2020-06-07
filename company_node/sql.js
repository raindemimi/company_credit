// sql语句
var sql = {
  // 用户表
  user: {
    // 添加用户
    add: 'insert into user(name, age) values (?, ?)',
    // 查询用户
    select: 'select * from users where username like ? and password like ?',
    selectByToken: 'select * from users where token like ?'
  },
  // 企业工商信息表
  company: {
    // 根据关键词查询企业
    selectByName: 'SELECT * FROM company WHERE name LIKE "%"?"%"',
    // 根据id查询
    selectById: 'SELECT * FROM company WHERE id=?'
  },
  // 股东信息表
  share_info: {
    selectById: 'SELECT * FROM shareholder_information WHERE id=?'
  },
  // 外链网站表
  website: {
    select: 'SELECT * FROM website'
  },
  // 上市企业信息操作
  company2: {
    // 根据关键词查询企业
    selectByName: 'SELECT * FROM company2 WHERE company_name LIKE "%"?"%"',
    // 根据id查询
    selectByCode: 'SELECT * FROM company2 WHERE code=?'
  },
  // 成本费用分析表
  cost: {
    select: 'SELECT * FROM cost WHERE `code`=?;'
  },
  // 利润表
  lrb: {
    // selectByCode: 'SELECT `year`, `pre_tax`, `after_tax`, `father_profit`, `operating_receipt`, `other_receipt`, `sales_expenses`, `manage_expenses`, `financial_expenses`, `sales_cost`, `gross_margin`, `experience_profit`, `ratio`, `net_amount1`, `net_amount2`, `premium_income` FROM lrb WHERE `code`=?'
    selectByCode: 'SELECT * from lrb WHERE `code`=? order by year asc'
  },
  // 现金流量表
  xjllb: {
    // selectByCode: 'SELECT `year`,cash_net_amount1,cash_net_amount2,cash_net_amount3,cash_add_amount1,cash_balance,alter_affect,cash_balance_amount FROM xjllb WHERE code = ?'
    selectByCode: 'SELECT * from xjllb WHERE `code`=? order by year asc'
  },
  // 资产负债表
  zcfzb: {
    selectByCode: 'SELECT * from zcfzb WHERE `code`=? order by year asc'
  },
  // 偿债能力分析表
  paying: {
    selectByCode: 'SELECT * from paying WHERE `code`=?'
  },
  // 盈利能力分析表
  profit: {
    selectByCode: 'SELECT * from profit WHERE `code`=?'
  },
  economies: {
    selectByCode: 'SELECT * from economies WHERE `code`=?'
  },
  comment: {
    select: 'SELECT * from comment WHERE `company`=? order by date desc',
    add: "INSERT INTO `comment` (`username`, `conent`, `date`, `nickname`, `sumup`, `sumdown`, `company`) VALUES ('admin', ?, ?, '雨季不再来', 0, 0, '腾讯控股')",
    delete: 'delete from comment WHERE `id`=?'
  }

}

module.exports = sql
