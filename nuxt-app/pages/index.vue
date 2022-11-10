<script>
import RakutenServise from '~/service/rakutenService'

export default {

    data() {
        return {
            recipeRankingList: [],
            status: 'clear',
            rouletteRecipe: [],
            intervalId: 0,
            recipeTarget: 'not',
            transparency: false,
            displayRoulette: false,
            todayMeal: null,
            todayMealUrl: null,
            isActive: false,
            todayRecipe: {
                recipeTitle: null,
                recipeUrl: null,
                recipeId: null,
                img: null,
                colorStatus: null
            },

            // セットする前にスタートボタンが押されないようにするもの。
			clickNone: true,

            // ルーレットが一度回って止めた後、すぐにルーレットを回さないようにするもの。
            // TODO：否定系はよくないかも。true/false分からなくなる。
			SecondClickNone: false,

            recipeRanking: null,
            recipeAmerican: null,
            recipeJapanese: null,
            recipeChinese: null,
            recipeFrench: null,
            recipeChicken: null,
            recipeBeef: null,
            recipeSeafood: null,
            recipeVegetarian: null,

        }
    },

    async created() {
        const[dataAmerican, dataJapanese, dataChinese, dataFrench, dataChicken, dataBeef, dataSeafood, dataVegetarian] = await Promise.all([
            
            useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American'),
            useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese'),
            useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese'),
            useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=French'),

            useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken'),
            useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'),
            useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'),
            useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian'),

        ]);

        this.recipeAmerican   = dataAmerican.data.value.meals
        this.recipeJapanese   = dataJapanese.data.value.meals
        this.recipeChinese    = dataChinese.data.value.meals
        this.recipeFrench     = dataFrench.data.value.meals

        this.recipeChicken    = dataChicken.data.value.meals
        this.recipeBeef       = dataBeef.data.value.meals
        this.recipeSeafood    = dataSeafood.data.value.meals
        this.recipeVegetarian = dataVegetarian.data.value.meals

        // 楽天レシピのデータ表示
        const rakutenResponse  = await RakutenServise.fetchRecipeRanking();
		this.recipeRankingList = rakutenResponse
    },

    methods: {

        // ルーレットを回す。
        start() {

            // セットする前にスタートボタンが押された時
			if(this.clickNone) {
				alert('国名かカテゴリーをセットしてください')

			} else {
			this.status = 'start';
            let attentionIndex = 0;

            // ルーレットが回っている間は「セット」ボタンを押せないようにする。
            this.transparency = true;
            
            //　ルーレットの途中でスタートボタンが押されたら、初めから回し始める。
            // colorStatusがtrueの場合は、枠が色づけされ、回っているように見せる。
            this.rouletteRecipe.forEach(e => {
                e.colorStatus = false
            })

            // ルーレットを回しているように見せる枠の色をtrue/falseで、色づけするしないを判断している。
            // 4つあるマスのうち一個ずつtrueを入れる。その前のマスをfalseにして、色付けを止めるようにする。
            this.intervalId = setInterval(() => {

                // ますは4つのため、また0スタートのため、3以上になったら、0に戻す。（このコメントは不要か？）
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
            // ルーレットが一度回って止めた後、すぐにルーレットを回さないようにするもの。
            // この時は、何回も押しても良いのでfalse
			this.SecondClickNone = false;
            this.rouletteRecipe  = new Array();

            if (this.recipeTarget === 'not') {
                alert('国名か素材名を選択してください。')
                // ここではまだルーレットを出さない。（タイトルと写真を表示するもの）
                this.displayRoulette = false;
                // スタートボタンを押してもアラートが出る
                this.clickNone = true;  
                return;

            } else if (this.recipeTarget === 'american') {
                this.SetRouletteRecipe(this.recipeAmerican);

            } else if (this.recipeTarget === 'japanese') {
                this.SetRouletteRecipe(this.recipeJapanese);

            } else if (this.recipeTarget === 'chinese') {  
                this.SetRouletteRecipe(this.recipeChinese);

            } else if (this.recipeTarget === 'french') {
                this.SetRouletteRecipe(this.recipeFrench);
            
            } else if (this.recipeTarget === 'chicken') { 
                this.SetRouletteRecipe(this.recipeChicken);
            
            } else if (this.recipeTarget === 'beef') { 
                this.SetRouletteRecipe(this.recipeBeef);
            
            } else if (this.recipeTarget === 'seafood') { 
                this.SetRouletteRecipe(this.recipeSeafood);
            
            } else if (this.recipeTarget === 'vegetarian') {
                this.SetRouletteRecipe(this.recipeVegetarian);
            
            }
            // タイトルと写真が入ったルーレットが表示される。
            this.displayRoulette = true; 

            // スタートボタンを押せるようにする。
			this.clickNone = false;  

            // 翻訳する。
            this.translateAPI(this.rouletteRecipe)
        },

        // ルーレットとめる
        stop() {
            // 「ストップ」ボタンから「スタート」ボタンになる
            this.status           = "stop"

            // モーダルを閉じるまでは、「スタート」ボタンや「セット」ボタンを押せないようにする
			this.SecondClickNone  = true;
            this.transparency     = false;

            // ルーレットを回さないようにする。
            clearInterval(this.intervalId);

            // colorStatusがtrueのものは本日のレシピで、モーダル表示までの時間チカチカさせる。
            this.rouletteRecipe.forEach((e) => {
                if (e.colorStatus) {
                    const shineTodayMeal = setInterval(() => {
                        e.colorStatus = !e.colorStatus
                    }, 150)

                    setTimeout(() => {
                        // 1.5秒後、チカチカをやめて、モーダルを表示。
                        clearInterval(shineTodayMeal);
                        e.colorStatus = true;
                        this.isActive = true;
                        
                    }, 1500)

                    // prosに渡す準備
                    this.todayRecipe.recipeTitle = e.jpStrMeal
                    this.todayRecipe.recipeUrl   = 'https://www.themealdb.com/meal/' + e.idMeal
                    this.todayRecipe.recipeId    = e.idMeal
                    this.todayRecipe.img         = e.strMealThumb
                }   
            })
        },

        // モーダル閉じる（emit）
        closeResModal() {
            this.isActive = false;
        },

        // モーダルを閉じたときに、スタートボタンを押せるようにする。（emit）
		clickOk() {
			this.SecondClickNone = false;
		},


        // ルーレットセットするときに使う関数
        SetRouletteRecipe(recipeTarget) {

            // インデックスにランダムに数字を入れて、ランダムにレシピをルーレットに入れる。
            // 重複がでないように、同じIDのものは配列に入れないようにする。
            this.rouletteRecipe.push(recipeTarget[Math.floor(Math.random() * recipeTarget.length)]);
            let remainingRecipe = recipeTarget.filter((e) => {
                return e.idMeal !== this.rouletteRecipe[0].idMeal
            })

            // push処理をされるは配列が、2つ目のターゲットからが変わるため、処理は一緒だが、違う関数になる。
            this.SetRouletteRecipeHelper(remainingRecipe);

            // ルーレットを回るように見せるための枠の色付けするstatusをプロパティに追加する。
            this.rouletteRecipe.forEach((e) => {
                e.colorStatus = false;
            })

        },

        // ルーレットセットするときに使う関数
        // (push処理をされるは配列が、2つ目のターゲットからが変わるため、処理は一緒だが、違う関数になる。)
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

        // 翻訳する
        async translateAPI(beforeTranslateData) {

            const API_KEY = '3c240d34-7d9e-4c33-fc65-2934e5a213a4:fx'
            const API_URL = 'https://api-free.deepl.com/v2/translate'

            // まとめてやっていたが、出てくるレシピ名によって不具合が生まれやすいため、一つずつfetchする。
            const response = await Promise.all([
                $fetch(API_URL + '?' + encodeURI('auth_key=' + API_KEY + '&text=' + beforeTranslateData[0].strMeal + '&source_lang=EN&target_lang=JA')),
                $fetch(API_URL + '?' + encodeURI('auth_key=' + API_KEY + '&text=' + beforeTranslateData[1].strMeal + '&source_lang=EN&target_lang=JA')),
                $fetch(API_URL + '?' + encodeURI('auth_key=' + API_KEY + '&text=' + beforeTranslateData[2].strMeal + '&source_lang=EN&target_lang=JA')),
                $fetch(API_URL + '?' + encodeURI('auth_key=' + API_KEY + '&text=' + beforeTranslateData[3].strMeal + '&source_lang=EN&target_lang=JA')),
            ])
            
            // 翻訳されたタイトルをstrMealのプロパティを作り、各々のレシピに入れていく。
            this.rouletteRecipe.forEach((recipe, index) => {
                recipe.jpStrMeal = response[index].translations[0].text
            })
        }
    }
}
</script>

<template>
<div id="page" >
    <Header></Header>
    <article class="box media roulette_box">
        <h2 class="main_title">ルーレットで決める</h2>
        <div class="click_container">
            <div class="select is-warning">
                <select v-model="recipeTarget">
                    <option value="not">選択してください</option>
                    <optgroup label="--- 国 ---">
                        <option value="american">アメリカ</option>
                        <option value="japanese">日本</option>
                        <option value="chinese">中国</option>
                        <option value="french">フランス</option>
                    </optgroup>
                    <optgroup label="--- 素材 ---">
                        <option value="chicken">鶏肉</option>
                        <option value="beef">牛肉</option>
                        <option value="seafood">魚介</option>
                        <option value="vegetarian">野菜</option>
                    </optgroup>
                </select>
            </div>               
            
            <div class="btn_container">
                <button class="button is-warning is-rounded is-medium is-responsive inline_btn"  :class="{transparency : transparency}" @click="set()">ルーレットにレシピをセットする</button>
                <button class="button btn_right is-warning is-rounded is-medium is-responsive" v-if="status !== 'start'" :class="{click_none : clickNone, second_click_none : SecondClickNone}" @click="start()">スタート</button>
                <button class="button btn_right is-warning is-rounded is-medium is-responsive" v-else @click="stop()">ストップ</button>
            </div>
        </div>
        
        <div class="roulette_cover roulette_on" v-if="displayRoulette">
            <div class="target" :class="{color_blue : rouletteRecipe[0].colorStatus}">
                <span>{{ rouletteRecipe[0].jpStrMeal }}</span>
                <figure class="image image_box is-64x64">
                    <img :src="rouletteRecipe[0].strMealThumb" alt="Image">
                </figure>
            </div>
            <div class="target" :class="{color_red : rouletteRecipe[1].colorStatus}">
                <span>{{ rouletteRecipe[1].jpStrMeal }}</span>
                <figure class="image image_box is-64x64">
                <img :src="rouletteRecipe[1].strMealThumb" alt="Image">
            </figure>
            </div>	
            <div class="target" :class="{color_green : rouletteRecipe[2].colorStatus}">
                <span>{{ rouletteRecipe[2].jpStrMeal }}</span>          
                <figure class="image image_box is-64x64">
                    <img :src="rouletteRecipe[2].strMealThumb" alt="Image">
                </figure>
            </div>	
            <div class="target" :class="{color_yellow : rouletteRecipe[3].colorStatus}">
                <span>{{ rouletteRecipe[3].jpStrMeal }}</span>
                <figure class="image image_box is-64x64">
                    <img :src="rouletteRecipe[3].strMealThumb" alt="Image">
                </figure>
            </div>
        </div>

        <div class="roulette_cover roulette_on" v-else>
            <div class="target"></div>
            <div class="target"></div>
            <div class="target"></div>
            <div class="target"></div>
        </div>

    </article>

    <Side
        :recipeRankingList = "recipeRankingList" 
    ></Side>

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

<style lang="scss" scoped>
* {
    margin:0;
    padding:0;
}

.page {
    overflow: hidden;
    
}

.click_container {
    justify-content: space-between;  
    margin-bottom: 20px;

    .transparency {
        opacity: 0;
        pointer-events: none;
    }


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
        width: 225px;
        height: 225px;

        span {
            box-sizing: content-box; 
            display: block;
            width: 140px;
        }

        &:first-child {
            position: absolute;
            top: 0px;
            right: 0px;
            border-radius: 0 100% 0 0;
            padding-top: 50px;

            border: solid 0.5em blue;
            background-color: #bbdbf3;

            span {
                display: block;
                padding-left: 20px;
            }

            .image {
                display: block;
                margin-top: 10px;
                margin-left: 40px;
            }   

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
            padding-top: 35px;
            border: solid 0.5em red;
            background-color: #e3acae;

            span {
                padding-left: 20px;
            }

            .image {
                display: block;
                margin-top: 5px;
                margin-left: 40px;
            }   

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
            padding-top: 35px;

            span {
                display: block;
                padding-left: 70px;
            }

            .image {
                display: block;
                margin-top: 5px;
                margin-left: 120px;
            }   



            &:not(.color_green) {
                border: none;
                background-color: #a3d6ce;
            }
        }

        &:last-child {
            padding-top: 50px;
            top: 0px;
            left: 0px;
            border-radius: 100% 0 0 0;
            border: solid 0.5em yellow;
            background-color: #ffedab;

            span {
                padding-left: 70px;
            }

            .image {
                display: block;
                margin-top: 10px;
                margin-left: 120px;
            }   

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

@media screen and (min-width:640px) and (max-width:1023px) {
    html {
        width: 100%;

        .header_container {
            width: 100%;
        }

        .main_wrap {
            margin: 20px auto;

            .media {
                width: 60%;

                .roulette_cover {
                    width: 300px;
                    height: 300px;
                    margin: 0 auto;

                    .target {
                        // display: flex;
                        width: 150px;
                        height: 150px;
                        font-size: 15px;
                        padding-top: 50px;
                        padding-left: 45px;

                        &:first-child {
                            padding-top: 60px;
                            margin-left: 20px;
                            padding-left: 0;
                        }

                        &:nth-child(2) {
                            padding-top: 20px;
                            padding-left: 0;
                        }

                        &:nth-child(3) {
                            padding-top: 20px;
                            
                        }
                        
                        &:last-child {
                            padding-top: 60px;

                        }

                        span {
                            display: none;
                        }
                        
                        .image {
                            margin-top: 0;
                            margin-left: 20px;
                        }
                    }
                }
            }
        }
    }
    .logo {
        min-width: 150px;
    }
}

@media screen and ( max-width:639px ) {
    .roulette_box {
        box-sizing: border-box;
        width: 97%;
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
            width: 135px;
            height: 135px;
            font-size: 15px;

            &:first-child {
                padding-left: 0;
                padding-top: 40px;

                span {
                    display: none;
                }

                .image {
                    margin-top: 10px;
                    margin-left: 20px;
                }
            }

            &:nth-child(2) {
                padding-top: 20px;

                .image {
                    margin: 0;
                    margin-left: 20px;

                }

                span {
                    display: none;
                }
            }

            &:nth-child(3) {
                padding-top: 20px;

                .image {
                    margin: 0;
                    margin-left: 50px;

                }
                
                span {
                    display: none;
                }
                
            }

            &:last-child {

                .image {
                    margin: 0;
                    margin-left: 50px;
                }
                
                span {
                    display: none;
                }
            }
        }
    }
}
</style>