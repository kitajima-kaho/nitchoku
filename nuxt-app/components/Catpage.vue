<script>
export default {

	props: {
		recipeList: Array,
	}, 

	methods: {
		clickUrl(recipeUrl) {
			window.open(recipeUrl, '_blank')
		},
	},
}
</script>
<template>
<div class="wrap">
	<slot></slot>
	<div class="box article_box" v-for="item in recipeList" :key="recipeList"  @click="clickUrl(item.recipeUrl)">
		<div class="media-left">
			<figure class="image is-64x64">
				<img :src="item.strMealThumb" alt="レシピの写真">
			</figure>
		</div>
		<div class="media-content">
			<div class="content">
				<p>
				{{ item.strMeal }}
				</p>
			</div>
		</div>
	</div>
</div>
</template>
<style lang="scss">
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