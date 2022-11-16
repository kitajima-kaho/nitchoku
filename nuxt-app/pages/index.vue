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

            // TODO：否定系はよくないかも。true/false分からなくなる。
            // セットする前にスタートボタンが押されないようにするもの。
			clickNone: true,

            // ルーレットが一度回って止めた後、すぐにルーレットを回さないようにするもの。
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

            // 翻訳する。🌟
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
<div id="page">
    <Header></Header>
    <div class="main_wrap">
        <article class="box media roulette_box">
            <h2 class="main_title">なにたべる？ルーレットできめる？</h2>
            <div class="click_container">
                <div class="select_wrap">
                    <div class="select is-warning">
                        <select v-model="recipeTarget">
                            <option value="not">選択してください</option>
                            <option disabled>--- 国 ---</option>
                                <option value="american">アメリカ</option>
                                <option value="japanese">日本</option>
                                <option value="chinese">中国</option>
                                <option value="french">フランス</option>
                            <option disabled>--- 素材 ---</option>
                                <option value="chicken">鶏肉</option>
                                <option value="beef">牛肉</option>
                                <option value="seafood">魚介</option>
                                <option value="vegetarian">野菜</option>
                        </select>
                    </div>       
                </div>        
                
                <div class="btn_container">
                    <button class="button btn_left is-warning is-rounded is-medium is-responsive inline_btn"  :class="{transparency : transparency}" @click="set()">ルーレットにレシピをセットする</button>
                    <button class="button btn_right is-warning is-rounded is-medium is-responsive" v-if="status !== 'start'" :class="{click_none : clickNone, second_click_none : SecondClickNone}" @click="start()">スタート</button>
                    <button class="button btn_right is-warning is-rounded is-medium is-responsive" v-else @click="stop()">ストップ</button>
                </div>
            </div>
            
            <div class="roulette_cover roulette_on" v-if="displayRoulette">
                <div class="target" :class="{color_blue : rouletteRecipe[0].colorStatus}">
                    <figure class="image image_box">
                        <span>{{ rouletteRecipe[0].jpStrMeal }}</span>
                        <img :src="rouletteRecipe[0].strMealThumb" alt="Image">
                    </figure>
                </div>
                <div class="target" :class="{color_red : rouletteRecipe[1].colorStatus}">
                    <figure class="image image_box">
                        <span>{{ rouletteRecipe[1].jpStrMeal }}</span>
                        <img :src="rouletteRecipe[1].strMealThumb" alt="Image">
                    </figure>
                </div>	
                <div class="target" :class="{color_green : rouletteRecipe[2].colorStatus}">
                    <figure class="image image_box">
                        <span>{{ rouletteRecipe[2].jpStrMeal }}</span>          
                        <img :src="rouletteRecipe[2].strMealThumb" alt="Image">
                    </figure>
                </div>	
                <div class="target" :class="{color_yellow : rouletteRecipe[3].colorStatus}">
                    <figure class="image image_box">
                        <span>{{ rouletteRecipe[3].jpStrMeal }}</span>
                        <img :src="rouletteRecipe[3].strMealThumb" alt="Image">
                    </figure>
                </div>
            </div>

            <div class="roulette_cover roulette_on" v-else>
                <div class="target" style="background: #bbdbf3"></div>
                <div class="target" style="background: #e3acae"></div>
                <div class="target" style="background: #a3d6ce"></div>
                <div class="target" style="background: #ffedab"></div>
            </div>

        </article>

        <Side
            :recipeRankingList = "recipeRankingList" 
        ></Side>

    </div>
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
    font-family: 'Sawarabi Gothic', sans-serif;
    color: #554200
}

#page {
    position: relative;
    padding-bottom: 50px;
    min-height: 100vh;
    box-sizing: border-box;
    background-color: #FCF4EC;
    width: 100vw;

    .main_wrap {
        margin-right: auto;
        margin-left: auto;
        max-width: 925px;
        display: flex;

        .roulette_box {
            width: fit-content;
            padding: 20px;
            display: block;
            margin-top: 20px;
            margin-bottom: 20px;
            
            .main_title {
                padding: 0.5rem 0;
                margin-bottom: 0.1rem;
                border-bottom: 3px dotted hsl(44deg, 100%, 77%);
                font-family: 'Kaisei Decol', serif;
                font-weight: 700;
                font-size: 24px;
                text-align: center;
			    margin-bottom: 15px;
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

                    .second_click_none {
                        pointer-events: none;
                    }

                    .button {
                        display: block;
                        color: #554200;
                        font-family: 'Kaisei Decol', serif;
                        font-weight: 500;
                    }

                    .btn_right {
                        display: block;
                        margin-left: 10px;
                    }
                }
            }

            // ルーレットここから　🌟いずれ消す

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
                    
                    .image {
                        // 親要素（targetに大きさを合わせる。）
                        display: block;
                        width: 100%;
                        height: 100%;

                        // imgと文字を重ねている。
                        // 写真の位置を円に合うように配置(中のspanは重なる) 
                        position: relative;

                        span {
                            // imgと文字を重ねている。
                            position: absolute;
                            z-index: 1;
                        }

                        img {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    } 

                    &:first-child {
                        // ルーレットの的を円に当てている。
                        position: absolute;
                        top: 0px;
                        right: 0px;

                        // .color_blue がついている時。
                        // すなわちルーレットがチカってしている時。
                        border-radius: 0 100% 0 0;
                        border: solid 0.3em blue;
                        background-color: #bbdbf3;

                        img {
                            top: 0px;
                            right: 0px;
                            border-radius: 0 100% 0 0;
                        }

                        span {
                            opacity:0;
                        }
 
                        // .color_blue がついていない時
                        // すなわち、ルーレットでチカってしていない時。
                        // 回っていない時もこれ。（セット時とセット前両方）
                        &:not(.color_blue) {
                            border: none;
                            // background-color: #bbdbf3;
                            background: linear-gradient(rgba(187,219,243), rgb(52, 78, 98));

                            img {
                                filter: grayscale(100%);
                                opacity: 0.5; 
                            }

                            span {
                                bottom: 10px;
                                left: 10px;
                                right: 10px;
                                font-size: 16px;
                                font-weight: bold;
                                text-shadow: 1px 1px 5px #4aa5eb;
                                color: white;
                                opacity:1;
                            }
                        }
                    }

                    &:nth-child(2) {
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                        border-radius: 0 0 100% 0;
                        border: solid 0.3em red;
                        background-color: #e3acae;

                        img {
                            bottom: 0px;
                            right: 0px;
                            border-radius: 0 0 100% 0;
                        }


                        span {
                            opacity:0;
                        }

                        &:not(.color_red) {
                            border: none;
                            // background-color: #e3acae;
                            background: linear-gradient(#732d30, #e3acae);

                            img {
                                filter: grayscale(100%);
                                opacity: 0.5; 
                            }

                            span {
                                opacity: 1;
                                color: white;
                                font-size: 16px;
                                font-weight: bold;
                                text-shadow: 1px 1px 5px #e26266;
                                top: 10px;
                                right: 10px;
                                left: 10px;
                            }
                        }
                    }

                    &:nth-child(3) {
                        position: absolute;
                        bottom: 0px;
                        left: 0px;
                        border-radius: 0 0 0 100%;
                        border: solid 0.3em green;
                        background-color: #a3d6ce;

                        img {
                            bottom: 0px;
                            left: 0px;
                            border-radius: 0 0 0 100%;
                        }

                        span {
                            opacity:0;
                        }

                        &:not(.color_green) {
                            border: none;
                            background: linear-gradient(#2f6b62, #a3d6ce);

                            img {
                                filter: grayscale(100%);
                                opacity: 0.5; 
                            }

                            span {
                                opacity: 1;
                                color: white;
                                font-size: 16px;
                                font-weight: bold;
                                text-shadow: 1px 1px 5px #39e1c8;
                                top: 10px;
                                right: 10px;
                                margin-left: 10px;
                            }
                        }
                    }

                    &:last-child {
                        top: 0px;
                        left: 0px;
                        border-radius: 100% 0 0 0;
                        border: solid 0.3em yellow;
                        background-color: #ffedab;

                        img {
                            top: 0px;
                            left: 0px;
                            border-radius: 100% 0 0 0;
                        }

                        span {
                            opacity:0;
                        }
    
                        &:not(.color_yellow) {
                            border: none;
                            background-color: #ffedab;
                            background: linear-gradient(#ffedab, #7e6c2c);

                            img {
                                filter: grayscale(100%);
                                opacity: 0.5; 
                            }

                            span {
                                opacity: 1;
                                color: white;
                                font-size: 16px;
                                font-weight: bold;
                                text-shadow: 1px 1px 5px #f1b40c;
                                bottom: 10px;
                                right: 10px;
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}



@media screen and (min-width:640px) and (max-width:1023px) {
    html {
        width: 100%;

        .header_container {
            width: 100%;
        }

        #page {
            .main_wrap {
            margin: 20px auto;

                .media {
                    width: 410px;
                    margin-bottom: 20px;

                    .main_title {
                    font-size: 20px;
                    }

                    .select_wrap {
                        display: flex;
                        justify-content: center;
                        .select {
                            margin-left: 0;
                        }
                    }

                    .click_container {
                        .btn_container {
                            display: block;

                            .btn_left{
                                margin: 10px auto;
                            }

                            .btn_right {
                                margin: 10px auto;
                            }
                        }
                    }


                    .roulette_cover {
                        width: 300px;
                        height: 300px;
                        margin: 70px auto;

                        .target {
                            width: 150px;
                            height: 150px;
                            font-size: 15px;

                            span {
                                display: none;
                            }

                            &:first-child {
                                &:not(.color_blue) {
                                    background-color: #bbdbf3;

                                    img {
                                        opacity: 0.7; 
                                    }                      
                                }   
                            }

                            &:nth-child(2) {
                                &:not(.color_red) {
                                    img {
                                        opacity: 0.7; 
                                    }                      
                                }   
                            }

                            &:nth-child(3) {
                                &:not(.color_green) {
                                    img {
                                        opacity: 0.7; 
                                    }                      
                                }
                            }
                            
                            &:last-child {
                                &:not(.color_yellow) {
                                    img {
                                        opacity: 0.7; 
                                    }                      
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and ( max-width:639px ) {

    #page {

        .main_wrap {
            display: block;


            .roulette_box {
                box-sizing: border-box;
                width: 97%;
                margin: 5px;

                .main_title {
                    font-size: 20px;
                }

                .click_container {
                    display: block;
                    .select_wrap {
                        display: flex;
                        justify-content: center;
                        .select {
                            margin-left: 0;
                        }
                    }

                    .btn_container {
                        display: block;

                        .btn_left{
                            margin: 10px auto;
                        }

                        .btn_right {
                            margin: 10px auto;
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

                        span {
                            display: none;
                        }

                        &:first-child {
                            &:not(.color_blue) {
                                img {
                                    filter: grayscale(80%);
                                }                      
                            }   
                        }

                        &:nth-child(2) {
                            &:not(.color_red) {
                                img {
                                    filter: grayscale(80%);
                                }                      
                            }   
                        }

                        &:nth-child(3) {
                            &:not(.color_green) {
                                img {
                                    filter: grayscale(80%);
                                }                      
                            }
                        }

                        &:last-child {
                            &:not(.color_yellow) {
                                img {
                                    filter: grayscale(80%);
                                }                      
                            }
                        }
                    }
                }
            }   
        }
    }
}
</style>