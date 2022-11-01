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

		const dataCatRecipe  = await useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
		this.catRecipeList = dataCatRecipe.data.value.meals;

		this.catRecipeList.forEach((e) => {
			let jpList = this.jsondataList.find(j => j.strMeal === e.strMeal);
			if (jpList !== undefined) {
				e.strMeal   = jpList.strMealjp;
			}
			
			e.recipeUrl = 'https://www.themealdb.com/meal/' + e.idMeal
		});

		const recipeRankingLists = useRankingDataFetch()
        this.recipeRankingList = recipeRankingLists.recipeRanking
	}
}


</script>
<template>
<div id="page" >
	<Header></Header>
	<Main>
		<article class="box media">
			<Catpage :recipeList="catRecipeList">
				<h2>デザートメニューカテゴリーレシピ一覧</h2>
			</Catpage>
		</article>		

		<Side
			:recipeRankingList = "recipeRankingList" 
		></Side>

	</Main>
	<Footer></Footer>
</div>
</template>
