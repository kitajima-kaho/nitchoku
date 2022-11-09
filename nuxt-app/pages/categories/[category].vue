<script>
import { useRankingDataFetch } from '~~/stores/useFetch'

export default {
    data() {
        return {
			recipeRankingList: [],
            catRecipeList: [],
			translationsRecipeTitles: [],
            categoryMainTitle: null,
        };
    },

	async created() {

		// 楽天レシピ
		const recipeRankingLists = useRankingDataFetch()
        // console.log(recipeRankingLists.recipeRanking)

		this.recipeRankingList = recipeRankingLists.recipeRanking
        console.log('recipeRankingLists↓')
        console.log(recipeRankingLists)

        // パラメータ取得
        const category      = this.$route.params.category
        let dataCatRecipe = null
        
        // console.log('パラメータ：' + category)
        if (category === 'breakfast') {
            this.categoryMainTitle = '朝食';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
        } else if(category === 'dessert') {
            this.categoryMainTitle = 'デザート';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
        } else if(category === 'dessert') {
            this.categoryMainTitle = 'デザート';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
        } else if(category === 'dessert') {
            this.categoryMainTitle = 'デザート';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
        } else if(category === 'dessert') {
            this.categoryMainTitle = 'デザート';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
        }

		this.catRecipeList = dataCatRecipe.meals

        
		// 表示するレシピを最大20個までにする。
		// カテゴリーによっては、60以上レシピがあり、重くなってしまうため。
		if (this.catRecipeList.length > 20) {
			const deleteElementCount = this.catRecipeList.length - 20;
			this.catRecipeList.splice(20, deleteElementCount)
		} 

		// 「＆」は翻訳に影響するため、「&」を含むタイトルは除外する。
		this.catRecipeList = this.catRecipeList.filter((recipe) => {
		return !recipe.strMeal.includes("&");
		})


		
		// 翻訳する
		await this.translateAPI(this.catRecipeList)

		// 英語タイトルを翻訳しタイトルに置き換える。レシピのURLをレシピObjに追加する。
		this.catRecipeList.forEach((e, i) => {
			e.strMeal   = this.translationsRecipeTitles[i]
			e.recipeUrl = 'https://www.themealdb.com/meal/' + e.idMeal
		})

	},

	methods: {

		async translateAPI(beforeTranslateDataList) {

			// 翻訳したいタイトルをひとつの文字列にする。
			  // まずタイトルだけの配列を作る。
			const beforeTranslateTitles = [];
			beforeTranslateDataList.forEach(e => {
				beforeTranslateTitles.push(e.strMeal)
			}) 

			  // 「/」がついていないかチェック※スラッシュがついていると、区切られてしまい、翻訳がおかしくなってしまうため。
			const needTranslateTitles = beforeTranslateTitles.filter((title) => {
				return !title.includes("/")
			})

			  // 「/」区切りの文字列を作る
			const needTranslateTitleString = needTranslateTitles.join("/")

			// 翻訳する
			const API_KEY = '3c240d34-7d9e-4c33-fc65-2934e5a213a4:fx'
			const API_URL = 'https://api-free.deepl.com/v2/translate'

			let content = encodeURI('auth_key=' + API_KEY + '&text=' + needTranslateTitleString + '&source_lang=EN&target_lang=JA');
			let url     = API_URL + '?' + content;

			let translatedTitle = await $fetch(url);

			  // 翻訳データ（/で区切ってあるものを分割して）を配列にいれる。
			this.translationsRecipeTitles = translatedTitle.translations[0].text.split('/');
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
				<h2>{{ categoryMainTitle }}カテゴリーレシピ一覧</h2>
			</Catpage>
		</article>		

		<Side
		:recipeRankingList = "recipeRankingList" 
		></Side>

	</Main>
	<Footer></Footer>
</div>
</template>