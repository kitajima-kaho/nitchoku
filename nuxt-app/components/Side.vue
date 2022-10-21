<script>
export default {
    props: {
        recipeRankingList: Array,
    }
}
</script>
<template>
    <aside class="box side">
        <h2>週間楽天レシピランキング</h2>
        <div class="side_box" v-for="item in recipeRankingList" :key="recipeRankingList">
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
        <div class="information">
            提供：<a href="https://recipe.rakuten.co.jp/">楽天レシピ</a>
        </div>
    </aside>
</template>
<style lang="scss">
.side {
    margin: 20px 0px auto 10px;
    width: 300px;

    h2 {
        text-align: center;
    }

    .side_box {

        .media {
            display: flex;
            width:fit-content;
            margin-top: 15px;


            .media-left {
                width: 60px;
                height: 100px;

                .image_box {
                    display: flex;
                    padding-left: 5px;
                }
            }
        }

        p {
            font-size: 15px;
            display: block;
            padding: 0 5px;
        }

        img {
            display: block;
        }
    }

    .information {
        margin-top: 10px;
        text-align: center;
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
</style>
