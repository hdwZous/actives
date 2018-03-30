import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import { Router, Route, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import SetCoupon from './pages/SetCoupon';
import RedPacket from './pages/RedPacket';
import SetRule from './pages/SetRule';
import FinishAward from './pages/FinishAward';
import ConfigAward from './pages/ConfigAward';
import AwardDetail from './pages/AwardDetail';
import NotFound from './pages/NotFound';
import RightInterestShop from './pages/RightInterestShop';
import SelectAward from './pages/SelectAward';
import ApplyAward from './pages/ApplyAward';
import SelectAwardDetail from './pages/SelectAwardDetail';
import ExpensesRecord from './pages/ExpensesRecord';
import ActiveComponent from './pages/ActiveComponent';
import UploadImage from './pages/UploadImage';
import ConfigAwardFixed from './pages/ConfigAwardFixed';
import SetRuleFixed from './pages/SetRuleFixed';
import ConfigAwardGroup from './pages/ConfigAwardGroup';
import moment from 'moment'
import 'moment/locale/zh-cn';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';


import 'antd/dist/antd.css';
import './css/reset.css';

var baseURL = '/ryu/shop/pro'

function splicePath(path) {
  return `${baseURL}${path}`
}

const history = createBrowserHistory()

var rootRoute =
<LocaleProvider locale={zh_CN}>
  <Router history={history}>
    <div>
      <Route path={splicePath('/pg_setCoupon')} component={SetCoupon}/>
      <Route path={splicePath('/pg_redPacket')} component={RedPacket}/>
      <Route path={splicePath('/pg_setRule/:actKey/:eventID')} component={SetRule}/>
      <Route path={splicePath('/pg_finishAward/:actKey/:eventID')} component={FinishAward}/>
      <Route path={splicePath('/pg_configAward/:actKey/:eventID')} component={ConfigAward}/>
      <Route path={splicePath('/pg_awardDetail/:skuId')} component={AwardDetail}/>
      <Route path={splicePath('/pg_rightInterestShop')} component={RightInterestShop}/>
      <Route path={splicePath('/pg_selectAward')} component={SelectAward}/>
      <Route path={splicePath('/pg_applyAward')} component={ApplyAward}/>
      <Route path={splicePath('/pg_selectAwardDetail/:skuId')} component={SelectAwardDetail}/>
      <Route path={splicePath('/pg_expensesRecord/:pageID')} component={ExpensesRecord}/>
      <Route path={splicePath('/pg_activeComponent/:pageID')} component={ActiveComponent}/>
      <Route path={splicePath('/pg_uploadImage')} component={UploadImage}/>
      <Route path={splicePath('/pg_setRuleFixed/:actKey/:eventID')} component={SetRuleFixed}/>
      <Route path={splicePath('/pg_configAwardFixed/:actKey/:eventID')} component={ConfigAwardFixed}/>
      <Route path={splicePath('/pg_configAwardGroup')} component={ConfigAwardGroup}/>

      {/* <Route path="*" component={NotFound}/> */}
    </div>
  </Router>
</LocaleProvider>


ReactDOM.render(rootRoute, document.getElementById('root'));
registerServiceWorker();
