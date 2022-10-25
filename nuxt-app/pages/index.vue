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

const recipeRanking    = rankingData.data.value.result
const recipeAmerican   = dataAmerican.data.value.meals;
const recipeJapanese   = dataJapanese.data.value.meals;
const recipeChinese    = dataChinese.data.value.meals;
const recipeFrench     = dataFrench.data.value.meals;

const recipeChicken    = dataChicken.data.value.meals;
const recipeBeef       = dataBeef.data.value.meals;
const recipeSeafood    = dataSeafood.data.value.meals;
const recipeVegetarian = dataVegetarian.data.value.meals;

</script>

<script>
export default {
    data() {
        return {
            status: 'clear',
            rouletteRecipe: [],
            intervalId: 0,
            recipeTarget: 'not',
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
			clickNone: true,
			SecondclickNone: false,
        }
    },


    methods: {

        

        // ルーレットを回す。
        start() {

			if(this.clickNone) {
				alert('国名かカテゴリーをセットしてください')

			} else {
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

			}

		    
        },

        // ルーレットセットする
        set() {
            this.displayRoulette = true;
			this.SecondclickNone = false;

            this.rouletteRecipe  = []

            if (this.recipeTarget === 'not') {
                alert('国名か素材名を選択してください。')

            } else if (this.recipeTarget === 'american') { 
				this.clickNone = false;  
                this.SetRouletteRecipe(this.recipeAmerican);

            } else if (this.recipeTarget === 'japanese') {
				this.clickNone = false;  
                this.SetRouletteRecipe(this.recipeJapanese);

            } else if (this.recipeTarget === 'chinese') {
				this.clickNone = false;  
                this.SetRouletteRecipe(this.recipeChinese);

            } else if (this.recipeTarget === 'french') {
				this.clickNone = false;  
                this.SetRouletteRecipe(this.recipeFrench);
            
            } else if (this.recipeTarget === 'chicken') {
				this.clickNone = false;  
                this.SetRouletteRecipe(this.recipeChicken);
            
            } else if (this.recipeTarget === 'beef') {
				this.clickNone = false;  
                this.SetRouletteRecipe(this.recipeBeef);
            
            } else if (this.recipeTarget === 'seafood') {
				this.clickNone = false;  
                this.SetRouletteRecipe(this.recipeSeafood);
            
            } else if (this.recipeTarget === 'vegetarian') {
				this.clickNone = false;  
                this.SetRouletteRecipe(this.recipeVegetarian);
            
            }


        },

        // ルーレットとめる
        stop() {
            this.status           = "stop"
            this.displayTodayMeal = true;
			this.SecondclickNone  = true;

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

		clickOk() {
			this.SecondclickNone = false
		},



        // ルーレットセットするときに使う関数
        SetRouletteRecipe(recipeTarget) {
            // インデックスにランダムに数字を入れて、ランダムにレシピをルーレットに入れる。
            // 重複がでないように、同じIDのものは配列に入れないようにする。
            this.rouletteRecipe.push(recipeTarget[Math.floor(Math.random() * recipeTarget.length)]);
            let remainingRecipe = recipeTarget.filter((e) => {
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
<div id="page" >
    <Header></Header>
	<Main>
		<article class="box media roulette_box">
			<h2 class="main_title">ルーレットで決める</h2>
			<div class="click_container">
				<div class="select is-warning">
					<select v-model="recipeTarget">
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

                <div class="btn_container">
                    <button class="button is-warning is-rounded is-medium is-responsive inline_btn" v-show="status !== 'start'" @click="set()">ルーレットにレシピをセットする</button>
                    <button class="button btn_right is-warning is-rounded is-medium is-responsive" v-if="status !== 'start'" :class="{click_none : clickNone, second_click_none : SecondclickNone}" @click="start()">スタート</button>
                    <button class="button btn_right is-warning is-rounded is-medium is-responsive" v-else @click="stop()">ストップ</button>
                </div>
				
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

            <Side
                :recipeRankingList = "recipeRanking" 
            ></Side>
      
	</Main>
    <Footer></Footer>          
<Modal 
                :isActive="isActive" 
                :todayRecipeTitle="todayRecipe.recipeTitle"
                :todayRecipeUrl="todayRecipe.recipeUrl"
                :todayRecipeImg="todayRecipe.img"
                @closeResModal="closeResModal"
				@clickOk="clickOk"
            ></Modal>
    
</div>

</template>

<style lang="scss">
* {
    margin:0;
    padding:0;
}




.page {
    overflow: hidden;
    
}

.click_container {
    // display: flex;
    justify-content: space-between;  
    margin-bottom: 20px;


    .btn_container {
        display: flex;
        margin-top: 15px;


        .btn_right {
        display: block;
      
        }
    }
}

.second_click_none {
    pointer-events: none;
}

.roulette_box {
    width: fit-content;
    padding: 20px;
}


    
.roulette_cover {
    background-color: #FF8A02;
    width: 450px;
    height: 450px;
    border-radius: 50%;
    margin: 20px;
    position: relative;

    .target {
        display: flex;
        align-items: center;
        width: 225px;
        height: 225px;
        text-align: center;

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
    margin-left: 10px;
}



@media screen and ( max-width:479px ) {
    .roulette_box {
        box-sizing: border-box;
        width: 99%;
        height: 460px;

        .click_container {

            .btn_container {
                display: flex;

                .btn_right {
                    margin-left: 24px;

                }
            }
        }

    }

    .roulette_cover {
        width: 270px;
        height: 270px;
        margin: 0px auto;        

        .target {
            display: flex;
            width: 135px;
            height: 135px;
            font-size: 15px;
            
        }
    }

}

</style>