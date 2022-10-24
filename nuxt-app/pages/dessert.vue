<script setup>
const[rankingData, dataCatRecipe] = await Promise.all([
  useFetch('https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1079324519433678968'),
  useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'),
]);

const recipeRanking = rankingData.data.value.result;
const CatRecipeList = dataCatRecipe.data.value.meals;

CatRecipeList.forEach((e) => {
	e.recipeUrl = 'https://www.themealdb.com/meal/' + e.idMeal
})

</script>
<template>
<div id="page" >
<Header></Header>
<Main>
	<article class="box media">
		<Catpage :recipeList="CatRecipeList">
			<h2>デザートメニューカテゴリーレシピ一覧</h2>
		</Catpage>
	</article>

	<Side
		:recipeRankingList = "recipeRanking" 
	></Side>

	
</Main>
<Footer></Footer>

</div>
</template>
<style lang="scss">

</style>