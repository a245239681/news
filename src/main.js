import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'lib-flexible/flexible'
import './assets/css/reset.css'
import './assets/css/border.css'
import {
  Button,
  NavBar,
  Search,
  Row,
  Col,
  Icon,
  Tabbar,
  TabbarItem,
  Divider,
  Popup,
  Area,
  PullRefresh,
  Field,
  CellGroup,
  Cell,
  DropdownMenu,
  DropdownItem,
  AddressEdit,
  RadioGroup,
  Radio,
  Form,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Tab,
  Tabs,
  ActionSheet,
  Picker,
  DatetimePicker,
  List,
} from 'vant'
Vue.use(Button)
  .use(NavBar)
  .use(Search)
  .use(Row)
  .use(Col)
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Divider)
  .use(VanImage)
  .use(Popup)
  .use(Area)
  .use(PullRefresh)
  .use(Field)
  .use(CellGroup)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(AddressEdit)
  .use(RadioGroup)
  .use(Radio)
  .use(Form)
  .use(Cell)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(ActionSheet)
  .use(Picker)
  .use(DatetimePicker)
  .use(List)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
