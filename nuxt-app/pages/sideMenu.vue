<script>
import jsondataList from '@/assets/json/jsondata.json'
import { useRankingDataFetch } from '~/stores/useFetch'

export default {
    data() {
        return {
			recipeRankingList: [],
            catRecipeList: [],
            jsondataList: jsondataList,
        };
    },

	async created() {

		const dataCatRecipe  = await useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Side');
		this.catRecipeList = dataCatRecipe.data.value.meals;

		// 日本語に訳す、URLを作成し、オブジェクトのプロパティに追加
		this.catRecipeList.forEach((e) => {
			let jpList = this.jsondataList.find(j => j.strMeal === e.strMeal);
			e.strMeal = jpList.strMealjp;
			e.recipeUrl = 'https://www.themealdb.com/meal/' + e.idMeal
		});

		const recipeRankingLists = useRankingDataFetch()
        this.recipeRankingList = recipeRankingLists.recipeRanking
    },
}


</script>
<template>
<div id="page" >
	<Header></Header>
	<Main>
		<article class="box media">
			<Catpage :recipeList="catRecipeList">
				<h2>サイドメニューカテゴリーレシピ一覧</h2>
			</Catpage>
		</article>		

		<Side
			:recipeRankingList = "recipeRankingList" 
		></Side>

	</Main>
	<Footer></Footer>

</div>
</template>