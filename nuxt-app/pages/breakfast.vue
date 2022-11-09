<!-- <script>
import { useRankingDataFetch } from '~/stores/useFetch'

export default {
    data() {
        return {
			recipeRankingList: [],
            catRecipeList: [],
			translationsRecipeTitles: [],
        };
    },

	async created() {

		// 楽天レシピ
		const recipeRankingLists = useRankingDataFetch()
		this.recipeRankingList = recipeRankingLists.recipeRanking

		// 朝食の方のデータを取得
		const dataCatRecipe  = await useFetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
		this.catRecipeList = dataCatRecipe.data.value.meals

		// 「＆」は翻訳に影響するため、「&」を含むタイトルは除外する。
		this.catRecipeList = this.catRecipeList.filter((recipe) => {
		return !recipe.strMeal.includes("&");
		})

		// 表示するレシピを最大20個までにする。
		// カテゴリーによっては、60以上レシピがあり、重くなってしまうため。
		if (this.catRecipeList.length > 20) {
			const deleteElementCount = this.catRecipeList.length - 20;
			this.catRecipeList.splice(20, deleteElementCount)
		} 
		
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

			let translatedTitle = await useFetch(url);

			  // 翻訳データ（/で区切ってあるものを分割して）を配列にいれる。
			this.translationsRecipeTitles = translatedTitle.data.value.translations[0].text.split('/');
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
				<h2>朝食カテゴリーレシピ一覧</h2>
			</Catpage>
		</article>		

		<Side
		:recipeRankingList = "recipeRankingList" 
		></Side>

	</Main>
	<Footer></Footer>
</div>
</template> -->