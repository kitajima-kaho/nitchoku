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

		// 取得したデータから日本語訳があるものをfilterし、翻訳されたものをタイトルとする。
		this.catRecipeList = this.filterAPIdata(dataCatRecipe.data.value.meals)
		this.translateTitle(this.catRecipeList)

		// れしぴのURLをレシピObjに追加する。
		this.catRecipeList.forEach((e) => {
			e.recipeUrl = 'https://www.themealdb.com/meal/' + e.idMeal
		})

		const recipeRankingLists = useRankingDataFetch()
        this.recipeRankingList = recipeRankingLists.recipeRanking
	},

	methods: {
		// 日本語訳が準備されているかされていないかを判断する。
		filterAPIdata(recipeDataList) {
            const filteredRecipeList = recipeDataList.filter((recipe) => {
                const data = jsondataList.find(jsondata => {
                    return recipe.strMeal === jsondata.strMeal
                })
                return data? true : false
            })
            return filteredRecipeList
        },

        // 日本語レシピタイトルをレシピタイトルに反映させる。
        translateTitle(filteredRecipeList) {
            filteredRecipeList.forEach((recipe) => {
                const translateList = jsondataList.find(jsondata => {
                return recipe.strMeal === jsondata.strMeal
            })
                recipe.jpStrMeal = translateList.strMealjp
            })
        },
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
