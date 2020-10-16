import { NumberKeyboard,Toast,Popup ,Icon ,Uploader,Circle,Switch,ShareSheet,Button,Divider ,Dialog  ,Skeleton} from 'vant';
const  vants=[NumberKeyboard,Toast,Popup,Icon,Uploader ,Circle ,Switch,ShareSheet,Button,Divider,Dialog ,Skeleton ]

export default {
	install(Vue) {
		vants.forEach(Component =>{
			Vue.use(Component)
		})
	}
}