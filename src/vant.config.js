import { Button } from 'vant';
const  vants=[Button]

export default {
	install(Vue) {
		vants.forEach(Component =>{
			Vue.use(Component)
		})
	}
}