<template>
	<main>
        <div class="main_wrap">
            <slot></slot>
        </div>
    </main>
</template>
<style lang="scss" scoped>
main {
    width: 100%;

    .main_wrap {
        margin-right: auto;
        margin-left: auto;
        max-width: 925px;
        display: flex;
    }
}

@media screen and (min-width:640px) and (max-width:1023px) {
    .main_wrap {
        display: block;
        width: auto;
    }
}

@media screen and (max-width:639px) {    
    main {
        width: 100%;

        .main_wrap {
            display: block;
        }
    }
}
</style>