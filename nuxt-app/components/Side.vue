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
        <div class="side_box box" v-for="recipe in recipeRankingList" :key="recipeRankingList.recipeId">
            <article class="media">
                <div class="media-left">
                    <figure class="image image_box is-64x64">
                        <img :src="recipe.foodImageUrl" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                        {{ recipe.rank }}位<br>
                        <a target="_blank" rel=”noopener” :href="recipe.recipeUrl">{{ recipe.recipeTitle }}</a>
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
<style lang="scss" scoped>
* {
  font-family: 'Kaisei Decol', serif;
}
.side {
    margin: 20px;
    margin-right: 0;
    width: 350px;
    min-width: 280px;
    height: 675px;
    padding: 20px;

    h2 {
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        margin-bottom: 24px;
    }

    .side_box {
        height: 104px;
        padding: 10px;
        display: flex;
        align-items: center;

        .media {
            display: flex;
            width:fit-content;
            align-items: center;

            .media-left {
                min-width: 60px;

                .image_box {
                    display: flex;
                    padding-left: 5px;

                    img {
                        object-fit: cover;
                    }
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

@media screen and (min-width:640px) and (max-width:1023px) {
.side {
    .side_box {
		width: auto;
    }
}

}

@media screen and (max-width:639px) {    
    .main_wrap {

        .side {
            box-sizing: border-box;
            margin: 5px;
            width: 97%;
            height: 100%;
            padding: 20px;

            .side_box {
                margin-bottom: 5px;
            }
        }
    }
}
</style>
