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
		const[rankingData, dataCatRecipe] = await Promise.all([
			useFetch('https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1079324519433678968'),
			useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta'),
		]);

		this.recipeRanking = rankingData.data.value.result;
		this.catRecipeList = dataCatRecipe.data.value.meals;

		// 日本語に訳す、URLを作成し、オブジェクトのプロパティに追加
		this.catRecipeList.forEach((e) => {
			let jpList = this.jsondataList.find(j => j.strMeal === e.strMeal);
			e.strMeal = jpList.strMealjp;
			e.recipeUrl = 'https://www.themealdb.com/meal/' + e.idMeal
		});
    },
}


</script>

<template>
<div id="page" >
	<Header></Header>
	<Main>
		<article class="box media">
			<Catpage :recipeList="catRecipeList">
				<h2>豚肉カテゴリーレシピ一覧</h2>
			</Catpage>
		</article>		

		<Side
			:recipeRankingList = "recipeRanking" 
		></Side>

	</Main>
	<Footer></Footer>
</div>
</template>