<script setup>
const[rankingData, dataAmerican, dataJapanese, dataChinese, dataFrench, dataChicken, dataBeef, dataSeafood, dataVegetarian] = await Promise.all([
    useFetch('https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1079324519433678968'),

    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American'),
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese'),
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese'),
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=French'),

    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken'),
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'),
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'),
    useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian'),



]);

const recipeRanking      = rankingData.data.value.result
const recipeAmerican     = dataAmerican.data.value.meals;
const recipeJapanese     = dataJapanese.data.value.meals;
const recipeChinese      = dataChinese.data.value.meals;
const recipeFrench       = dataFrench.data.value.meals;

const recipeChicken      = dataChicken.data.value.meals;
const recipeBeef         = dataBeef.data.value.meals;
const recipeSeafood      = dataSeafood.data.value.meals;
const recipeVegetarian   = dataVegetarian.data.value.meals;

</script>

<script>
export default {
    data() {
        return {
            status: 'clear',
            rouletteRecipe: [],
            intervalId: 0,
            country: 'not',
            displayRoulette: false,
            todayMeal: null,
            displayTodayMeal: false,
            todayMealUrl: null,
            isActive: false,
            todayRecipe: {
                recipeTitle: null,
                recipeUrl: null,
                recipeId: null,
                img: null
            },
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

        // ルーレットセットする
        set() {
            this.displayRoulette = true;
            this.rouletteRecipe = []

            if (this.country === 'not') {
                alert('国名か素材名を選択してください。')

            } else if (this.country === 'american') {   
                this.SetRouletteRecipe(this.recipeAmerican);

            } else if (this.country === 'japanese') {
                this.SetRouletteRecipe(this.recipeJapanese);

            } else if (this.country === 'chinese') {
                this.SetRouletteRecipe(this.recipeChinese);

            } else if (this.country === 'french') {
                this.SetRouletteRecipe(this.recipeFrench);
            
            } else if (this.country === 'chicken') {
                this.SetRouletteRecipe(this.recipeChicken);
            
            } else if (this.country === 'beef') {
                this.SetRouletteRecipe(this.recipeBeef);
            
            } else if (this.country === 'seafood') {
                this.SetRouletteRecipe(this.recipeSeafood);
            
            } else if (this.country === 'vegetarian') {
                this.SetRouletteRecipe(this.recipeVegetarian);
            
            }


        },

        // ルーレットとめる
        stop() {
            this.status = "stop"
            this.displayTodayMeal = true;
            clearInterval(this.intervalId);

            this.rouletteRecipe.forEach((e) => {
                if (e.colorStatus) {
                    const shineTodayMeal = setInterval(() => {
                        e.colorStatus = !e.colorStatus
                    }, 200)

                    setTimeout(() => {
                        clearInterval(shineTodayMeal);
                        e.colorStatus = true;
                        this.isActive = true;
                        
                    }, 1500)

                    this.todayRecipe.recipeTitle = e.strMeal
                    this.todayRecipe.recipeUrl   = 'https://www.themealdb.com/meal/' + e.idMeal
                    this.todayRecipe.recipeId    = e.idMeal
                    this.todayRecipe.img         = e.strMealThumb
                } 
            })
        },

        closeResModal() {
            this.isActive = false;
        },



        // ルーレットセットするときに使う関数
        SetRouletteRecipe(country) {
            // インデックスにランダムに数字を入れて、ランダムにレシピをルーレットに入れる。
            // 重複がでないように、同じIDのものは配列に入れないようにする。
            this.rouletteRecipe.push(country[Math.floor(Math.random() * country.length)]);
            let remainingRecipe = country.filter((e) => {
                return e.idMeal !== this.rouletteRecipe[0].idMeal
            })

            this.SetRouletteRecipeHelper(remainingRecipe);

            this.rouletteRecipe.forEach((e) => {
                e.colorStatus = false;
            })

        },

        SetRouletteRecipeHelper(helperVariable) {
            this.rouletteRecipe.push(helperVariable[Math.floor(Math.random() * helperVariable.length)])
            helperVariable = helperVariable.filter((e) => {
                return e.idMeal !== this.rouletteRecipe[1].idMeal
            })

            this.rouletteRecipe.push(helperVariable[Math.floor(Math.random() * helperVariable.length)])
            helperVariable = helperVariable.filter((e) => {
                return e.idMeal !== this.rouletteRecipe[2].idMeal
            })

            this.rouletteRecipe.push(helperVariable[Math.floor(Math.random() * helperVariable.length)])
            helperVariable = helperVariable.filter((e) => {
                return e.idMeal !== this.rouletteRecipe[3].idMeal
            })
        },



    }
}
</script>

<template>
<div id="page">
    <header>
        <div class="header_container">
            <div class="header_display is-align-items-center">
                <div class="logo">
                    <img src="~/assets/image/logo.png" alt="ロゴ">
                </div>
                <div class="other_btns">
                    <button class="button  first_btn is-rounded other_btn">朝食</button>
                    <button class="button is-rounded other_btn">サイド</button>
                    <button class="button is-rounded other_btn">デザート</button>
                    <button class="button is-rounded other_btn">パスタ</button>
                    <button class="button is-rounded other_btn">豚肉</button>
                </div>        
            </div>
        </div>
    </header>
     <main>
        <div class="main_wrap">
            <article class="box media">
                <h2 class="min_title">ルーレットで決める</h2>
                <div class="click_container">
                    <div class="select is-warning">
                        <select v-model="country">
                            <option value="not">選択してください</option>
                            <option value="not">--- 国 ---</option>
                            <option value="american">アメリカ</option>
                            <option value="japanese">日本</option>
                            <option value="chinese">中国</option>
                            <option value="french">フランス</option>
                            <option value="not">--- 素材 ---</option>
                            <option value="chicken">鶏肉</option>
                            <option value="beef">牛肉</option>
                            <option value="seafood">魚介</option>
                            <option value="vegetarian">野菜</option>
                        </select>
                    </div>                    

                    <button class="button is-warning is-rounded is-medium is-responsive inline_btn" v-if="status !== 'start'" @click="set()">セット</button>
                    <button class="button is-warning is-rounded is-medium is-responsive" v-if="status !== 'start'" @click="start()">スタート</button>
                    <button class="button is-warning is-rounded is-medium is-responsive" v-else @click="stop()">ストップ</button>
                    
                </div>
                
                <div class="roulette_cover roulette_on" v-if="displayRoulette">
                    <div class="target" :class="{color_blue : rouletteRecipe[0].colorStatus}">{{ rouletteRecipe[0].strMeal }}</div>
                    <div class="target" :class="{color_red : rouletteRecipe[1].colorStatus}">{{ rouletteRecipe[1].strMeal }}</div>
                    <div class="target" :class="{color_green : rouletteRecipe[2].colorStatus}">{{ rouletteRecipe[2].strMeal }}</div>
                    <div class="target" :class="{color_yellow : rouletteRecipe[3].colorStatus}">{{ rouletteRecipe[3].strMeal }}</div>
                </div>

                <div class="roulette_cover roulette_on" v-else="displayRoulette">
                    <div class="target"></div>
                    <div class="target"></div>
                    <div class="target"></div>
                    <div class="target"></div>
                </div>
  
            </article>

            
            <aside class="box side">
                <h2>週間楽天レシピランキング</h2>
                <div class="box side_box" v-for="item in recipeRanking" :key="recipeRanking">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image image_box is-64x64">
                                <img :src="item.foodImageUrl" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                {{ item.rank }}位<br>
                                <a target="_blank" :href="item.recipeUrl">{{ item.recipeTitle }}</a>
                                <br>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </aside>
            <Modal 
                :isActive="isActive" 
                :todayRecipeTitle="todayRecipe.recipeTitle"
                :todayRecipeUrl="todayRecipe.recipeUrl"
                :todayRecipeImg="todayRecipe.img"
                @closeResModal="closeResModal" 
            ></Modal>
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

        .header_display {
            display: flex;
            justify-content: space-around;
            margin: 0 auto;
            max-width: 925px;

            .other_btns {
                display: flex;

                .other_btn {
                    margin-left: 40px;
                    display: block;
                    border-color: #ffdc7d;
                    box-shadow: 4px 4px 16px #808080;
                    width: 100px;
                    max-width: 200px;
                }
            }


            .logo {
                width:fit-content;
            }
        }
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

        .min_title {
            text-align: center;
            margin-bottom: 15px;
        }
        
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
                width: 450px;
                height: 450px;
                border-radius: 50%;
                margin: auto;
                position: relative;



                .target {
                    display: flex;
                    align-items: center;
                    width: 225px;
                    height: 225px;
                    text-align: left;

                    &:first-child {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        border-radius: 0 100% 0 0;
                        padding-left: 10px;
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
                        padding-left: 15px;
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
            }



        }  

        .box {
            padding: 20px;
        }

        .side {
            margin: 20px 0px auto 10px;
            width: 300px;
            height: 590px;

            h2 {
                text-align: center;
            }

            .side_box {
                height: 115px;
                padding: 0px;
                margin: 10px auto;


                .media {
                    display: flex;
                    width:fit-content;
                    margin-top: 15px;


                    .media-left {
                        padding: auto 0;
                        width: 60px;
                        height: 125px;
                        position:relative;

                        .image_box {
                            display: flex;
                            position:absolute;
                            top: 20%;
                            padding-left: 5px;
                        }
                    }
                }

                p {
                    font-size: 15px;
                    display: block;
                    padding: 20px 5px;
                }

                img {
                    display: block;
                }
            }
        }
    }

    .modal {
        animation-name: fade;
        animation-duration: 0.5s;

        @keyframes fade {
            0%{
                opacity: 0;
            }
            100%{
                opacity: 1;
            }
        }

        .modal-card {
            text-align: center;


        .modal_img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            margin: 0 auto;
            display: block;
        }

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
