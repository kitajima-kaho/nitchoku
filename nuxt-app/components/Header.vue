<script>

export default {
    methods: {
        otherPage(event) {
            const pageNamePath = "/" + event.target.dataset.cat;
            this.$router.push(pageNamePath)
        },
    },

    props: {
        onTranslation: Boolean,
    }
}
</script>

<template>
    <header>
        <div class="header_container">
            <div class="header_display is-align-items-center">
                <div class="logo">
                    <a href="/"><img src="~/assets/image/logo.png" alt="ロゴ"></a>
                </div>
                <div class="other_btns">
                    <button class="button first_btn is-rounded other_btn" @click="otherPage($event)" data-cat="breakfast">朝食</button>
                    <button class="button is-rounded other_btn" @click="otherPage($event)" data-cat="sideMenu">サイド</button>
                    <button class="button is-rounded other_btn" @click="otherPage($event)" data-cat="dessert">デザート</button>
                    <button class="button is-rounded other_btn" @click="otherPage($event)" data-cat="pasta">パスタ</button>
                    <button class="button is-rounded other_btn" @click="otherPage($event)" data-cat="pork">豚肉</button>
                </div>    
            </div>
        </div>
    </header>
</template>
<style lang="scss">
* {
    margin:0;
    padding:0;
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


@media screen and ( max-width:479px ) {
    header {
        .header_container {
        background: url(~/assets/image/foodiesfeed.com_traditional-korean-meals.jpg) no-repeat center / cover ;
        height: 155px;
        background-blend-mode: lighten;

        .header_display {
            display: block;


            .logo {
                margin-top: 5px;
                margin-bottom: 5px;
                width: 100%;
                
                img {
                    display: block;
                    margin: 0 auto;
                    height: 64px;
                    width: 100px
                }
            }

            .other_btns {
                flex-flow: wrap;
                justify-content: center;
                width: 300px;
                margin: 0 auto;


                .other_btn {
                    box-sizing: border-box;
                    font-size: 13px;
                    margin-left: 30px;
                    margin-top: 5px;
                    width: 80px;
                    text-align: center;

                    
                    &:nth-child(1), &:nth-child(4) {
                        margin-left: 0px;
                    }
                
                }
            }
           
        }
    }

}
    }
    

</style>