import Vue from 'vue'
import VueRouter from 'vue-router'
import Bill from '../views/home_view/Bill'
import Property from '../views/home_view/Property'
import ReportForms from '../views/home_view/ReportForms'
import MakeMoeny from '../views/home_view/MakeMoeny'
import More from '../views/home_view/More'


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"Bill",
    component:Bill
  },
  {
    path:"/property",
    name:"Property",
    component:Property
  },
  {
    path:"/reportforms",
    name:"ReportForms",
    component:ReportForms
  },
  {
    path:"/makemoeny",
    name:"MakeMoeny",
    component:MakeMoeny
  },
  {
    path: "/more",
    name:"More",
    component: More
  },
  {
    path: "/login",
    name:"login",
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*router.beforeEach((to,from,next) =>{

  console.log(to,from,next)
    if(to.name === ""){
        if(document.cookie){
            next()
        }else{
            next({name:'login'})
        }
    }else{
        next()
    }
})*/



export default router
