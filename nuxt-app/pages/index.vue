<script setup>
// const { data } = await $fetch('https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1079324519433678968');
// const dataAmerican = useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
// const dataJapanese = useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese');
// const dataFrench = useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese');
const[dataAmerican, dataJapanese, dataFrench] = await Promise.all([
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American'),
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese'),
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese'),
]);

const recipeAmerican = dataAmerican.data.value.meals;
const recipeJapanese = dataJapanese.data.value.meals;
const recipeFrench   = dataFrench.data.value.meals;

</script>

<script>
export default {
    data() {
        return {
            status: 'clear',
            rouletteRecipe: [
                // {
                // recipeName: 'あああ',
                // recipeImage: 'aaa',
                // ingredients: '材料一覧？',
                // colorStatus: false
                // },
                // {
                // recipeName: 'いいい',
                // recipeImage: 'iii',
                // ingredients: '材料一覧？',
                // colorStatus: false
                // },
                // {
                // recipeName: 'ううう',
                // recipeImage: 'uuu',
                // ingredients: '材料一覧？',
                // colorStatus: false
                // },
                // {
                // recipeName: 'えええ',
                // recipeUrl: 'eee',
                // ingredients: '材料一覧？',
                // colorStatus: false
                // }
            ],
            info: null,   
            intervalId: 0,
            country: 'not',
            targetOne: [],
            targetTwo: [],
            targetThree: [],
            targetFour: [],
            displayRoulette: false,
        }
    },


    methods: {

        // ルーレットを回す。
        start() {
            this.status = 'start';

            let attentionIndex = 0
            
            //　ルーレットの途中でスタートボタンが押されたら、初めから回し始める。
            this.rouletteRecipe.forEach(e => {
                e.colorStatus = false
            })

            this.intervalId = setInterval(() => {

                if(attentionIndex > 3) {
                    attentionIndex = 0
                }

                // 配列のインデックスによって、falseを入れる対象を定める。
                if (attentionIndex !== 0) {
                    this.rouletteRecipe[attentionIndex - 1].colorStatus = false
                } else if (attentionIndex === 0) {
                    this.rouletteRecipe[3].colorStatus = false
                }
                this.rouletteRecipe[attentionIndex].colorStatus = true

                attentionIndex++
                
            }, 90)

        },

        // 🌟これ使えない？関数定義
        // addProperty(obj) {
        //     obj.colorStatus = false;
        // },

        set() {

            this.displayRoulette = true;


            if (this.country === 'not') {
                alert('国名を選択してください。')

            } else if (this.country === 'american') {

                // インデックスにランダム関数を使い、レシピを取得する。その後、取得したレシピ以外のレシピ群からレシピを取得を4回行う。
                // this.targetOne = this.recipeAmerican[Math.floor(Math.random() * this.recipeAmerican.length)]

                // let remainingRecipe = this.recipeAmerican.filter((e) => {
                //     return e.idMeal !== this.targetOne.idMeal
                // })

                // this.targetTwo = remainingRecipe[Math.floor(Math.random() * this.recipeAmerican.length)]

                // remainingRecipe = remainingRecipe.filter((e) => {
                //     return e.idMeal !== this.targetTwo.idMeal
                // })

                // this.targetThree = remainingRecipe[Math.floor(Math.random() * this.recipeAmerican.length)]
                // remainingRecipe = remainingRecipe.filter((e) => {
                //     return e.idMeal !== this.targetThree.idMeal
                // })

                // this.targetFour = remainingRecipe[Math.floor(Math.random() * this.recipeAmerican.length)]
                // remainingRecipe = remainingRecipe.filter((e) => {
                //     return e.idMeal !== this.targetFour.idMeal
                // })

                // addProperty(obj) {
                //     obj.colorStatus = false;
                // }

                

                // this.targetOne.colorStatus = false;
                // this.targetTwo.colorStatus = false;
                // this.targetThree.colorStatus = false;
                // this.targetOne.colorStatus = false;
                

                this.rouletteRecipe.push(this.recipeAmerican[Math.floor(Math.random() * this.recipeAmerican.length)]);

                // console.log(this.rouletteRecipe)

                let remainingRecipe = this.recipeAmerican.filter((e) => {
                    return e.idMeal !== this.rouletteRecipe[0].idMeal
                })

                // console.log(remainingRecipe)

                this.rouletteRecipe.push(remainingRecipe[Math.floor(Math.random() * this.recipeAmerican.length)])

                remainingRecipe = remainingRecipe.filter((e) => {
                    return e.idMeal !== this.rouletteRecipe[1].idMeal
                })

                this.rouletteRecipe.push(remainingRecipe[Math.floor(Math.random() * this.recipeAmerican.length)])
                remainingRecipe = remainingRecipe.filter((e) => {
                    return e.idMeal !== this.rouletteRecipe[2].idMeal
                })

                this.rouletteRecipe.push(remainingRecipe[Math.floor(Math.random() * this.recipeAmerican.length)])
                remainingRecipe = remainingRecipe.filter((e) => {
                    return e.idMeal !== this.rouletteRecipe[3].idMeal
                })

                this.rouletteRecipe.forEach((e) => {
                    e.colorStatus = false;
                })


            } else if (this.country === 'japanese') {

            } else if (this.country === 'french') {

            }
        },

        // ルーレットとめる
        stop() {
            this.status = "stop"
            clearInterval(this.intervalId);
            // rouletteRecipe.forEach((e) => {
            //     res = e.filter(((content) => {
            //         return content.
            //     }))
            // })
        }



    }
}
</script>

<template>
<div id="page">
    <header>
        <div class="header_container is-align-items-center">
            <div class="logo">
                <img src="~/assets/image/logo.png" alt="ロゴ">
            </div>
            <div class="field search_field">
                <input class="input" type="text" placeholder="レシピを検索できます。">
                <button class="button search_btn">検索する</button>
            </div>
            <div class="other_btns">
                <button class="button other_btn">なににする？</button>
                <button class="button other_btn">なににする？</button>
            </div>        
        </div>
    </header>
     <main>
        <div class="main_wrap">
            <article class="box media">
                <div class="click_container">
                    <div class="select is-warning">
                        <select v-model="country">
                            <option value="not">選択してください</option>
                            <option value="american">アメリカ</option>
                            <option value="japanese">日本</option>
                            <option value="french">フランス</option>
                        </select>
                    </div>                    

                    <button class="button is-warning is-rounded is-medium is-responsive inline_btn" v-if="status !== 'start'" @click="set()">セット</button>
                    <button class="button is-warning is-rounded is-medium is-responsive" v-if="status !== 'start'" @click="start()">スタート</button>
                    <button class="button is-warning is-rounded is-medium is-responsive" v-else @click="stop()">ストップ</button>
                    
                </div>
                
                <div class="roulette_cover roulette_on">
                
                    <div class="target" v-if="displayRoulette" :class="{color_blue : rouletteRecipe[0].colorStatus}">{{ rouletteRecipe[0].strMeal }}</div>
                    <div class="target" v-if="displayRoulette" :class="{color_red : rouletteRecipe[1].colorStatus}">{{ rouletteRecipe[1].strMeal }}</div>
                    <div class="target" v-if="displayRoulette" :class="{color_green : rouletteRecipe[2].colorStatus}">{{ rouletteRecipe[2].strMeal }}</div>
                    <div class="target" v-if="displayRoulette" :class="{color_yellow : rouletteRecipe[3].colorStatus}">{{ rouletteRecipe[3].strMeal }}</div>
                </div>

              


            </article>
            <aside class="box side">
            </aside>

        </div>
    </main>
</div>
        
</template>

<style lang="scss">
* {
    margin:0;
    padding:0;
}

.page {
    max-width: 1425px;
}

header {
    .header_container {
        background: url(~/assets/image/foodiesfeed.com_traditional-korean-meals.jpg) no-repeat center / cover ;
        height: 150px;
        background-position: 0 70%;
        display: flex;
        background-color: rgba(#FF8A02, 0.3);
        background-blend-mode: lighten;
    }

    .field:not(:last-child) {
        margin-bottom: 0px
    }

    .search_field {
        margin-left: 180px;
        width: 500px;
        display: flex;

        .search_btn {
            margin-left: 40px;
        }
    }

    .other_btns {
        display: flex;

        .other_btn {
            margin-left: 40px;
            display: block;
        }
    }


    .logo {
        width:fit-content;
        margin-left: 40px;
    }
}

main {
    width: 100%;
    background-color: #FCF4EC;


    .main_wrap {
        margin-right: auto;
        margin-left: auto;
        max-width: 925px;
        min-height:100vh;
        display: flex;

        .media {
            margin-top: 20px;
            width: 620px;
            height: 590px;
            display: block;
        
        .click_container {
            display: flex;
            justify-content: space-between;  
            margin-bottom: 20px;


            .btn_container {
                display: flex;
            }
        }

            .roulette_cover {
                background-color: #FF8A02;
                width: 470px;
                height: 470px;
                border-radius: 50%;
                margin: auto;
                position: relative;

                .target {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 235px;
                    height: 235px;

                    &:first-child {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        border-radius: 0 100% 0 0;
                        // background-color: blue;
                        border: solid 0.5em blue;
                        background-color: #bbdbf3;

                        &:not(.color_blue) {
                            border: none;
                            background-color: #bbdbf3;
                        }
                    }

                    &:nth-child(2) {
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                        border-radius: 0 0 100% 0;
                        // background-color: red;
                        border: solid 0.5em red;
                        background-color: #e3acae;

                        &:not(.color_red) {
                            border: none;
                            background-color: #e3acae;
                        }
                    }

                    &:nth-child(3) {
                        position: absolute;
                        bottom: 0px;
                        left: 0px;
                        border-radius: 0 0 0 100%;
                        // background-color: green;
                        border: solid 0.5em green;
                        background-color: #a3d6ce;

                        &:not(.color_green) {
                            border: none;
                            background-color: #a3d6ce;
                        }
                    }

                    &:last-child {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        border-radius: 100% 0 0 0;
                        border: solid 0.5em yellow;
                        // background-color: yellow;
                        background-color: #ffedab;

                        &:not(.color_yellow) {
                            border: none;
                            background-color: #ffedab;
                        }
                    }

                }
            }

            .button {
                display: block;
                // margin: 5px auto;

            }



        }  

        .side {
            margin: 20px 0px auto 20px;
            width: 300px;
            height: 580px;
            }
 
    }
}


@media screen and (max-width: 1400px) {
  #page {
    width: 98%;
  }
  contain {
    width: 70%;
  }
  #sidebar {
    width: 30%;
  }
}
</style>
