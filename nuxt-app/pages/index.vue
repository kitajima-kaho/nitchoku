<script>
import users from '~/assets/user.json'
import themes from '~/assets/theme.json'
import allUsers from '~/assets/allusers.json'
import hosyumen from '~/assets/hosyumen.json'

export default {

    data() {
        return {
            show: '1',
            users: users,
            allUsers: allUsers,
            themes: themes,
            hosyumen: hosyumen,
            selectedUsers: [],
            selectedUsersIds: [],
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
                name: null,
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
            isLong: false,

        }
    },

    methods: {

        // ルーレットを回す。
        start() {

            // セットする前にスタートボタンが押された時
            if (this.clickNone) {
                alert('メンバーかテーマを選択してください。\n選択している場合は、「セット」ボタンを押してから、スタートを押してください。')

            } else {
                this.status = 'start';
                let attentionIndex = 0;

                // ルーレットが回っている間は「セット」ボタンを押せないようにする。
                this.transparency = true;

                // ルーレットの途中でスタートボタンが押されたら、初めから回し始める。
                // colorStatusがtrueの場合は、枠が色づけされ、回っているように見せる。
                this.rouletteRecipe.forEach(e => {
                    e.colorStatus = false
                })

                // ルーレットを回しているように見せる枠の色をtrue/falseで、色づけするしないを判断している。
                // 4つあるマスのうち一個ずつtrueを入れる。その前のマスをfalseにして、色付けを止めるようにする。
                this.intervalId = setInterval(() => {

                    // ますは4つのため、また0スタートのため、3以上になったら、0に戻す。（このコメントは不要か？）
                    if (attentionIndex > 3) {
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

                }, 50)

                // 2秒から4.1秒のランダムな時間をミリ秒で計算
                const randomDelay = Math.random() * (4100 - 1000) + 1000;

                console.log(randomDelay)

                // 計算した遅延時間後にstop関数を呼び出す
                setTimeout(() => {
                    this.stop();
                }, randomDelay);


            }

        },

        // ルーレットセットする
        set() {

            // ルーレットが一度回って止めた後、すぐにルーレットを回さないようにするもの。
            // この時は、何回も押しても良いのでfalse
            this.SecondClickNone = false;
            this.rouletteRecipe = new Array();

            if (this.recipeTarget === 'not' && this.selectedUsersIds.length <= 3) {
                alert('メンバーかテーマを選択してください。')
                // ここではまだルーレットを出さない。（タイトルと写真を表示するもの）
                this.displayRoulette = false;
                // スタートボタンを押してもアラートが出る
                this.clickNone = true;
                return;

            } else if (this.recipeTarget === 'american') {
                this.selectedUsersIds = []

                this.isLong = false;
                // ITメンバー
                this.SetRouletteRecipe(this.users);

            } else if (this.recipeTarget === 'japanese') {
                this.selectedUsersIds = []

                this.isLong = true;
                this.SetRouletteRecipe(this.themes);

            } else if (this.recipeTarget === 'chinese') {
                this.selectedUsersIds = []

                this.SetRouletteRecipe(this.allUsers);
                this.isLong = false;

            } else if (this.recipeTarget === 'french') {

                this.SetRouletteRecipe(this.selectedUsers);
                this.isLong = false;


            } else if (this.recipeTarget === 'chicken') {
                this.SetRouletteRecipe(this.hosyumen);

                // } else if (this.recipeTarget === 'beef') {
                //     this.SetRouletteRecipe(this.recipeBeef);

                // } else if (this.recipeTarget === 'seafood') {
                //     this.SetRouletteRecipe(this.recipeSeafood);

                // } else if (this.recipeTarget === 'vegetarian') {
                //     this.SetRouletteRecipe(this.recipeVegetarian);

            }
            // タイトルと写真が入ったルーレットが表示される。
            this.displayRoulette = true;

            // スタートボタンを押せるようにする。
            this.clickNone = false;

            // 翻訳する。🌟
            // this.translateAPI(this.rouletteRecipe)
        },

        // ルーレットとめる
        stop() {
            // 「ストップ」ボタンから「スタート」ボタンになる
            this.status = "stop"

            // モーダルを閉じるまでは、「スタート」ボタンや「セット」ボタンを押せないようにする
            this.SecondClickNone = true;
            this.transparency = false;

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
                    this.todayRecipe.name = e.name
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
                return e.id !== this.rouletteRecipe[0].id
            })

            // push処理をされるは配列が、2つ目のターゲットからが変わるため、処理は一緒だが、違う関数になる。
            this.SetRouletteRecipeHelper(remainingRecipe);

        },

        // ルーレットセットするときに使う関数
        // (push処理をされるは配列が、2つ目のターゲットからが変わるため、処理は一緒だが、違う関数になる。)
        SetRouletteRecipeHelper(helperVariable) {
            this.rouletteRecipe.push(helperVariable[Math.floor(Math.random() * helperVariable.length)])
            helperVariable = helperVariable.filter((e) => {
                return e.id !== this.rouletteRecipe[1].id
            })

            this.rouletteRecipe.push(helperVariable[Math.floor(Math.random() * helperVariable.length)])
            helperVariable = helperVariable.filter((e) => {
                return e.id !== this.rouletteRecipe[2].id
            })

            this.rouletteRecipe.push(helperVariable[Math.floor(Math.random() * helperVariable.length)])
            helperVariable = helperVariable.filter((e) => {
                return e.id !== this.rouletteRecipe[3].id
            })
        },

        getSelectedUsers() {

            if (this.selectedUsersIds <= 3) {
                alert('3人以上メンバーを選んでください！')
                return
            }

            // チェックボックスで選んだユーザーからランダムでルーレットに表示させるための準び。
            this.selectedUsers = this.allUsers.filter(user => this.selectedUsersIds.includes(user.id));

            // セレクトボックスを選ばなくても、セットできるようにする。
            this.recipeTarget = 'french';
            this.set();
        },

        // ルーレットタブの切り替え
        select(num) {
            this.show = num;
            this.recipeTarget = 'not';
        },

        // 全選択
        selectAll() {
            this.selectedUsersIds = this.allUsers.map(user => user.id);
        },

        reset() {
            this.selectedUsersIds = []
        }

    }
}
</script>

<template>
    <div class="page_wrap">
        <div class="header">
            <div>
                <p class="first">前菜になる話</p>
                <p>前菜になれば、何をしゃべってもＯＫ。オチも必要なし！</p>
            </div>
        </div>
        <div id="page">
            <div class="main_wrap">
                <div class="btn_box">
                    <button class="button btn_right is-warning is-rounded is-medium is-responsive"
                        :class="{ click_none: clickNone, second_click_none: SecondClickNone }"
                        @click="$router.push('filter')">メンバーを分ける</button>
                </div>
                <article class="box media roulette_box">
                    <h2 class="main_title">だれがなに話す〜？</h2>
                    <div class="content">
                        <div class="tabgroup">
                            <ul class="tabnav">
                                <li @click="select('1')" v-bind:class="{ 'active': show == '1' }">
                                    メンバールーレット
                                </li>
                                <li @click="select('2')" v-bind:class="{ 'active': show == '2' }">
                                    色々ルーレット
                                </li>
                            </ul>
                            <div class="tabcontent">
                                <div v-if="show == '1'" class="click_container">

                                    <div class="btn_container">
                                        <button class="button btn_left is-warning is-medium  is-responsive inline_btn"
                                            @click="selectAll">全選択</button>
                                        <button class="button btn_right is-warning is-medium is-responsive inline_btn"
                                            @click="reset">リセット</button>
                                    </div>

                                    <div class="member_container">
                                        <div class="member">
                                            <div v-for="user in allUsers" :key="user.id">
                                                <input type="checkbox" :value="user.id" :id="user.id"
                                                    v-model="selectedUsersIds">
                                                <label :for="user.id">{{ user.name }}</label>
                                            </div>
                                        </div>



                                        <div class="btn_container">
                                            <button
                                                class="button btn_left is-warning is-rounded is-medium is-responsive inline_btn"
                                                :class="{ transparency: transparency }"
                                                @click="getSelectedUsers()">セット</button>
                                            <button class="button btn_right is-warning is-rounded is-medium is-responsive"
                                                v-if="status !== 'start'"
                                                :class="{ click_none: clickNone, second_click_none: SecondClickNone }"
                                                @click="start()">スタート</button>
                                            <button class="button btn_right is-warning is-rounded is-medium is-responsive"
                                                v-else @click="stop()">ストップ</button>
                                        </div>

                                    </div>

                                </div>
                                <div v-else-if="show == '2'" class="click_container2">
                                    <div class="select_wrap">
                                        <div class="select is-warning">
                                            <select v-model="recipeTarget">
                                                <option value="not">選択してください</option>
                                                <!-- <option value="american">MEMBER</option> -->
                                                <!-- <option value="chinese">ALL MEMBER</option> -->
                                                <option value="chicken">保守メン</option>
                                                <option value="japanese">話すテーマ決めて欲しいの？</option>
                                                <option value="american">ITメンバー</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="btn_container">
                                        <button
                                            class="button btn_left is-warning is-rounded is-medium is-responsive inline_btn"
                                            :class="{ transparency: transparency }" @click="set()">セット</button>
                                        <button class="button btn_right is-warning is-rounded is-medium is-responsive"
                                            v-if="status !== 'start'"
                                            :class="{ click_none: clickNone, second_click_none: SecondClickNone }"
                                            @click="start()">スタート</button>
                                        <button class="button btn_right is-warning is-rounded is-medium is-responsive"
                                            v-else @click="stop()">ストップ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="roulette_cover roulette_on" v-if="displayRoulette">
                            <div class="target" :class="{ color_blue: rouletteRecipe[0].colorStatus }">
                                <span :class="{ long_format: isLong }">{{ rouletteRecipe[0].name }}</span>
                            </div>
                            <div class="target" :class="{ color_red: rouletteRecipe[1].colorStatus }">
                                <span :class="{ long_format: isLong }">{{ rouletteRecipe[1].name }}</span>
                            </div>
                            <div class="target" :class="{ color_green: rouletteRecipe[2].colorStatus }">
                                <span :class="{ long_format: isLong }">{{ rouletteRecipe[2].name }}</span>
                            </div>
                            <div class="target" :class="{ color_yellow: rouletteRecipe[3].colorStatus }">
                                <span :class="{ long_format: isLong }">{{ rouletteRecipe[3].name }}</span>
                            </div>
                        </div>

                        <div class="roulette_cover roulette_on" v-else>
                            <div class="target" style="background: #bbdbf3"></div>
                            <div class="target" style="background: #e3acae"></div>
                            <div class="target" style="background: #a3d6ce"></div>
                            <div class="target" style="background: #ffedab"></div>
                        </div>
                    </div>

                </article>
            </div>
            <Modal :isActive="isActive" :name="todayRecipe.name" :todayRecipeUrl="todayRecipe.recipeUrl"
                :todayRecipeImg="todayRecipe.img" @closeResModal="closeResModal" @clickOk="clickOk"></Modal>
        </div>
        <div class="no_responsive">
            <p>Coming soooooon</p>
            このサイズには対応していないのです。
            残念ですよね。
        </div>
    </div>
</template>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 'Sawarabi Gothic', sans-serif;
    color: #554200
}

html {
    overflow-y: auto;
    background-color: #FCF4EC;

}

.page_wrap {
    height: 100vh;
    background-color: #FCF4EC;
    // overflow-y: auto;
    // overflow-x: hidden;


    .header {
        background: url(~/assets/image/tsumami.png) center / cover;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;


        div {
            background-color: rgba(0, 0, 0, .5);
            border: 4px double #101bfa;
            border-radius: 50px;
            padding: 20px;

            p {
                font-size: 20px;
                color: #1d9bfc;
                text-align: center;
                font-weight: 600;

                &.first {
                    color: #fdb75b;
                    border-bottom: 4px double #ff6bff;
                    width: 120px;
                    margin: auto;
                }
            }
        }


    }

    #page {
        position: relative;
        // height: 80%;
        box-sizing: border-box;
        background-color: #FCF4EC;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;

        .main_wrap {
            width: 100%;
            height: 100%;

            .roulette_box {
                // width: 80%;
                width: 1000px;
                padding: 20px;
                display: block;
                margin: 5px auto;

                .main_title {
                    padding: 0.5rem 0;
                    margin-bottom: 0.1rem;
                    border-bottom: 3px dotted hsl(44deg, 100%, 77%);
                    font-size: 24px;
                    text-align: center;
                    margin-bottom: 15px;
                }

                .content {
                    display: flex;
                    justify-content: space-between;

                    .tabnav {
                        margin: auto;
                        display: flex;
                        list-style-type: none;

                        li {
                            margin-top: 0;
                            cursor: pointer;
                            width: 50%;
                            background: #FCF4EC;
                            color: #554200;
                            padding: 10px;
                            text-decoration: none;
                            border-radius: 10px 10px 0 0;


                            &:first-child {
                                margin-right: 5px;
                            }


                            &.active {
                                background: #554200;
                                color: #fff;
                            }
                        }

                    }

                    .tabcontent {

                        border: 2px solid #554200;

                        .click_container2 {
                            width: 330px;
                            height: 514px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .select_wrap {
                                margin-top: 20px;
                            }

                            .button {
                                width: 150px;
                                margin-top: 20px;
                            }

                            .btn_right {
                                margin-left: 10px;
                            }
                        }

                        .click_container {
                            margin-bottom: 15px;
                            width: 330px;

                            .transparency {
                                opacity: 0;
                                pointer-events: none;
                            }

                            .btn_container {
                                display: flex;
                                justify-content: center;
                                margin-top: 15px;

                                .second_click_none {
                                    pointer-events: none;
                                }

                                .button {
                                    display: block;
                                    color: #554200;
                                    // font-family: 'Kaisei Decol', serif;
                                    font-weight: 500;
                                    width: 140px;
                                }

                                .btn_right {
                                    display: block;
                                    margin-left: 10px;
                                }
                            }

                            .member_container {
                                display: flex;
                                flex-direction: column;
                                align-items: center;



                                .member {
                                    height: 280px;
                                    overflow-y: scroll;
                                    margin: 20px;
                                    border: 1px solid #554200;
                                    border-radius: 5px;
                                    padding: 10px;
                                    width: 180px;
                                }

                                .button {
                                    width: 150px;
                                    display: block;

                                }
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
                            position: relative;

                            span {
                                position: absolute;
                                z-index: 1;
                            }

                            // }

                            &:first-child {
                                // ルーレットの的を円に当てている。
                                position: absolute;
                                top: 0px;
                                right: 0px;

                                // .color_blue がついている時。
                                // すなわちルーレットがチカってしている時。
                                border-radius: 0 100% 0 0;
                                border: solid 0.5em blue;
                                background-color: #bbdbf3;

                                span {
                                    opacity: 0;
                                }

                                // .color_blue がついていない時
                                // すなわち、ルーレットでチカってしていない時。
                                // 回っていない時もこれ。（セット時とセット前両方）
                                &:not(.color_blue) {
                                    border: none;
                                    // background: linear-gradient(rgba(187, 219, 243), rgb(52, 78, 98));

                                    span {
                                        bottom: 90px;
                                        left: 55px;
                                        right: 40px;
                                        font-size: 20px;
                                        // font-weight: bold;
                                        // text-shadow: 1px 1px 5px #4aa5eb;
                                        // color: white;
                                        opacity: 1;

                                        &.long_format {
                                            bottom: 90px;
                                            left: 20px;
                                            right: 50px;
                                            font-size: 16px;
                                        }
                                    }
                                }
                            }

                            &:nth-child(2) {
                                position: absolute;
                                bottom: 0px;
                                right: 0px;
                                border-radius: 0 0 100% 0;
                                border: solid 0.5em red;
                                background-color: #e3acae;

                                span {
                                    opacity: 0;
                                }

                                &:not(.color_red) {
                                    border: none;
                                    // background: linear-gradient(#732d30, #e3acae);

                                    span {
                                        font-size: 20px;
                                        opacity: 1;
                                        // color: white;
                                        // font-weight: bold;
                                        // text-shadow: 1px 1px 5px #e26266;
                                        top: 90px;
                                        right: 30px;
                                        left: 55px;

                                        &.long_format {
                                            top: 90px;
                                            right: 50px;
                                            left: 20px;
                                            font-size: 16px;
                                        }
                                    }
                                }
                            }

                            &:nth-child(3) {
                                position: absolute;
                                bottom: 0px;
                                left: 0px;
                                border-radius: 0 0 0 100%;
                                border: solid 0.5em green;
                                background-color: #a3d6ce;

                                span {
                                    opacity: 0;
                                }

                                &:not(.color_green) {
                                    border: none;
                                    // background: linear-gradient(#2f6b62, #a3d6ce);

                                    span {
                                        font-size: 20px;
                                        opacity: 1;
                                        // color: white;
                                        // font-weight: bold;
                                        // text-shadow: 1px 1px 5px #39e1c8;
                                        top: 90px;
                                        right: 50px;
                                        margin-left: 40px;

                                        &.long_format {
                                            top: 90px;
                                            right: 20px;
                                            font-size: 16px;
                                        }

                                    }
                                }
                            }

                            &:last-child {
                                top: 0px;
                                left: 0px;
                                border-radius: 100% 0 0 0;
                                border: solid 0.5em yellow;
                                background-color: #ffedab;

                                span {
                                    opacity: 0;
                                }

                                &:not(.color_yellow) {
                                    border: none;
                                    background-color: #ffedab;
                                    // background: linear-gradient(#ffedab, #7e6c2c);

                                    span {
                                        font-size: 20px;
                                        opacity: 1;
                                        // color: white;
                                        // font-weight: bold;
                                        // text-shadow: 1px 1px 5px #f1b40c;
                                        top: 105px;
                                        right: 50px;
                                        margin-left: 30px;

                                        &.long_format {
                                            bottom: 10px;
                                            right: 20px;
                                            font-size: 16px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }



            }

            .btn_box {
                width: 1000px;
                margin: 20px auto;
            }
        }

    }

    .no_responsive {
        display: none;
    }
}






@media screen and (min-width:640px) and (max-width:997px) {
    // html {
    //     width: 100%;

    //     .header_container {
    //         width: 100%;
    //     }

    //     #page {
    //         .main_wrap {
    //             margin-left: 10px;
    //             margin-right: 10px;

    //             .media {
    //                 width: 100%;
    //                 margin-bottom: 20px;

    //                 .main_title {
    //                     font-size: 20px;
    //                     margin-bottom: 25px;
    //                 }

    //                 .select_wrap {
    //                     display: flex;
    //                     justify-content: center;

    //                     .select {
    //                         margin-left: 0;
    //                     }
    //                 }

    //                 .click_container {
    //                     .btn_container {
    //                         display: block;
    //                         margin-top: 25px;

    //                         .btn_left {
    //                             margin: 10px auto;
    //                         }

    //                         .btn_right {
    //                             margin: 25px auto;
    //                         }
    //                     }
    //                 }


    //                 .roulette_cover {
    //                     width: 300px;
    //                     height: 300px;
    //                     margin: 30px auto;

    //                     .target {
    //                         width: 150px;
    //                         height: 150px;
    //                         font-size: 15px;

    //                         span {
    //                             display: none;
    //                         }

    //                         &:first-child {
    //                             &:not(.color_blue) {
    //                                 background: none;
    //                                 background-color: #bbdbf3;

    //                                 img {
    //                                     filter: grayscale(80%);
    //                                     opacity: 0.7;
    //                                 }
    //                             }
    //                         }

    //                         &:nth-child(2) {
    //                             &:not(.color_red) {
    //                                 background: none;
    //                                 background-color: #e3acae;

    //                                 img {
    //                                     filter: grayscale(80%);
    //                                     opacity: 0.7;
    //                                 }
    //                             }
    //                         }

    //                         &:nth-child(3) {
    //                             &:not(.color_green) {
    //                                 background: none;
    //                                 background-color: #a3d6ce;

    //                                 img {
    //                                     filter: grayscale(80%);
    //                                     opacity: 0.7;
    //                                 }
    //                             }
    //                         }

    //                         &:last-child {
    //                             &:not(.color_yellow) {
    //                                 background: none;
    //                                 background-color: #ffedab;

    //                                 img {
    //                                     filter: grayscale(80%);
    //                                     opacity: 0.7;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }



    .page_wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;

        .header {
            display: none;
        }

        #page {
            display: none;
        }

        .no_responsive {
            display: block;

            p {
                text-align: center;
                font-size: 20px;
            }
        }
    }

}

@media screen and (max-width:639px) {
    // #page {

    //     .main_wrap {
    //         display: block;


    //         .roulette_box {
    //             box-sizing: border-box;
    //             width: 100%;
    //             margin: 5px;

    //             .main_title {
    //                 font-size: 20px;
    //             }

    //             .click_container {
    //                 display: block;

    //                 .select_wrap {
    //                     display: flex;
    //                     justify-content: center;

    //                     .select {
    //                         margin-left: 0;
    //                     }
    //                 }

    //                 .btn_container {
    //                     display: block;

    //                     .btn_left {
    //                         margin: 10px auto;
    //                     }

    //                     .btn_right {
    //                         margin: 10px auto;
    //                     }
    //                 }
    //             }

    //             .roulette_cover {
    //                 width: 270px;
    //                 height: 270px;
    //                 margin: 0px auto;

    //                 .target {
    //                     width: 135px;
    //                     height: 135px;
    //                     font-size: 15px;

    //                     span {
    //                         display: none;
    //                     }

    //                     &:first-child {
    //                         &:not(.color_blue) {
    //                             background: none;
    //                             background-color: #bbdbf3;

    //                             img {
    //                                 filter: grayscale(80%);
    //                                 opacity: 0.7;
    //                             }
    //                         }
    //                     }

    //                     &:nth-child(2) {
    //                         &:not(.color_red) {
    //                             background: none;
    //                             background-color: #e3acae;

    //                             img {
    //                                 filter: grayscale(80%);
    //                                 opacity: 0.9;
    //                             }
    //                         }
    //                     }

    //                     &:nth-child(3) {
    //                         &:not(.color_green) {
    //                             background: none;
    //                             background-color: #a3d6ce;

    //                             img {
    //                                 filter: grayscale(80%);
    //                                 opacity: 0.7;
    //                             }
    //                         }
    //                     }

    //                     &:last-child {
    //                         &:not(.color_yellow) {
    //                             background: none;
    //                             background-color: #ffedab;

    //                             img {
    //                                 filter: grayscale(80%);
    //                                 opacity: 0.7;
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    .page_wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;

        .header {
            display: none;
        }

        #page {
            display: none;
        }

        .no_responsive {
            display: block;

            p {
                text-align: center;
                font-size: 20px;
            }
        }
    }
}
</style>