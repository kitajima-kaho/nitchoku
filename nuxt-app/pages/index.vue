<script>
export default {
    data() {
        return {
            status: 'clear',
            attentionBlue: false,
            attentionRed: false,
            attentionGreen: false,
            attentionYellow: false,

        }
    },

    methods: {
        start() {
            this.status = 'start';
            // this.attentionRed = true;

            setTimeout(() => {
                this.attentionBlue = true}
                ,100
            ).then(setTimeout(() => {
                this.attentionRed = true}
                ,200
            ))

            // setTimeoutAsync(0) 
            // .then(() => {
            //     this.attentionBlue = true;
            //     return setTimeoutAsync(100);
            // })
            // .then(() => {
            //     this.attentionRed = true;
            //     return setTimeoutAsync(100);
            // })
            // .then(() => {
            //     this.attentionGreen = true;
            //     return setTimeoutAsync(100);
            // })
            // .then(() => {
            //     this.attentionYellow = true;
            // })
        },

        

        stop() {
            this.status = "stop"
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

            <div class="roulette_cover">
                <div class="target" :class="{color_blue : attentionBlue}"></div>
                <div class="target" :class="{color_red : attentionRed}"></div>
                <div class="target" :class="{color_green : attentionGreen}"></div>
                <div class="target" :class="{color_yellow : attentionYellow}"></div>
            </div>


            <button class="button is-warning is-rounded is-large is-responsive" v-if="status !== 'start'" @click="start()">スタート</button>
            <button class="button is-warning is-rounded is-large is-responsive" v-else @click="stop()">ストップ</button>

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
        // background-color: blue;

        .media {
        margin-top: 20px;
        width: 620px;
        height: 580px;
        display: block;

            .roulette_cover {
                background-color: #FF8A02;
                width: 470px;
                height: 470px;
                border-radius: 50%;
                margin: 5px auto;
                position: relative;

                .target {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 235px;
                    height: 235px;


                    .color_red {
                    }

                    &:first-child {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        border-radius: 0 100% 0 0;
                        background-color: blue;

                        &:not(.color_blue) {
                            background-color: #bbdbf3;
                        }
                    }

                    &:nth-child(2) {
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                        border-radius: 0 0 100% 0;
                        background-color: red;

                        &:not(.color_red) {
                            background-color: #e3acae;
                        }
                    }



                  

                    &:nth-child(3) {
                        position: absolute;
                        bottom: 0px;
                        left: 0px;
                        border-radius: 0 0 0 100%;
                        background-color: green;

                        &:not(.color_green) {
                            background-color: #a3d6ce;
                        }
                    }

                    &:last-child {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        background-color: yellow;
                        border-radius: 100% 0 0 0;

                        &:not(.color_yellow) {
                            background-color: #ffedab;

                        }
                    }

                }
            }

            .button {
                display: block;
                margin: 10px auto;

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
