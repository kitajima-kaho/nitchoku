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
                            <span class="rank"
                                :class="{ 'rank_gold': (recipe.rankColor === 'gold'), 'rank_silver': (recipe.rankColor === 'silver'), 'rank_bronze': (recipe.rankColor === 'bronze'), 'rank_blue': (recipe.rankColor === 'blue') }">{{
                                    recipe.rank }}</span>
                            <a target="_blank" rel=”noopener” :href="recipe.recipeUrl">{{ recipe.recipeTitle }}</a>
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
    color: #554200;
    font-family: 'Sawarabi Gothic', sans-serif;
}

.side {
    margin: 20px;
    margin-right: 0;
    min-width: 280px;
    padding: 20px;

    h2 {
        padding: 0.5rem 0;
        margin-bottom: 0.2rem;
        border-bottom: 3px dotted hsl(44deg, 100%, 77%);
        // font-family: 'Kaisei Decol', serif;
        // font-weight: 700;
        font-size: 24px;
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
            width: fit-content;
            align-items: center;

            .media-left {
                min-width: 60px;

                .image_box {
                    display: flex;
                    padding-left: 5px;

                    img {
                        border-radius: 10px;
                        object-fit: cover;
                    }
                }
            }

            span {
                display: block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 50%;
            }

            .rank_gold {
                color: white;
                background-color: #FFD700;
            }

            .rank_silver {
                color: white;
                background-color: #C0C0C0;
            }

            .rank_bronze {
                color: white;
                background-color: #C47222;
            }

            .rank_blue {
                color: white;
                background-color: #6fafd4;
            }

            a {
                display: block;
                margin-top: 5px
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
        width: 40%;
        margin: 20px 10px;
        margin-right: 0;

        h2 {
            font-size: 20px;
        }

        .side_box {
            width: 100%;
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

            h2 {
                font-size: 22px;
            }

            .side_box {
                margin-bottom: 5px;
            }

        }
    }
}
</style>
