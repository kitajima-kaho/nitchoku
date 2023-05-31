<script>

export default {
    props: {
        isActive: Boolean,
        name: String,
        todayRecipeUrl: String,
        todayRecipeImg: String,
    }
}
</script>
<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">決定しました！</p>
                <button class="delete" aria-label="close" @click="$emit('closeResModal'); $emit('clickOk')"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <h2 v-if="isActive">{{ name }}</h2>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-warning is-rounded" @click="$emit('closeResModal'); $emit('clickOk')">閉じる</button>
            </footer>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.modal {
    animation-name: fade;
    animation-duration: 0.3s;

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    .modal-card {
        text-align: center;

        .modal_img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            margin: 0;
            display: block;
        }

        h2 {
            font-weight: 400;
            margin-bottom: 0;
        }
    }

    .button {
        margin: 0;
    }
}
</style>