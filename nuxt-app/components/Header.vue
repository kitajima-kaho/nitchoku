<template>
    <header>
        <div class="header_container">
            <div class="header_display is-align-items-center">
                <div class="logo">
                    <a href="/"><img src="~/assets/image/logo.png" alt="ロゴ"></a>
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

</style>