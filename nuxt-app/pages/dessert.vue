<script>
import jsondataList from '@/assets/json/jsondata.json'

export default {
    data() {
        return {
            recipeRanking: [],
            catRecipeList: [],
            jsondataList: jsondataList,
        };
    },

    async created() {
		const dataCatRecipe = await useFetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert");
        this.catRecipeList = dataCatRecipe.data.value.meals;

        // 日本語に訳す、URLを作成し、オブジェクトのプロパティに追加
        this.catRecipeList.forEach((e) => {
            let jpList = this.jsondataList.find(j => j.strMeal === e.strMeal);
            e.strMeal = jpList.strMealjp;
            e.recipeUrl = "https://www.themealdb.com/meal/" + e.idMeal;
        });
    },
}


</script>
<template>
<div id="page" >
	<Header></Header>
	<MainSecond>
		<article class="box media">
			<Catpage :recipeList="catRecipeList">
				<h2>デザートメニューカテゴリーレシピ一覧</h2>
			</Catpage>
		</article>		
	</MainSecond>
	<Footer></Footer>

</div>
</template>
