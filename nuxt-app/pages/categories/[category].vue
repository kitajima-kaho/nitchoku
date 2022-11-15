<script>
import RakutenServise from '~~/service/rakutenService'

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

        // 楽天レシピのデータ表示
        const rakutenResponse = await RakutenServise.fetchRecipeRanking();
		this.recipeRankingList = rakutenResponse

        // パラメータ取得
        const category    = this.$route.params.category
        let dataCatRecipe = null
        
        // パラメータによってfetchするデータを変える。タイトルもだし変える。
        if (category === 'breakfast') {
            this.categoryMainTitle = '朝食';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
        } else if(category === 'sideMenu') {
            this.categoryMainTitle = 'サイド';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Side');
        } else if(category === 'dessert') {
            this.categoryMainTitle = 'デザート';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
        } else if(category === 'pasta') {
            this.categoryMainTitle = 'パスタ';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta');
        } else if(category === 'pork') {
            this.categoryMainTitle = '豚肉';
            dataCatRecipe  = await $fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Pork');
        }

		this.catRecipeList = dataCatRecipe.meals

		// 表示するレシピを最大20個までにする。
		// カテゴリーによっては、60以上レシピがあり、重くなってしまうため。
		if (this.catRecipeList.length > 20) {
			const deleteElementCount = this.catRecipeList.length - 20;
			this.catRecipeList.splice(20, deleteElementCount)
		} 

		// 翻訳に影響するものを含むタイトルは除外する。
		this.catRecipeList = this.catRecipeList.filter((recipe) => {
		return !recipe.strMeal.includes("&"); // 全角の「＆」はバグらない。
		})

        this.catRecipeList = this.catRecipeList.filter((recipe) => {
		return !recipe.strMeal.includes("(");
		})

        this.catRecipeList = this.catRecipeList.filter((recipe) => {
		return !recipe.strMeal.includes("Boxty");
		})

		// 順番をランダムに表示する。
		this.shuffle(this.catRecipeList)

		// 翻訳する　 // 🌟ここ戻す
		await this.translateAPI(this.catRecipeList)

		// 英語タイトルを翻訳しタイトルに置き換える。レシピのURLをレシピObjに追加する。
		this.catRecipeList.forEach((e, i) => {
			e.strMeal   = this.translationsRecipeTitles[i]
			// 🌟ここ戻す
			
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

			  // 「\n」がついていないかチェック※「\n」がついていると、区切られてしまい、翻訳がおかしくなってしまうため。
			const needTranslateTitles = beforeTranslateTitles.filter((title) => {
				return !title.includes("\n")
			})

			  // 「\n」区切りの文字列を作る
			const needTranslateTitleString = needTranslateTitles.join("\n")

			// 翻訳する
			const API_KEY = '3c240d34-7d9e-4c33-fc65-2934e5a213a4:fx'
			const API_URL = 'https://api-free.deepl.com/v2/translate'

			let content = encodeURI('auth_key=' + API_KEY + '&text=' + needTranslateTitleString + '&source_lang=EN&target_lang=JA');
			let url     = API_URL + '?' + content;

			let translatedTitle = await $fetch(url);

			// 翻訳データ（「\n」で区切ってあるものを分割して）を配列にいれる。
			this.translationsRecipeTitles = translatedTitle.translations[0].text.split("\n");
		},

		// カテゴリーを順番ランダムに表示
        shuffle (array) {
            // 配列の数分回す
            for (let i = array.length - 1; i >= 0; i--) {
                // （自分メモ）Math.floorMath.floorで引数に与えられた数値以下の整数を返す
                // Math.random()は０以上１未満の乱数を返す
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
	}
}
</script>
<template>
<div id="page">
	<Header></Header>
	<Main>
		<article class="box media">
			<Catpage :recipeList="catRecipeList">
				<h2 class="main_title">{{ categoryMainTitle }}カテゴリーレシピ一覧</h2>
			</Catpage>
		</article>		

		<Side
		:recipeRankingList = "recipeRankingList" 
		></Side>

	</Main>
	<Footer></Footer>
</div>
</template>
<style lang="scss" scoped>
* {
    margin:0;
    padding:0;
} 

#page {
    position: relative;
    padding-bottom: 50px;
    min-height: 100vh;
    box-sizing: border-box;
    background-color: #FCF4EC;
    width: 100vw;

	.media {
		margin-top: 20px;
		display: block;

		.main_title {
			color: #554200;
			padding: 0.5rem 0;
			border-bottom: 3px dotted hsl(44deg, 100%, 77%);
			text-align: center;
			margin-bottom: 24px;
			font-weight: 700;
    		font-size: 24px;
			margin-left: 20px;
			margin-right: 20px;
		}
		
	}
}
@media screen and (min-width:640px) and (max-width:1023px) {
	#page {
		.media {
		width: 60%;
		
			.wrap {
				h2 {
					font-size: 20px;
				}
			}
		}

		.side {
			width: 20%;
		}
	}
}

@media screen and (max-width:639px) { 
	#page {

		.media {
			margin: 5px;


			.main_title {
				font-size: 22px;
			}
		}
	}   
}
</style>