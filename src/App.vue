<template>
      <div id="app" ref="app" :style="{'background':currentBg==null?'#fff':`url(${currentBg})`,'backgroundSize':'100%','backgroundRepeat':'no-repeat','backgroundPosition': 'center'}" >
            <!--开始进入页面-->
          <div class="inital" v-if="onceShow"></div>
          <div>
              <keep-alive>
              <router-view :bills="cashData" :monthExpend="monthExpends" :monthIncome="monthIncomes"
                           @toggleAnimate="toggleAnimate" @removeBill="removeBill" @addBill="addBill" @emptyBill="emptyBill" @educeExcel="educeExcel" @bgImg="bgImg" />
              </keep-alive>
          </div>
            <!-- 添加账单页面-->
          <AddBill v-show="AddBillShow" @closeAdd="inBill" @onceFinish="onceFinish" @transferAccount="transferAccount" :writeBill="writeBill" @againWriteBill="againWriteBill" />
          <!-- 底部分页器-->
          <ul class="tab-bar">
              <router-link tag="li" to="/property" exact-active-class="active" @click.native="display"  class="normal-color"  >
                  <span class="iconfont" >&#xe6b0;</span>
                  <p>资产</p>
              </router-link>
              <router-link tag="li" to="/reportforms" exact-active-class="active" @click.native="display"  class="normal-color"  >
                  <span class="iconfont" >&#xe608;</span>
                  <p>报表</p>
              </router-link>
              <li class="normal-color" >
                  <router-link tag="div" to="/"  v-show="bool" @click.native="addBill"  exact-active-class="active" >
                      <span class="iconfont" >&#xe668;</span>
                  </router-link>

                  <router-link tag="div" to="/" exact-active-class="active" v-show="!bool"  @click.native="inBill" >
                      <span class="iconfont" >&#xe742;</span>
                      <p>账单</p>
                  </router-link>
              </li>
              <router-link tag="li" to="/makemoeny" exact-active-class="active" @click.native="display"  class="normal-color"  >
                  <span class="iconfont" >&#xe61b;</span>
                  <p>赚钱</p>
              </router-link>
              <router-link tag="li" to="/more" exact-active-class="active" @click.native="display" class="normal-color"  >
                  <span class="iconfont" >&#xe60e;</span>
                  <p>更多</p>
              </router-link>
          </ul>

  </div>
</template>

<script>
    export default {
        data: () =>({
            currentBg:null,
            bool:true,//切换账单的icon
            writeBill:null,//需要修改的账单的信息
            AddBillShow:false,
            onceShow:true, //进入app的页面
            isLoading: false,//判断登录
            cashData:null,
            bill:[
                /*{
                    id:new Date().getTime(),
                    choose:'AddIncome',
                    remark:'今日消费',
                    img:'../../assets/small/Constellation_bg.jpg',
                    payWay:'现金',
                    price:'63.60',
                    icon:{
                        icon:"shoucang",
                        txt:"其他",
                        bgIcon:"#a2d7f3"
                    },
                    toggle:false
                }*/
            ]
        }),
        components:{
            AddBill:() => import('./components/add/AddBill')
        },
        computed:{
            monthExpends(){
                if(this.cashData){
                    let expendPrice =0
                    this.cashData.filter(item=>{
                        if(item.choose=='AddExpend'){
                            expendPrice += Number(item.price)
                        }
                    })
                    return expendPrice.toFixed(2)
                }else{
                    return '0.00'
                }
            },
            monthIncomes(){
                if(this.cashData){
                    let incomesPrice =0
                    this.cashData.filter(item=>{
                        if(item.choose=='AddIncome'){
                            incomesPrice += Number(item.price)
                        }

                    })
                    return incomesPrice.toFixed(2)
                }else{
                    return '0.00'
                }
            }
        },
        watch:{
            bill:function(){
              this.cashData=this.bill.filter(item=>item.choose !='AddAccount')
            }
        },
        methods:{
            //更换背景图片
            bgImg(value){
                this.axios('/background/get')
                        .then(res=>{
                            let imgArr=[]
                            imgArr =res.data.data.backGrounds
                            this.loading=false
                            imgArr.forEach(item=>{
                                if(item.autokid==value){
                                    this.currentBg=item.big_url
                                    window.localStorage.setItem('bg',this.currentBg)
                                }
                            })
                        })
            },
            //导出Excel
            educeExcel(){
                if(this.bill.length>0){
                    let str = '序号,事项,账户,支出,收入,备注\n';
                    this.bill.forEach((item,index)=>{
                        if(item.choose=='AddIncome'){
                            str += (index+1).toString()+`,${item.icon.txt},${item.payWay},0.00\t,${item.price}\t,${item.remark},\n`
                        }else{
                            str += (index+1).toString()+`,${item.icon.txt},${item.payWay},${item.price}\t,0.00\t,${item.remark},\n`

                        }
                    })
                    let blob = new Blob([str], {type: "text/plain;charset=utf-8"});
                    blob = new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
                    let billUrl = window.URL.createObjectURL(blob);
                    let link = document.createElement("a");
                    link.href = billUrl;
                    link.download = "我的账单.csv";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }else{
                    this.$toast('您没有数据可导出,快去添加数据吧~');
                }
            },
            //清空数据
            emptyBill(){
                this.$toast.loading({
                    message: '清除中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                    onClose:()=>{
                        this.bill=[]
                        window.localStorage.removeItem('data')
                        window.localStorage.setItem('data',JSON.stringify(this.bill))
                    }
                });
            },
            display(){
                this.bool=false
                this.AddBillShow=false //隐藏添加账单组件
            },
            //进入账单页面
            inBill(){
                this.bool=true
                this.AddBillShow=false
            },
            //添加/修改账单
            addBill(item){
                this.bool=true
                this.AddBillShow=true
                this.writeBill=item
            },
            onceFinish(remark,img,price,icon,choose,payWay){    /*支出和收入*/
                this.AddBillShow=false
                    this.bill.unshift({
                        id:new Date().getTime(),
                        choose,
                        remark,
                        img,
                        payWay,
                        price,
                        icon,
                        toggle:false
                    })
                window.localStorage.removeItem('data')
                window.localStorage.setItem('data',JSON.stringify(this.bill))
            },
            transferAccount(remark,img,price,choose,rollOut,rollIn){   /*转账*/
                this.AddBillShow=false
                this.bill.unshift({
                    id:new Date().getTime(),
                    choose,
                    remark,
                    img,
                    rollOut,
                    rollIn,
                    price
                })
                window.localStorage.removeItem('data')
                window.localStorage.setItem('data',JSON.stringify(this.bill))
            },
            againWriteBill(id,remark,img,price,icon,choose,payWay){   /*修改账单*/
                this.AddBillShow=false
                this.bill=this.bill.map(item=>{
                    if(item.id==id){
                        return  {...item, remark, img, price, icon, choose, payWay,toggle:false}
                    }
                    return item
                })
                window.localStorage.removeItem('data')
                window.localStorage.setItem('data',JSON.stringify(this.bill))
            },
            //点击图标,展示删除和修改
            toggleAnimate(item){
                   item.toggle=!item.toggle
            },
            //删除账单
            removeBill(id){
               this.bill = this.bill.filter(item=>(item.id!=id))
                window.localStorage.removeItem('data')
                window.localStorage.setItem('data',JSON.stringify(this.bill))
            }
        },
        mounted() {
            setTimeout(()=>this.onceShow=false,2000)
            /*window.localStorage.clear()*/
            if(window.localStorage.getItem('data')){
                this.bill=JSON.parse(window.localStorage.getItem('data'))
            }else{
                window.localStorage.setItem('data',JSON.stringify(this.bill))
            }

            if(window.localStorage.getItem('bg')){
                this.currentBg=window.localStorage.getItem('bg')
            }

        }
    }
</script>


<style lang="scss" scoped >
    #app {
        position: relative;
        width: 100vw;
        height: 100vh;

          .tab-bar {
              position: absolute;
              bottom: 0;
              display: flex;
              justify-content: space-around;
              align-items: center;
              width: 100vw;
              height: 7.2vw;
              border-top: 1px solid #e5e5e5;
              background: #ffffff;
              text-align: center;

              .normal-color {
                  color: #c1c1c1;

                  .iconfont{
                      font-size: 3.733vw;
                      display: inline-block;
                      margin-bottom: 0.665vw;
                  }

                  p {
                      font-size: 1.596vw;
                  }
              }

              .active{
                  color: #4f77e6;
              }
          }

        .inital {
            position: absolute;
            width: 100vw;
            height: 100vh;
            background: url("./assets/bg.png");
            background-size: 100%;
            z-index: 1000;
        }


    }



</style>


