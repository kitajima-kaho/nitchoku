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


}


</script>
<template>
<div id="page" >
	<Header></Header>
	<MainSecond>
		<article class="box media">
			<Catpage :recipeList="catRecipeList">
				<h2>朝食カテゴリーレシピ一覧</h2>
			</Catpage>
		</article>		
	</MainSecond>
	<Footer></Footer>

</div>
</template>