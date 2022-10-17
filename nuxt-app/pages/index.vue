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
        <article class="box media">

            <!-- <div class="roulette"></div> -->
            <div class="roulette_cover">
                <div class="target orange"></div>
                <div class="target yellow"></div>
                <div class="target orange"></div>
                <div class="target yellow"></div>
                <div class="target orange"></div>
                <div class="target yellow"></div>
            </div>


            <button class="button is-warning is-rounded is-large is-responsive" v-if="status !== 'start'" @click="start()">スタート</button>
            <button class="button is-warning is-rounded is-large is-responsive" v-else @click="stop()">ストップ</button>


        </article>
        <aside class="box side">
        </aside>

    </main>
</div>
        
</template>
<style lang="scss">
* {
    margin:0;
    padding:0;
}

header {
    .header_container {
        background: url(~/assets/image/foodiesfeed.com_traditional-korean-meals.jpg) no-repeat center / cover ;
        height: 200px;
        background-position: 0 70%;
        display: flex;
        background-color: rgba(#FF8A02, 0.3);
        background-blend-mode: lighten;
    }

    .field:not(:last-child) {
        margin-bottom: 0px
    }

    .search_field {
        margin-left: 300px;
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
    max-width: 100%;
    min-height:100vh;
    background-color: #FCF4EC;
    display: flex;

    .media {
        margin-top: 20px;
        margin-left: 345px;
        width: 865px;
        height: 680px;
        display: block;

        .roulette {
            background-color: #FF8A02;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            margin: 10px auto;
        }

        .roulette {
            background-color: #FF8A02;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            margin: 10px auto;
        }

        .button {
            display: block;
            margin: 50px auto;

        }
    }

    .side {
        margin: 20px 345px auto 30px;
        width: 320px;
        height: 680px;
    }

    .nox {
        display: block;
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
<script>
export default {
    data() {
        return {
            status: 'clear',
        }
    },

    methods: {
        start() {
           this.status = 'start';
        },

        stop() {
            this.status = "stop"
        }
    }
}
</script>