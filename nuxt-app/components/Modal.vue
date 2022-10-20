<template>
    <div class="modal" :class="{'is-active' : isActive}">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
        <p class="modal-card-title">🍴本日はこれ食べる🍚</p>
        <button class="delete" aria-label="close" @click="$emit('closeResModal')"></button>
        </header>
        <section class="modal-card-body">
        <div class="content">
            <h2 v-if="isActive">{{ todayRecipeTitle }}</h2>
            <img v-if="isActive" class="modal_img" :src="todayRecipeImg">
            <h3>作り方はこちら🔻</h3>
            <a v-if="isActive" target="_blank" :href="todayRecipeUrl" >{{ todayRecipeUrl }}</a>
        </div>
        </section>
        <footer class="modal-card-foot">
        <button class="button is-warning is-rounded"  @click="$emit('closeResModal')">閉じる</button>
        </footer>
    </div>
    </div>

</template>
<script>
export default {
    props: {
        isActive: Boolean,
        todayRecipeTitle: String,
        todayRecipeUrl: String,
        todayRecipeImg: String,

    }
}
</script>