<script>
export default {

	props: {
		recipeList: Array,
	}, 

	methods: {
		clickUrl(recipeUrl) {
			// _blankは危険、noopenerによって外部から元のJSを触られないようにする。
			window.open(recipeUrl, '_blank', 'noopener')
		},
	},
}
</script>
<template>
<div class="wrap">
	<slot></slot>
	<div class="box article_box" v-for="recipe in recipeList" :key="recipe.idMeal"  @click="clickUrl(recipe.recipeUrl)">
		<div class="media-left">
			<figure class="image is-64x64">
				<img :src="recipe.strMealThumb" alt="レシピの写真">
			</figure>
		</div>
		<div class="media-content">
			<div class="content">
				<p>
				{{ recipe.strMeal }}
				</p>
			</div>
		</div>
	</div>
</div>
</template>
<style lang="scss" scoped>
h2 {
	text-align: center;
	margin-bottom: 15px;
}

.article_box {
	display: flex;
    cursor: pointer;
    width: 550px;
			
	.media-content {
		margin-left: 20px;
		display: flex;
		align-items: center;

		p {
			font-size: 20px;
		}
	}
}

@media only screen and (min-width:640px) and (max-width:1023px) {
	.article_box {
		width: auto;
	}
}

@media screen and (max-width:639px) {    
	.article_box {
        width: auto;
    }
}

</style>